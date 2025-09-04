'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Item, TaxMode } from '@/types/invoice';
import { CURRENCY_BY_COUNTRY, CC, VAT_RATES } from '@/lib/constants';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import InvoicePaper from './InvoicePaper';

interface InvoiceFormProps {
  signedIn: boolean;
}

export default function InvoiceForm({ signedIn }: InvoiceFormProps) {
  const [region, setRegion] = useState('UK');
  const [country, setCountry] = useState('United Kingdom');
  const [currency, setCurrency] = useState(CURRENCY_BY_COUNTRY[country] || 'GBP');
  const [taxMode, setTaxMode] = useState<TaxMode>('domestic');

  const countryCode = CC[country] || 'UK';
  const countryRates = VAT_RATES[countryCode] || [0, 20];
  const standardRate = countryRates[countryRates.length - 1] || 20;
  const [lineTaxRate, setLineTaxRate] = useState<number>(standardRate);

  const [items, setItems] = useState<Item[]>([
    { desc: 'Service #1', qty: 1, rate: 100, tax: standardRate },
    { desc: 'Service #2', qty: 1, rate: 200, tax: standardRate },
  ]);

  const gated = !signedIn;

  const updateAllLineTaxes = (tax: number) => setItems(prev => prev.map(it => ({ ...it, tax })));

  const onRegionChange = (r: string) => {
    setRegion(r);
    const nextCountry = r === 'UK' ? 'United Kingdom' : 'Germany';
    const nextCurrency = CURRENCY_BY_COUNTRY[nextCountry] || (r === 'UK' ? 'GBP' : 'EUR');
    const nextCode = CC[nextCountry] || (r === 'UK' ? 'UK' : 'DE');
    const nextRates = VAT_RATES[nextCode] || [0, 20];
    const nextStandard = nextRates[nextRates.length - 1] || 20;
    setCountry(nextCountry);
    setCurrency(nextCurrency);
    setTaxMode(r === 'UK' ? 'domestic' : taxMode);
    const apply = (r === 'UK' || taxMode === 'domestic') ? nextStandard : 0;
    setLineTaxRate(apply);
    updateAllLineTaxes(apply);
  };

  const onCountryChange = (c: string) => {
    setCountry(c);
    const nextCurr = CURRENCY_BY_COUNTRY[c] || currency;
    const code = CC[c];
    const rates = (code && VAT_RATES[code]) ? VAT_RATES[code] : [0, 20];
    const nextStandard = rates[rates.length - 1] || 20;
    setCurrency(nextCurr);
    const apply = taxMode === 'domestic' ? nextStandard : 0;
    setLineTaxRate(apply);
    updateAllLineTaxes(apply);
  };

  const addItem = () => setItems(prev => [
    ...prev,
    { desc: `Service #${prev.length + 1}`, qty: 1, rate: 100, tax: lineTaxRate },
  ]);

  const updateItem = (idx: number, key: keyof Item, val: any) =>
    setItems(prev => prev.map((it, i) => (i === idx ? { ...it, [key]: val } : it)));

  const subtotal = items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0);
  const taxTotal = items.reduce((s, it) => s + ((Number(it.qty) || 0) * (Number(it.rate) || 0)) * ((Number(it.tax) || 0) / 100), 0);
  const total = subtotal + taxTotal;

  const zeroNote = taxMode === 'intraEU_rc'
    ? 'VAT 0% - Intra-EU supply (reverse charge applies).'
    : taxMode === 'uk_eu_cross'
    ? 'VAT 0% - UK ↔ EU cross-border supply (check zero-rating rules).'
    : taxMode === 'export'
    ? 'VAT 0% - Export outside UK/EU.'
    : undefined;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 justify-between mb-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium">Region:</span>
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-2.5 py-2"
          >
            <option>UK</option>
            <option>EU</option>
          </select>
          <span className="font-medium ml-3">Country:</span>
          <select
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-2.5 py-2 max-w-[220px]"
          >
            {Object.keys(CURRENCY_BY_COUNTRY).sort().map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="font-medium ml-3">Currency:</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-2.5 py-2"
          >
            {Array.from(new Set(Object.values(CURRENCY_BY_COUNTRY))).sort().map((code) => (
              <option key={code}>{code}</option>
            ))}
          </select>
          <span className="font-medium ml-3">Invoice language:</span>
          <span className="px-2 py-1 rounded-lg border border-black/10 bg-white">EN</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">Save draft</Button>
          <Button
            disabled={gated}
            title={gated ? 'Available after sign-up' : 'Download PDF'}
            size="sm"
            className={gated ? 'bg-slate-300' : ''}
          >
            Download PDF
          </Button>
          <Button
            disabled={gated}
            title={gated ? 'Available after sign-up' : 'Send via email'}
            size="sm"
            className={gated ? 'bg-slate-300' : ''}
          >
            Send email
          </Button>
          <Button
            disabled={gated}
            title={gated ? 'Available after sign-up' : 'Share link'}
            size="sm"
            className={gated ? 'bg-slate-300' : ''}
          >
            Share link
          </Button>
        </div>
      </div>

      {/* Tax Treatment */}
      <motion.div
        className="rounded-2xl bg-white p-5 border border-black/10 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-4">
          <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Tax treatment</h3>
          <p className="text-xs text-slate-500 mt-1">Choose how VAT is applied</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-3">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="taxmode"
                checked={taxMode === 'domestic'}
                onChange={() => {
                  setTaxMode('domestic');
                  setLineTaxRate(standardRate);
                  updateAllLineTaxes(standardRate);
                }}
              />
              <span>Domestic supply (apply local rates)</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="taxmode"
                checked={taxMode === 'intraEU_rc'}
                onChange={() => {
                  setTaxMode('intraEU_rc');
                  setLineTaxRate(0);
                  updateAllLineTaxes(0);
                }}
              />
              <span>Intra-EU B2B (reverse charge, 0%)</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="taxmode"
                checked={taxMode === 'uk_eu_cross'}
                onChange={() => {
                  setTaxMode('uk_eu_cross');
                  setLineTaxRate(0);
                  updateAllLineTaxes(0);
                }}
              />
              <span>UK ↔ EU cross-border (zero-rated)</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="taxmode"
                checked={taxMode === 'export'}
                onChange={() => {
                  setTaxMode('export');
                  setLineTaxRate(0);
                  updateAllLineTaxes(0);
                }}
              />
              <span>Export outside UK/EU (0%)</span>
            </label>
            <div className="text-xs text-slate-500">
              Note: Exact rates vary by goods/services. Verify before issuing a live invoice.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 content-start">
            <div className="grid gap-1.5 text-xs">
              <label className="text-slate-600">Preset rates for {country}</label>
              <select
                className="rounded-lg border border-black/10 bg-white px-2.5 py-2 text-sm"
                value={lineTaxRate}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setLineTaxRate(v);
                  updateAllLineTaxes(v);
                }}
                disabled={taxMode !== 'domestic'}
              >
                {(countryRates.length ? countryRates : [0, standardRate]).map((r) => (
                  <option key={r} value={r}>{r}%</option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5 text-xs">
              <label className="text-slate-600">Apply to all items</label>
              <button
                onClick={() => updateAllLineTaxes(lineTaxRate)}
                className="rounded-lg border border-black/10 px-3 py-2 text-sm w-full"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div>
          <motion.div
            className="rounded-2xl bg-white p-5 border border-black/10 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Sender</h3>
              <p className="text-xs text-slate-500 mt-1">Your company details</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Company name" placeholder="Acme Ltd" />
              <Input label="VAT / Reg" placeholder={country === 'United Kingdom' ? 'GB123456789' : 'EU VAT'} />
              <Input label="Address line" placeholder="221B Baker Street" />
              <Input label="City" placeholder="London" />
              <Input label="Country" value={country} onChange={(e) => onCountryChange(e.target.value)} />
              <Input label="IBAN" placeholder={currency === 'GBP' ? 'GB00BANK0000000000' : 'DE00BANK0000000000'} />
            </div>

            <hr className="my-4 border-black/10" />

            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Client</h3>
              <p className="text-xs text-slate-500 mt-1">Bill-to details</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Client name" placeholder="Client GmbH" />
              <Input label="VAT / Reg" placeholder="DE123456789" />
              <Input label="Address line" placeholder="Potsdamer Platz 1" />
              <Input label="City" placeholder="Berlin" />
              <Input label="Country" placeholder="Germany" />
              <div className="hidden sm:block" />
            </div>

            <hr className="my-4 border-black/10" />

            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Invoice</h3>
              <p className="text-xs text-slate-500 mt-1">Metadata & numbering</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <Input label="Number" placeholder="INV-2025-000245" />
              <Input label="Date" type="date" defaultValue="2025-09-02" />
              <Input label="Due" type="date" defaultValue="2025-09-16" />
            </div>

            <hr className="my-4 border-black/10" />

            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Line items</h3>
              <p className="text-xs text-slate-500 mt-1">Use Enter to add a new row</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-12 gap-2 text-[11px] text-slate-600">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-right">Qty</div>
                <div className="col-span-2 text-right">Rate ({currency})</div>
                <div className="col-span-2 text-right">Tax %</div>
              </div>
              {items.map((it, i) => (
                <motion.div
                  key={i}
                  className="grid grid-cols-12 gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Input
                    value={it.desc}
                    onChange={(e) => updateItem(i, 'desc', e.target.value)}
                    className="col-span-6"
                  />
                  <Input
                    value={it.qty}
                    onChange={(e) => updateItem(i, 'qty', Number(e.target.value))}
                    className="col-span-2 text-right"
                  />
                  <Input
                    value={it.rate}
                    onChange={(e) => updateItem(i, 'rate', Number(e.target.value))}
                    className="col-span-2 text-right"
                  />
                  <Input
                    value={it.tax}
                    onChange={(e) => updateItem(i, 'tax', Number(e.target.value))}
                    className="col-span-2 text-right"
                  />
                </motion.div>
              ))}
              <button
                onClick={addItem}
                className="rounded-lg border border-dashed border-black/15 py-2 text-sm hover:bg-slate-50 transition-colors"
              >
                + Add item
              </button>
            </div>

            <hr className="my-4 border-black/10" />

            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Notes & terms</h3>
            </div>
            <Textarea
              rows={4}
              placeholder="Payment within 14 days. Late fees may apply."
            />
          </motion.div>
        </div>

        {/* Preview */}
        <div>
          <motion.div
            className="rounded-2xl bg-white p-5 border border-black/10 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Preview</h3>
              <p className="text-xs text-slate-500 mt-1">A4 layout</p>
            </div>
            <InvoicePaper
              currency={currency}
              zeroNote={zeroNote}
              items={items}
              subtotal={subtotal}
              taxTotal={taxTotal}
              total={total}
            />
            <div className="mt-3 text-[11px] text-slate-500">
              Totals (auto): Subtotal <b>{currency} {subtotal.toFixed(2)}</b> · Tax <b>{currency} {taxTotal.toFixed(2)}</b> · Total <b>{currency} {total.toFixed(2)}</b>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

