import React from "react";
import { Invoice } from "@/types/invoice";

// ─────────────────────────────────────────────────────────────
// Ventira — Invoice "Bold Header" (A4 Template)
// Solid brand masthead, inverted table header, flat content blocks.
// Print‑friendly. Contrasts AA. Multi‑currency ready. VAT modes.
// ─────────────────────────────────────────────────────────────

const colors = {
  brand: "#0F766E", // Palette B primary
  brandAlt: "#14B8A6", // accent (optional usage)
  text: "#0B1221",
  textOnBrand: "#FFFFFF",
  muted: "#6B7280",
  line: "#E5E7EB",
  surface: "#FFFFFF",
  surfaceAlt: "#F8FAFC",
};

function formatMoney(x: number, currency: string) {
  const map: Record<string, string> = { GBP: "en-GB", EUR: "de-DE", USD: "en-US", PLN: "pl-PL", CZK: "cs-CZ" };
  try { 
    return new Intl.NumberFormat(map[currency] || "en-GB", { style: "currency", currency }).format(x || 0); 
  } catch { 
    return String(x ?? 0); 
  }
}

interface InvoiceBoldHeaderA4Props {
  invoice: Invoice;
}

export default function InvoiceBoldHeaderA4({ invoice }: InvoiceBoldHeaderA4Props) {
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
      className="relative bg-white mx-auto"
      style={{ width: 794, height: 1123, padding: 56 }} // A4 @96dpi ~ 794x1123, 15mm ~ 56px
    >
      {/* Masthead (45–55mm) */}
      <div className="w-full" style={{ background: colors.brand, color: colors.textOnBrand, padding: 32 }}>
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-7">
            <div className="flex items-center gap-3">
              {/* Logo if provided */}
              {invoice.company.logoUrl ? (
                <img src={invoice.company.logoUrl} alt="Logo" className="h-8 w-8 object-contain" />
              ) : (
                <div className="h-8 w-8 rounded-md" style={{ background: colors.textOnBrand, opacity: 0.15 }} />
              )}
              <div className="text-lg font-semibold tracking-tight">{invoice.company.name}</div>
            </div>
          </div>
          <div className="col-span-5 text-right">
            <div className="uppercase tracking-wide text-xs opacity-90">INVOICE</div>
            <div className="text-base font-semibold">{invoice.invoiceNumber}</div>
            <div className="text-sm opacity-90">Issue: {invoice.issueDate}</div>
            <div className="text-sm opacity-90">Due: {invoice.dueDate}</div>
          </div>
        </div>
      </div>

      {/* Body padding (A4 with 15mm margins → ~56px). Use 40px because masthead already has padding. */}
      <div className="px-14 pt-10 pb-14">
        {/* From / Bill to */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">From</div>
            <div className="text-[13px] font-medium text-slate-800">{invoice.company.name}</div>
            <div className="text-[12px] text-slate-600">
              {[
                invoice.company.vatNumber && `VAT: ${invoice.company.vatNumber}`,
                invoice.company.registrationNumber && `Reg: ${invoice.company.registrationNumber}`
              ].filter(Boolean).join(' · ')}
            </div>
            <div className="text-[12px] text-slate-600">{invoice.company.address}</div>
            <div className="text-[12px] text-slate-600">
              {[invoice.company.email, invoice.company.phone].filter(Boolean).join(' · ')}
            </div>
          </div>
          <div className="col-span-6">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">Bill to</div>
            <div className="text-[13px] font-medium text-slate-800">{invoice.client.name}</div>
            <div className="text-[12px] text-slate-600">
              {invoice.client.vatNumber && `VAT: ${invoice.client.vatNumber}`}
            </div>
            <div className="text-[12px] text-slate-600">{invoice.client.address}</div>
            <div className="text-[12px] text-slate-600">{invoice.client.email}</div>
          </div>
        </div>

        {/* VAT mode badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
          <span className="px-2 py-0.5 rounded-full border" style={{ borderColor: colors.line }}>VAT: {vatMode}</span>
          <span className="px-2 py-0.5 rounded-full border" style={{ borderColor: colors.line }}>Currency: {currency}</span>
        </div>

        {/* Items table with inverted header */}
        <div className="mt-8">
          {/* header */}
          <div className="grid grid-cols-[48px_1fr_80px_110px_72px_140px] items-center text-[11px] uppercase tracking-wide" style={{ background: colors.brand, color: colors.textOnBrand }}>
            <div className="px-3 py-2">#</div>
            <div className="px-3 py-2">Description</div>
            <div className="px-3 py-2 text-right">Qty</div>
            <div className="px-3 py-2 text-right">Unit</div>
            <div className="px-3 py-2 text-right">VAT%</div>
            <div className="px-3 py-2 text-right">Line total</div>
          </div>
          {/* rows */}
          <div className="border-b" style={{ borderColor: colors.line }}>
            {hasItems ? (
              rows.map((r, i) => (
                <div key={r.id} className="grid grid-cols-[48px_1fr_80px_110px_72px_140px] items-center text-[12px]" style={{ background: i % 2 ? colors.surfaceAlt : colors.surface, borderTop: `1px solid ${colors.line}` }}>
                  <div className="px-3 py-2 text-slate-500">{r.id}</div>
                  <div className="px-3 py-2 text-slate-700">{r.description}</div>
                  <div className="px-3 py-2 text-right tabular-nums">{r.quantity}</div>
                  <div className="px-3 py-2 text-right tabular-nums">{formatMoney(r.unitPrice, currency)}</div>
                  <div className="px-3 py-2 text-right tabular-nums">{r.vatPct}</div>
                  <div className="px-3 py-2 text-right font-medium tabular-nums">{formatMoney(r.total, currency)}</div>
                </div>
              ))
            ) : (
              <div className="text-[12px] text-slate-500 px-3 py-6">No items provided.</div>
            )}
          </div>
        </div>

        {/* Totals card (flat, bordered) */}
        <div className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-7">
            <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Notes</div>
            <div className="text-[12px] text-slate-600">{invoice.notes || ''}</div>
          </div>
          <div className="col-span-5">
            <div className="rounded-xl border" style={{ borderColor: colors.line }}>
              <div className="grid grid-cols-[1fr_auto] gap-x-6 px-4 py-2 text-[12px]" style={{ borderBottom: `1px solid ${colors.line}` }}>
                <div className="text-slate-600">Subtotal (Net)</div>
                <div className="text-right tabular-nums">{formatMoney(totals.net, currency)}</div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-x-6 px-4 py-2 text-[12px]" style={{ borderBottom: `1px solid ${colors.line}` }}>
                <div className="text-slate-600">VAT</div>
                <div className="text-right tabular-nums">{formatMoney(totals.vat, currency)}</div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-x-6 px-4 py-3">
                <div className="font-semibold">Total</div>
                <div className="text-right font-semibold tabular-nums" style={{ color: colors.text }}>{formatMoney(totals.total, currency)}</div>
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
      <div className="absolute left-14 right-14 bottom-10 text-center text-[11px] text-slate-500">
        This invoice is generated electronically and is valid without a signature.
      </div>
    </div>
  );
}



