import React, { useMemo, useState } from "react";

// A4 PDF invoice template (clean preview — no on-screen controls)
// Ledger Calm style, UK-first/EU-second

type Currency = "GBP" | "EUR" | "CHF" | "DKK" | "NOK" | "SEK" | "PLN" | "CZK" | "HUF" | "RON" | "BGN" | "HRK" | "ISK" | "TRY" | "UAH" | "MDL" | "GEL";

type VatMode = "domestic" | "intraEU_rc" | "uk_eu_cross" | "export";

type Party = { name: string; reg?: string; vat?: string; address1?: string; address2?: string; city?: string; country?: string };

type Item = { description: string; qty: number; unitPrice: number; taxRate: number };

type Bank = { accountName?: string; bankName?: string; iban?: string; bic?: string; sortCode?: string; accountNo?: string };

type InvoiceData = { invoiceNumber: string; issueDate: string; dueDate: string; currency: Currency; seller: Party; buyer: Party; items: Item[]; notes?: string; bank?: Bank; vatMode: VatMode };

const CURRENCY_SYMBOL: Record<Currency, string> = { GBP:"£", EUR:"€", CHF:"CHF", DKK:"kr", NOK:"kr", SEK:"kr", PLN:"zł", CZK:"Kč", HUF:"Ft", RON:"lei", BGN:"лв", HRK:"€", ISK:"kr", TRY:"₺", UAH:"₴", MDL:"L", GEL:"₾" };

function money(v: number, c: Currency) {
  const sym = CURRENCY_SYMBOL[c] || "";
  const abs = Math.abs(v);
  const opts: Intl.NumberFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  try { return `${v < 0 ? "-" : ""}${sym}${new Intl.NumberFormat(undefined, opts).format(abs)}`; } catch { return `${sym}${abs.toFixed(2)}`; }
}

function calc(data: InvoiceData) { const subtotal = data.items.reduce((s, it) => s + (it.qty||0) * (it.unitPrice||0), 0); const tax = data.items.reduce((s, it) => s + ((it.qty||0) * (it.unitPrice||0)) * ((it.taxRate||0) / 100), 0); return { subtotal, tax, total: subtotal + tax }; }

function zeroNote(mode: VatMode) { if (mode === "intraEU_rc") return "VAT 0% — Intra‑EU supply (reverse charge applies)."; if (mode === "uk_eu_cross") return "VAT 0% — UK ⇄ EU cross‑border supply (check zero‑rating rules)."; if (mode === "export") return "VAT 0% — Export outside UK/EU."; return undefined; }

export default function PdfInvoiceTemplate() {
  const [mode] = useState<VatMode>("domestic");
  const [currency] = useState<Currency>("GBP");

  const demo: InvoiceData = useMemo(() => ({
    invoiceNumber: "INV-2025-000245",
    issueDate: "2025-09-02",
    dueDate: "2025-09-16",
    currency,
    seller: { name: "Acme Ltd", vat: currency === "GBP" ? "GB123456789" : "DE123456789", address1: "221B Baker Street", city: "London", country: "United Kingdom" },
    buyer: { name: currency === "GBP" ? "Client GmbH" : "Client SARL", vat: currency === "GBP" ? "DE123456789" : "FR12345678901", address1: "Potsdamer Platz 1", city: currency === "GBP" ? "Berlin" : "Paris", country: currency === "GBP" ? "Germany" : "France" },
    vatMode: mode,
    items: [
      { description: "Consulting services — August", qty: 1, unitPrice: 1200, taxRate: mode === "domestic" ? (currency === "GBP" ? 20 : 19) : 0 },
      { description: "Design sprint workshop", qty: 2, unitPrice: 450, taxRate: mode === "domestic" ? (currency === "GBP" ? 20 : 19) : 0 },
    ],
    notes: "Payment within 14 days. Late fees may apply.",
    bank: { accountName: "ACME LTD", bankName: "Monobank", iban: currency === "GBP" ? "GB00 BANK 0000 0000 0000 00" : "DE00 BANK 0000 0000 0000 00", bic: "BANKGB2L" },
  }), [mode, currency]);

  const sums = useMemo(() => calc(demo), [demo]);

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <style>{`
        @page { size: A4; margin: 14mm 14mm 16mm 14mm; }
        @media print { body { background: white; } }
        .a4 { width: 210mm; min-height: 297mm; margin: 0 auto; background: white; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }
        .cut { height: 8mm; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
        .muted { color: #64748b; }
        .label { font-size: 11px; color: #334155; text-transform: uppercase; letter-spacing: .04em; }
        .table { width: 100%; border-collapse: collapse; }
        .table th { font-size: 11px; text-align: left; padding: 6px 8px; border-bottom: 1px solid rgba(0,0,0,.08); color:#334155 }
        .table td { font-size: 12px; padding: 6px 8px; border-bottom: 1px solid rgba(0,0,0,.04); }
        .right { text-align: right; }
        .totals td { font-weight: 600; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
        .footer { position: running(footer); font-size: 11px; color: #64748b; }
      `}</style>

      <div className="a4 p-[10mm]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600" />
            <div className="text-slate-900 font-semibold text-lg">Invoicerly</div>
          </div>
          <div className="text-right text-sm text-slate-600">
            <div className="font-semibold text-slate-800">Invoice {demo.invoiceNumber}</div>
            <div>Date: {demo.issueDate}</div>
            <div>Due: {demo.dueDate}</div>
          </div>
        </div>

        <div className="cut" />

        <div className="grid-2">
          <div className="avoid-break">
            <div className="label">From</div>
            <div className="mt-1 text-sm">
              <div className="font-semibold">{demo.seller.name}</div>
              {demo.seller.vat && <div className="muted">VAT {demo.seller.vat}</div>}
              {demo.seller.reg && <div className="muted">Reg {demo.seller.reg}</div>}
              {demo.seller.address1 && <div>{demo.seller.address1}</div>}
              {(demo.seller.address2 || demo.seller.city) && <div>{demo.seller.address2} {demo.seller.city}</div>}
              {demo.seller.country && <div>{demo.seller.country}</div>}
            </div>
          </div>
          <div className="avoid-break">
            <div className="label">Bill To</div>
            <div className="mt-1 text-sm">
              <div className="font-semibold">{demo.buyer.name}</div>
              {demo.buyer.vat && <div className="muted">VAT {demo.buyer.vat}</div>}
              {demo.buyer.address1 && <div>{demo.buyer.address1}</div>}
              {(demo.buyer.address2 || demo.buyer.city) && <div>{demo.buyer.address2} {demo.buyer.city}</div>}
              {demo.buyer.country && <div>{demo.buyer.country}</div>}
            </div>
          </div>
        </div>

        <div className="cut" />

        <table className="table">
          <thead>
            <tr>
              <th width="54%">Item</th>
              <th className="right" width="10%">Qty</th>
              <th className="right" width="18%">Rate ({demo.currency})</th>
              <th className="right" width="18%">Tax</th>
            </tr>
          </thead>
          <tbody>
            {demo.items.map((it, i) => (
              <tr key={i} className="avoid-break">
                <td>{it.description}</td>
                <td className="right">{it.qty}</td>
                <td className="right">{money(it.unitPrice, demo.currency)}</td>
                <td className="right">{it.taxRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cut" />

        <div className="grid-2">
          <div className="avoid-break">
            <div className="label">Payment details</div>
            <div className="mt-1 text-sm">
              {demo.bank?.accountName && <div><span className="muted">Account name:</span> {demo.bank.accountName}</div>}
              {demo.bank?.bankName && <div><span className="muted">Bank:</span> {demo.bank.bankName}</div>}
              {demo.bank?.iban && <div><span className="muted">IBAN:</span> {demo.bank.iban}</div>}
              {demo.bank?.bic && <div><span className="muted">BIC:</span> {demo.bank.bic}</div>}
              {zeroNote(demo.vatMode) && <div className="mt-2 text-emerald-700 text-xs">{zeroNote(demo.vatMode)}</div>}
            </div>
          </div>
          <div className="avoid-break">
            <table className="table" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <tbody>
                <tr>
                  <td className="right muted">Subtotal</td>
                  <td className="right" style={{ width: '40%' }}>{money(sums.subtotal, demo.currency)}</td>
                </tr>
                <tr>
                  <td className="right muted">Tax</td>
                  <td className="right">{money(sums.tax, demo.currency)}</td>
                </tr>
                <tr className="totals">
                  <td className="right">Total</td>
                  <td className="right">{money(sums.total, demo.currency)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {demo.notes && (
          <div className="avoid-break mt-6">
            <div className="label">Notes</div>
            <div className="mt-1 text-sm">{demo.notes}</div>
          </div>
        )}

        <div className="cut" />

        <div className="footer">Invoicerly • info@mail.com • This PDF is generated electronically and is valid without a signature.</div>
      </div>
    </div>
  );
}
