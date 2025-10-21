import React from "react";
import { Invoice } from "@/types/invoice";

// ─────────────────────────────────────────────────────────────
// Ventira — Invoice "Business Portrait" (A4 Template)
// Left vertical band for logo/contacts; right side holds full invoice content.
// Signature & stamp lines. Print‑friendly. Contrasts AA. Multi‑currency ready. VAT modes.
// ─────────────────────────────────────────────────────────────

const k = {
  brand: "#0F766E",
  surfaceAlt: "#F6F7F8",
  text: "#0B1221",
  muted: "#6B7280",
  line: "#E5E7EB",
};

function formatMoney(x: number, currency: string) {
  const map: Record<string, string> = { GBP: "en-GB", EUR: "de-DE", USD: "en-US", PLN: "pl-PL", CZK: "cs-CZ" };
  try { 
    return new Intl.NumberFormat(map[currency] || "en-GB", { style: "currency", currency }).format(x || 0); 
  } catch { 
    return String(x ?? 0); 
  }
}

interface InvoiceBusinessPortraitA4Props {
  invoice: Invoice;
}

export default function InvoiceBusinessPortraitA4({ invoice }: InvoiceBusinessPortraitA4Props) {
  const vatMode = invoice.vatMode || "Domestic";
  const currency = invoice.currency || "GBP";

  const rows = invoice.items.map((item, index) => {
    const vatPct = vatMode === "Domestic" ? (item.vatRate || 0) : 0;
    const qty = item.quantity;
    const unit = item.unitPrice;
    const net = qty * unit;
    const vat = net * (vatPct / 100);
    const total = net + vat;
    return { ...item, id: index + 1, vatPct, net, vat, total };
  });

  const totals = {
    net: rows.reduce((s, r) => s + r.net, 0),
    vat: rows.reduce((s, r) => s + r.vat, 0),
    total: rows.reduce((s, r) => s + r.net + r.vat, 0),
  };

  const hasItems = rows.length > 0;

  return (
    <div
      className="relative bg-white mx-auto grid"
      style={{ width: 794, height: 1123, gridTemplateColumns: '160px 1fr' }} // A4 @96dpi ~ 794x1123
    >
      {/* Left vertical band */}
      <div className="h-full flex flex-col items-center" style={{ background: k.surfaceAlt, padding: 20 }}>
        <div className="w-full flex-1 flex flex-col items-center text-center">
          {invoice.company.logoUrl ? (
            <img src={invoice.company.logoUrl} alt="Logo" className="mt-2 h-16 w-16 object-contain" />
          ) : (
            <div className="mt-2 h-16 w-16 rounded-full" style={{ background: k.brand, opacity: 0.15 }} />
          )}
          <div className="mt-3 text-sm font-semibold text-slate-800 px-2 break-words">{invoice.company.name}</div>
          <div className="mt-1 text-[11px] text-slate-600 px-3 whitespace-pre-line">{invoice.company.address}</div>
          <div className="mt-1 text-[11px] text-slate-600">
            {[invoice.company.email, invoice.company.phone].filter(Boolean).join(' · ')}
          </div>
        </div>
        {/* Optional small website */}
        <div className="text-[11px] text-slate-500 mb-2">{invoice.company.email}</div>
      </div>

      {/* Right content area */}
      <div className="relative" style={{ padding: 56 }}>
        {/* Header row */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7"/>
          <div className="col-span-5 text-right">
            <div className="text-[11px] uppercase tracking-wide" style={{ color: k.brand }}>INVOICE</div>
            <div className="text-[14px] font-semibold text-slate-800">{invoice.invoiceNumber}</div>
            <div className="text-[12px] text-slate-600">Issue: {invoice.issueDate}</div>
            <div className="text-[12px] text-slate-600">Due: {invoice.dueDate}</div>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-12 gap-6 mt-4">
          <div className="col-span-6">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">From</div>
            <div className="text-[13px] font-medium text-slate-800">{invoice.company.name}</div>
            <div className="text-[12px] text-slate-600">
              {invoice.company.vatNumber && <div>VAT: {invoice.company.vatNumber}</div>}
              {invoice.company.registrationNumber && <div>Reg: {invoice.company.registrationNumber}</div>}
              {invoice.company.address && <div>{invoice.company.address}</div>}
              {invoice.company.city && invoice.company.country && <div>{invoice.company.city}, {invoice.company.country}</div>}
              {invoice.company.email && <div>{invoice.company.email}</div>}
            </div>
          </div>
          <div className="col-span-6">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">Bill to</div>
            <div className="text-[13px] font-medium text-slate-800">{invoice.client.name}</div>
            <div className="text-[12px] text-slate-600">
              {invoice.client.vatNumber && <div>VAT: {invoice.client.vatNumber}</div>}
              {invoice.client.address && <div>{invoice.client.address}</div>}
              {invoice.client.city && invoice.client.country && <div>{invoice.client.city}, {invoice.client.country}</div>}
              {invoice.client.email && <div>{invoice.client.email}</div>}
            </div>
          </div>
        </div>

        {/* Items table */}
        <div className="mt-8">
          <div className="grid grid-cols-[48px_1fr_80px_110px_72px_140px] items-center text-[11px] uppercase tracking-wide" style={{ background: '#F8FAFC', borderTop: `1px solid ${k.line}`, borderBottom: `1px solid ${k.line}` }}>
            <div className="px-3 py-2">#</div>
            <div className="px-3 py-2">Description</div>
            <div className="px-3 py-2 text-right">Qty</div>
            <div className="px-3 py-2 text-right">Unit</div>
            <div className="px-3 py-2 text-right">VAT%</div>
            <div className="px-3 py-2 text-right">Line total</div>
          </div>
          <div>
            {hasItems ? (
              rows.map((r, i) => (
                <div key={r.id} className="grid grid-cols-[48px_1fr_80px_110px_72px_140px] items-center text-[12px]" style={{ background: i % 2 ? '#FBFCFD' : '#FFFFFF', borderBottom: `1px solid ${k.line}` }}>
                  <div className="px-3 py-2 text-slate-500">{r.id}</div>
                  <div className="px-3 py-2 text-slate-700">{r.description}</div>
                  <div className="px-3 py-2 text-right tabular-nums">{r.quantity}</div>
                  <div className="px-3 py-2 text-right tabular-nums">{formatMoney(r.unitPrice, currency)}</div>
                  <div className="px-3 py-2 text-right tabular-nums">{r.vatPct}</div>
                  <div className="px-3 py-2 text-right font-medium tabular-nums">{formatMoney(r.total, currency)}</div>
                </div>
              ))
            ) : (
              <div className="text-[12px] text-slate-500 px-3 py-6 border-b" style={{ borderColor: k.line }}>
                No items provided.
              </div>
            )}
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-7">
            <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Notes</div>
            <div className="text-[12px] text-slate-600 whitespace-pre-line">{invoice.notes || ''}</div>

            {/* Bank Details */}
            {(invoice.company.iban || invoice.company.bankName || invoice.company.bic) && (
              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Payment Details</div>
                <div className="text-[12px] text-slate-600">
                  {invoice.company.iban && <div>IBAN: {invoice.company.iban}</div>}
                  {invoice.company.bankName && <div>Bank: {invoice.company.bankName}</div>}
                  {invoice.company.bic && <div>BIC: {invoice.company.bic}</div>}
                </div>
              </div>
            )}
          </div>
          <div className="col-span-5">
            <div className="text-[12px]" style={{ borderTop: `1px solid ${k.line}` }}>
              <div className="grid grid-cols-[1fr_auto] gap-x-6 py-2">
                <div className="text-slate-600">Subtotal (Net)</div>
                <div className="text-right tabular-nums">{formatMoney(totals.net, currency)}</div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-x-6 py-2">
                <div className="text-slate-600">VAT</div>
                <div className="text-right tabular-nums">{formatMoney(totals.vat, currency)}</div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-x-6 py-3" style={{ borderTop: `1px solid ${k.line}` }}>
                <div className="font-semibold">Total</div>
                <div className="text-right font-semibold tabular-nums" style={{ color: k.text }}>{formatMoney(totals.total, currency)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* VAT legal note */}
        <div className="mt-3 text-[11px] text-slate-600">
          {vatMode === 'Domestic' && (<div>VAT charged at line‑item rate where applicable.</div>)}
          {vatMode === 'Intra‑EU' && (<div>Intra‑EU supply. VAT 0%. Reverse charge may apply (Art. 196).</div>)}
          {vatMode === 'Export' && (<div>Export outside EU. VAT 0%. Out of scope.</div>)}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute left-[160px] right-14 bottom-10 text-center text-[11px] text-slate-500">
        This invoice is generated electronically and is valid without a signature.
      </div>
    </div>
  );
}



