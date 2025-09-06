'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Item, TaxMode } from '@/types/invoice';
import { CURRENCY_BY_COUNTRY, CC, VAT_RATES } from '@/lib/constants';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import InvoicePaper from './InvoicePaper';
import InvoiceA4 from '@/components/pdf/InvoiceA4';

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

  // Sender / Client / Invoice metadata / Notes (for live preview)
  const [sender, setSender] = useState({
    company: 'Acme Ltd',
    vat: country === 'United Kingdom' ? 'GB123456789' : 'EU VAT',
    address: '221B Baker Street',
    city: 'London',
    country,
    iban: 'GB00BANK0000000000',
  });
  const [client, setClient] = useState({
    name: 'Client GmbH',
    vat: 'DE123456789',
    address: 'Potsdamer Platz 1',
    city: 'Berlin',
    country: 'Germany',
  });
  const [invoiceMeta, setInvoiceMeta] = useState({
    number: 'INV-2025-000245',
    date: '2025-09-02',
    due: '2025-09-16',
  });
  const [notes, setNotes] = useState('Payment within 14 days. Late fees may apply.');

  // Initialize Sender from saved Company (if available)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/me');
        if (!res.ok) return;
        const { user } = await res.json();
        const company = user?.company as any;
        if (company) {
          const vatOrReg = company.vat || company.reg || '';
          const nextCountry = company.country ?? null;
          setSender(prev => ({
            ...prev,
            company: company.name ?? prev.company,
            vat: vatOrReg,
            address: company.address1 ?? prev.address,
            city: company.city ?? prev.city,
            country: nextCountry ?? prev.country,
            iban: company.iban ?? prev.iban,
          }));
          if (company.country && CURRENCY_BY_COUNTRY[company.country]) setCountry(company.country);
        }
        if (user?.currency) setCurrency(user.currency);
      } catch {
        // ignore
      }
    })();
  }, []);

  const gated = !signedIn;
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [busy, setBusy] = useState<'save' | 'share' | null>(null);

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
    setSender(prev => ({ ...prev, country: nextCountry }));
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
    setSender(prev => ({ ...prev, country: c }));
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
    ? 'VAT 0% - UK â†” EU cross-border supply (check zero-rating rules).'
    : taxMode === 'export'
    ? 'VAT 0% - Export outside UK/EU.'
    : undefined;

  const downloadPdf = async () => {
    try {
      window.print();
    } catch (e) {
      console.error('Print failed', e);
    }
  };

  const saveDraft = async () => {
    setBusy('save');
    setBanner(null);
    try {
      const res = await fetch('/api/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency,
          client: client.name,
          subtotal: Math.round(subtotal),
          tax: Math.round(taxTotal),
          total: Math.round(total),
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(()=>({error:'Failed'}))).error || 'Failed to save draft');
      setBanner({ type: 'success', msg: 'Draft saved to Dashboard.' });
    } catch (e: any) {
      setBanner({ type: 'error', msg: e.message || 'Failed to save draft.' });
    } finally {
      setBusy(null);
    }
  };

  const saveAndShare = async () => {
    setBusy('share');
    setBanner(null);
    try {
      const res = await fetch('/api/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency,
          client: client.name,
          subtotal: Math.round(subtotal),
          tax: Math.round(taxTotal),
          total: Math.round(total),
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(()=>({error:'Failed'}))).error || 'Failed to save draft');
      const { invoice } = await res.json();
      const url = `${window.location.origin}/s/${invoice.id}`;
      await navigator.clipboard.writeText(url);
      setBanner({ type: 'success', msg: 'Share link copied to clipboard.' });
    } catch (e: any) {
      setBanner({ type: 'error', msg: e.message || 'Failed to save or copy.' });
    } finally {
      setBusy(null);
    }
  };

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
          <Button onClick={saveDraft} disabled={gated || busy!==null} variant="secondary" size="sm">{busy==='save'? 'Saving…' : 'Save draft'}</Button>
          <Button
            onClick={downloadPdf}
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
            onClick={saveAndShare}
            disabled={gated || busy!==null}
            title={gated ? 'Available after sign-up' : 'Save & share link'}
            size="sm"
            className={gated ? 'bg-slate-300' : ''}
          >
            {busy==='share'? 'Saving…' : 'Save & share link'}
          </Button>
        </div>
      </div>

      {/* Tax Treatment */}
      {banner && (
        <div className={`rounded-lg border px-3 py-2 text-sm ${banner.type==='success'? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-red-200 bg-red-50 text-red-700'}`}>
          {banner.msg}
        </div>
      )}

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
              <span>UK â†” EU cross-border (zero-rated)</span>
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
              <Input label="Company name" value={sender.company} onChange={(e) => setSender(s => ({ ...s, company: e.target.value }))} />
              <Input label="VAT / Reg" value={sender.vat} onChange={(e) => setSender(s => ({ ...s, vat: e.target.value }))} />
              <Input label="Address line" value={sender.address} onChange={(e) => setSender(s => ({ ...s, address: e.target.value }))} />
              <Input label="City" value={sender.city} onChange={(e) => setSender(s => ({ ...s, city: e.target.value }))} />
              <Input label="Country" value={country} onChange={(e) => onCountryChange(e.target.value)} />
              <Input label="IBAN" value={sender.iban} onChange={(e) => setSender(s => ({ ...s, iban: e.target.value }))} />
            </div>

            <hr className="my-4 border-black/10" />

            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Client</h3>
              <p className="text-xs text-slate-500 mt-1">Bill-to details</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Client name" value={client.name} onChange={(e) => setClient(c => ({ ...c, name: e.target.value }))} />
              <Input label="VAT / Reg" value={client.vat} onChange={(e) => setClient(c => ({ ...c, vat: e.target.value }))} />
              <Input label="Address line" value={client.address} onChange={(e) => setClient(c => ({ ...c, address: e.target.value }))} />
              <Input label="City" value={client.city} onChange={(e) => setClient(c => ({ ...c, city: e.target.value }))} />
              <Input label="Country" value={client.country} onChange={(e) => setClient(c => ({ ...c, country: e.target.value }))} />
              <div className="hidden sm:block" />
            </div>

            <hr className="my-4 border-black/10" />

            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">Invoice</h3>
              <p className="text-xs text-slate-500 mt-1">Metadata & numbering</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <Input label="Number" value={invoiceMeta.number} onChange={(e) => setInvoiceMeta(m => ({ ...m, number: e.target.value }))} />
              <Input label="Date" type="date" value={invoiceMeta.date} onChange={(e) => setInvoiceMeta(m => ({ ...m, date: e.target.value }))} />
              <Input label="Due" type="date" value={invoiceMeta.due} onChange={(e) => setInvoiceMeta(m => ({ ...m, due: e.target.value }))} />
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
                    wrapperClassName="col-span-6 min-w-0"
                  />
                  <Input
                    value={it.qty}
                    onChange={(e) => updateItem(i, 'qty', Number(e.target.value))}
                    wrapperClassName="col-span-2 min-w-0" className="text-right"
                  />
                  <Input
                    value={it.rate}
                    onChange={(e) => updateItem(i, 'rate', Number(e.target.value))}
                    wrapperClassName="col-span-2 min-w-0" className="text-right"
                  />
                  <Input
                    value={it.tax}
                    onChange={(e) => updateItem(i, 'tax', Number(e.target.value))}
                    wrapperClassName="col-span-2 min-w-0" className="text-right"
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              sender={sender}
              client={client}
              invoiceNo={invoiceMeta.number}
              invoiceDate={invoiceMeta.date}
              invoiceDue={invoiceMeta.due}
              notes={notes}
            />
            <div className="mt-3 text-[11px] text-slate-500">
              Totals (auto): Subtotal <b>{currency} {subtotal.toFixed(2)}</b> — Tax <b>{currency} {taxTotal.toFixed(2)}</b> — Total <b>{currency} {total.toFixed(2)}</b>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Print-only A4 template (isolated on print) */}
      <InvoiceA4
        currency={currency}
        zeroNote={zeroNote}
        items={items}
        subtotal={subtotal}
        taxTotal={taxTotal}
        total={total}
        sender={{
          company: sender.company,
          vat: sender.vat,
          address: sender.address,
          city: sender.city,
          country: sender.country,
          iban: sender.iban,
        }}
        client={{
          name: client.name,
          vat: client.vat,
          address: client.address,
          city: client.city,
          country: client.country,
        }}
        invoiceNo={invoiceMeta.number}
        invoiceDate={invoiceMeta.date}
        invoiceDue={invoiceMeta.due}
        notes={notes}
      />

    </div>
  );
}

