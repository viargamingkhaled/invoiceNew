import React from "react";
import { Invoice } from "@/types/invoice";

// ─────────────────────────────────────────────────────────────
// Ventira — Invoice "Nordic Grid" (A4 Template)
// Strict modular grid, minimal accents, no dashed borders.
// Print‑friendly. Contrasts AA. Multi‑currency ready. VAT modes.
// ─────────────────────────────────────────────────────────────

const tokens = {
  primary: "#0F766E", // teal accent (Palette B)
  text: "#0B1221",
  muted: "#475569",
  line: "#E5E7EB",
  surface: "#FFFFFF",
  surfaceAlt: "#FBFCFD",
};

function formatMoney(x: number, currency: string) {
  const map: Record<string, string> = { GBP: "en-GB", EUR: "de-DE", USD: "en-US", PLN: "pl-PL", CZK: "cs-CZ" };
  return new Intl.NumberFormat(map[currency] || "en-GB", { style: "currency", currency }).format(x);
}

interface InvoiceNordicGridA4Props {
  invoice: Invoice;
}

export default function InvoiceNordicGridA4({ invoice }: InvoiceNordicGridA4Props) {
  const vatMode = invoice.vatMode || "Domestic";
  const currency = invoice.currency || "GBP";

  const rows = invoice.items.map((item, index) => {
    const vatPct = vatMode === "Domestic" ? (item.vatRate || 0) : 0;
    const net = item.quantity * item.unitPrice;
    const vat = net * (vatPct / 100);
    const total = net + vat;
    return { ...item, id: index + 1, vatPct, net, vat, total };
  });

  const totals = {
    net: rows.reduce((s, r) => s + r.net, 0),
    vat: rows.reduce((s, r) => s + r.vat, 0),
    total: rows.reduce((s, r) => s + r.net + r.vat, 0),
  };

  return (
    <div
      className="relative bg-white mx-auto"
      style={{ width: 794, height: 1123, padding: 56 }} // A4 @96dpi ~ 794x1123, 15mm ~ 56px
    >
      {/* grid overlay (very subtle) */}
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid8" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke={tokens.line} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid8)" />
        </svg>
      </div>

      {/* Header row */}
      <div className="relative grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <div className="text-[11px] uppercase tracking-wide text-slate-500">From</div>
          <div className="text-[15px] font-semibold text-slate-800">{invoice.company.name}</div>
          {invoice.company.vatNumber && (
            <div className="text-[12px] text-slate-600">VAT: {invoice.company.vatNumber}</div>
          )}
          {invoice.company.registrationNumber && (
            <div className="text-[12px] text-slate-600">Reg: {invoice.company.registrationNumber}</div>
          )}
          <div className="text-[12px] text-slate-600">{invoice.company.address}</div>
          <div className="text-[12px] text-slate-600">{invoice.company.email} · {invoice.company.phone}</div>
        </div>
        <div className="col-span-5 text-right">
          <div className="text-[11px] uppercase tracking-wide" style={{ color: tokens.primary }}>INVOICE</div>
          <div className="text-[14px] font-semibold text-slate-800">{invoice.invoiceNumber}</div>
          <div className="text-[12px] text-slate-600">Issue: {invoice.issueDate}</div>
          <div className="text-[12px] text-slate-600">Due: {invoice.dueDate}</div>
          <div className="mt-1 inline-flex items-center gap-2">
            <span className="text-[11px] px-2 py-0.5 rounded-full border" style={{ borderColor: tokens.line, color: tokens.muted }}>VAT: {vatMode}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full border" style={{ borderColor: tokens.line, color: tokens.muted }}>Currency: {currency}</span>
          </div>
        </div>
      </div>

      {/* Bill to & VAT note */}
      <div className="grid grid-cols-12 gap-4 mt-6">
        <div className="col-span-7">
          <div className="text-[11px] uppercase tracking-wide text-slate-500">Bill to</div>
          <div className="text-[13px] font-medium text-slate-800">{invoice.client.name}</div>
          {invoice.client.vatNumber && (
            <div className="text-[12px] text-slate-600">VAT: {invoice.client.vatNumber}</div>
          )}
          <div className="text-[12px] text-slate-600">{invoice.client.address}</div>
          {invoice.client.email && (
            <div className="text-[12px] text-slate-600">{invoice.client.email}</div>
          )}
        </div>
        <div className="col-span-5 text-[11px] text-slate-600 self-end">
          {vatMode === 'Domestic' && (
            <div>VAT charged at line‑item rate where applicable.</div>
          )}
          {vatMode === 'Intra‑EU' && (
            <div>Intra‑EU supply. VAT 0%. Reverse charge may apply (Art. 196).</div>
          )}
          {vatMode === 'Export' && (
            <div>Export outside EU. VAT 0%. Out of scope.</div>
          )}
        </div>
      </div>

      {/* Items table */}
      <div className="mt-8">
        {/* header */}
        <div className="grid grid-cols-[48px_1fr_80px_110px_72px_140px] items-center text-[11px] uppercase tracking-wide" style={{ background: "#F8FAFC", borderTop: `1px solid ${tokens.line}`, borderBottom: `1px solid ${tokens.line}` }}>
          <div className="px-3 py-2">#</div>
          <div className="px-3 py-2">Description</div>
          <div className="px-3 py-2 text-right">Qty</div>
          <div className="px-3 py-2 text-right">Unit</div>
          <div className="px-3 py-2 text-right">VAT%</div>
          <div className="px-3 py-2 text-right">Line total</div>
        </div>
        {/* rows */}
        <div>
          {rows.map((r, i) => (
            <div key={r.id} className="grid grid-cols-[48px_1fr_80px_110px_72px_140px] items-center text-[12px]" style={{ background: i % 2 ? tokens.surfaceAlt : tokens.surface, borderBottom: `1px solid ${tokens.line}` }}>
              <div className="px-3 py-2 text-slate-500">{r.id}</div>
              <div className="px-3 py-2 text-slate-700">{r.description}</div>
              <div className="px-3 py-2 text-right tabular-nums">{r.quantity}</div>
              <div className="px-3 py-2 text-right tabular-nums">{formatMoney(r.unitPrice, currency)}</div>
              <div className="px-3 py-2 text-right tabular-nums">{r.vatPct}</div>
              <div className="px-3 py-2 text-right font-medium tabular-nums">{formatMoney(r.total, currency)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-12 gap-4 mt-6">
        <div className="col-span-7 text-[11px] text-slate-500">
          <div className="mb-1 uppercase tracking-wide">Notes</div>
          <div className="text-[12px] text-slate-600">{invoice.notes || "Payment within 14 days."}</div>
        </div>
        <div className="col-span-5">
          <div className="text-[12px]" style={{ borderTop: `1px solid ${tokens.line}` }}>
            <div className="grid grid-cols-[1fr_auto] gap-x-6 py-2">
              <div className="text-slate-600">Subtotal (Net)</div>
              <div className="text-right tabular-nums">{formatMoney(totals.net, currency)}</div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-x-6 py-2">
              <div className="text-slate-600">VAT</div>
              <div className="text-right tabular-nums">{formatMoney(totals.vat, currency)}</div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-x-6 py-3" style={{ borderTop: `1px solid ${tokens.line}` }}>
              <div className="font-semibold">Total</div>
              <div className="text-right font-semibold tabular-nums" style={{ color: tokens.text }}>{formatMoney(totals.total, currency)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      {(invoice.company.iban || invoice.company.bankName || invoice.company.bic) && (
        <div className="absolute left-14 right-14 bottom-20 text-[12px] text-slate-600">
          <div className="font-semibold mb-2" style={{ color: tokens.text }}>Payment Details:</div>
          <div className="grid grid-cols-3 gap-x-4">
            {invoice.company.iban && (
              <div>
                <span className="text-slate-500">IBAN:</span> {invoice.company.iban}
              </div>
            )}
            {invoice.company.bankName && (
              <div>
                <span className="text-slate-500">Bank:</span> {invoice.company.bankName}
              </div>
            )}
            {invoice.company.bic && (
              <div>
                <span className="text-slate-500">BIC:</span> {invoice.company.bic}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute left-14 right-14 bottom-10 text-center text-[11px] text-slate-500">
        This invoice is generated electronically and is valid without a signature.
      </div>
    </div>
  );
}



