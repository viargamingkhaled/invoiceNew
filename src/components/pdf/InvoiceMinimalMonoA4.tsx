import React from "react";
import { Invoice } from "@/types/invoice";

// ─────────────────────────────────────────────────────────────
// Ventira — Invoice "Minimal Mono" (A4 Template)
// Engineer‑style print: mono for numbers/meta, minimal lines, no cards/zebra.
// Print‑friendly. Contrasts AA. Multi‑currency ready. VAT modes.
// ─────────────────────────────────────────────────────────────

const c = {
  text: "#0B1221",
  muted: "#475569",
  line: "#E5E7EB",
  accent: "#0F766E",
};

function formatMoney(x: number, currency: string) {
  const map: Record<string, string> = { GBP: "en-GB", EUR: "de-DE", USD: "en-US", PLN: "pl-PL", CZK: "cs-CZ" };
  try { 
    return new Intl.NumberFormat(map[currency] || "en-GB", { style: "currency", currency }).format(x || 0); 
  } catch { 
    return String(x ?? 0); 
  }
}

interface InvoiceMinimalMonoA4Props {
  invoice: Invoice;
}

export default function InvoiceMinimalMonoA4({ invoice }: InvoiceMinimalMonoA4Props) {
  const vatMode = invoice.vatMode || "Domestic";
  const currency = invoice.currency || "EUR";

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
      style={{ width: 794, maxHeight: 1123, padding: 56, overflow: 'hidden' }} // A4 @96dpi ~ 794x1123, 15mm ~ 56px
    >
      {/* Top meta line (mono) */}
      <div className="font-mono text-[12px] text-slate-700 border-b pb-2" style={{ borderColor: c.line }}>
        <span className="mr-3">INVOICE {invoice.invoiceNumber}</span>
        <span className="mr-3">| {invoice.issueDate}</span>
        <span>| Due {invoice.dueDate}</span>
      </div>

      {/* Parties */}
      <div className="grid grid-cols-12 gap-6 mt-4">
        <div className="col-span-6">
          <div className="font-mono text-[11px] uppercase tracking-wide text-slate-500">From</div>
          <div className="text-[13px] font-semibold text-slate-800">{invoice.company.name}</div>
          <div className="font-mono text-[12px] text-slate-600">
            {[
              invoice.company.vatNumber && `VAT:${invoice.company.vatNumber}`,
              invoice.company.registrationNumber && `Reg:${invoice.company.registrationNumber}`
            ].filter(Boolean).join('  ')}
          </div>
          <div className="font-mono text-[12px] text-slate-600 whitespace-pre-line">{invoice.company.address}</div>
          <div className="font-mono text-[12px] text-slate-600">
            {[invoice.company.email, invoice.company.phone].filter(Boolean).join('  ')}
          </div>
        </div>
        <div className="col-span-6">
          <div className="font-mono text-[11px] uppercase tracking-wide text-slate-500">Bill to</div>
          <div className="text-[13px] font-semibold text-slate-800">{invoice.client.name}</div>
          <div className="font-mono text-[12px] text-slate-600">
            {invoice.client.vatNumber && `VAT:${invoice.client.vatNumber}`}
          </div>
          <div className="font-mono text-[12px] text-slate-600 whitespace-pre-line">{invoice.client.address}</div>
          <div className="font-mono text-[12px] text-slate-600">{invoice.client.email}</div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <div className="grid grid-cols-[48px_1fr_80px_110px_72px_140px] items-center text-[11px] uppercase tracking-wide border-t border-b" style={{ borderColor: c.line }}>
          <div className="px-3 py-2">#</div>
          <div className="px-3 py-2">Description</div>
          <div className="px-3 py-2 text-right">Qty</div>
          <div className="px-3 py-2 text-right">Unit</div>
          <div className="px-3 py-2 text-right">VAT%</div>
          <div className="px-3 py-2 text-right">Line total</div>
        </div>
        <div>
          {hasItems ? (
            rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[48px_1fr_80px_110px_72px_140px] items-center text-[12px] border-b" style={{ borderColor: c.line }}>
                <div className="px-3 py-2 text-slate-500 font-mono">{r.id}</div>
                <div className="px-3 py-2 text-slate-700">{r.description}</div>
                <div className="px-3 py-2 text-right tabular-nums font-mono">{r.quantity}</div>
                <div className="px-3 py-2 text-right tabular-nums font-mono">{formatMoney(r.unitPrice, currency)}</div>
                <div className="px-3 py-2 text-right tabular-nums font-mono">{r.vatPct}</div>
                <div className="px-3 py-2 text-right font-semibold tabular-nums font-mono">{formatMoney(r.total, currency)}</div>
              </div>
            ))
          ) : (
            <div className="text-[12px] text-slate-500 px-3 py-6 border-b" style={{ borderColor: c.line }}>
              No items provided.
            </div>
          )}
        </div>
      </div>

      {/* Totals (mono block, right aligned) */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-7">
          <div className="font-mono text-[11px] uppercase tracking-wide text-slate-500 mb-1">Notes</div>
          <div className="font-mono text-[12px] text-slate-600 whitespace-pre-line">{invoice.notes || ''}</div>
        </div>
        <div className="col-span-5">
          <div className="font-mono text-[12px] border-t" style={{ borderColor: c.line }}>
            <div className="grid grid-cols-[1fr_auto] gap-x-6 py-2">
              <div className="text-slate-600">Subtotal (Net)</div>
              <div className="text-right tabular-nums">{formatMoney(totals.net, currency)}</div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-x-6 py-2">
              <div className="text-slate-600">VAT</div>
              <div className="text-right tabular-nums">{formatMoney(totals.vat, currency)}</div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-x-6 py-3 border-t" style={{ borderColor: c.line }}>
              <div className="font-semibold">Total</div>
              <div className="text-right font-semibold tabular-nums" style={{ color: c.text }}>{formatMoney(totals.total, currency)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* VAT legal note */}
      <div className="mt-3 font-mono text-[11px] text-slate-600">
        {vatMode === 'Domestic' && (<div>VAT charged at line‑item rate where applicable.</div>)}
        {vatMode === 'Intra‑EU' && (<div>Intra‑EU supply. VAT 0%. Reverse charge may apply (Art. 196).</div>)}
        {vatMode === 'Export' && (<div>Export outside EU. VAT 0%. Out of scope.</div>)}
      </div>

      {/* Bank Details */}
      {(invoice.company.iban || invoice.company.bankName || invoice.company.bic) && (
        <div className="absolute left-14 right-14 bottom-20 text-[12px] text-slate-600 font-mono">
          <div className="font-semibold mb-2">PAYMENT_DETAILS:</div>
          <div className="grid grid-cols-3 gap-x-4">
            {invoice.company.iban && (
              <div>
                <span className="text-slate-500">IBAN:</span> {invoice.company.iban}
              </div>
            )}
            {invoice.company.bankName && (
              <div>
                <span className="text-slate-500">BANK:</span> {invoice.company.bankName}
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
      <div className="absolute left-14 right-14 bottom-10 text-center text-[11px] text-slate-500 font-mono">
        This invoice is generated electronically and is valid without a signature.
      </div>
    </div>
  );
}



