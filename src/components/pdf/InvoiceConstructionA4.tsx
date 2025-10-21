'use client';

import React from 'react';
import { Invoice } from '@/types/invoice';

function money(v: number, currency: string) {
  const abs = Math.abs(v);
  const opts: Intl.NumberFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  try {
    return `${v < 0 ? '-' : ''}${currency} ${new Intl.NumberFormat(undefined, opts).format(abs)}`;
  } catch {
    return `${currency} ${abs.toFixed(2)}`;
  }
}

interface InvoiceConstructionA4Props {
  invoice: Invoice;
}

export default function InvoiceConstructionA4({ invoice }: InvoiceConstructionA4Props) {
  const currency = invoice.currency || 'GBP';
  const vatMode = invoice.vatMode || 'Domestic';
  
  // Calculate line items with VAT
  const rows = invoice.items.map((item, index) => {
    const vatPct = vatMode === 'Domestic' ? (item.vatRate || 0) : 0;
    const qty = item.quantity;
    const unit = item.unitPrice;
    const net = qty * unit;
    const vat = net * (vatPct / 100);
    const total = net + vat;
    return { ...item, id: index + 1, vatPct, net, vat, total, lineTotal: total };
  });

  const totals = {
    net: rows.reduce((s, r) => s + r.net, 0),
    vat: rows.reduce((s, r) => s + r.vat, 0),
    total: rows.reduce((s, r) => s + r.net + r.vat, 0),
  };

  // VAT note based on mode
  let zeroNote = '';
  if (vatMode === 'Intra‑EU') {
    zeroNote = 'Intra‑EU supply. VAT 0%. Reverse charge may apply (Art. 196).';
  } else if (vatMode === 'Export') {
    zeroNote = 'Export outside EU. VAT 0%. Out of scope.';
  }

  return (
    <div className="w-full">
      <style>{`
        @page { size: A4; margin: 14mm 14mm 16mm 14mm; }
        @media print { body { background: white; } }
        .a4 { width: 210mm; max-height: 297mm; margin: 0 auto; background: white; box-shadow: 0 1px 6px rgba(0,0,0,0.06); overflow: hidden; }
        .muted { color: #64748b; }
        .label { font-size: 11px; color: #334155; letter-spacing: .02em; }
        .table { width: 100%; border-collapse: collapse; }
        .table th { font-size: 11px; text-align: left; padding: 6px 8px; border-bottom: 1px dashed rgba(0,0,0,.15); color:#334155 }
        .table td { font-size: 12px; padding: 8px 8px; border-bottom: 1px solid rgba(0,0,0,.06); }
        .right { text-align: right; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
        .footer { position: running(footer); font-size: 11px; color: #64748b; }
        #print-area, #dash-print-area { display: none; }
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area *, #dash-print-area, #dash-print-area * { visibility: visible; }
          #print-area, #dash-print-area { display: block !important; position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>

      <div id="print-area">
        <div className="a4 p-[12mm]">
          {/* Accent line */}
          <div className="h-1 w-full rounded bg-gradient-to-r from-yellow-400 via-amber-300 to-transparent" />

          {/* Header */}
          <div className="mt-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {invoice.company.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={invoice.company.logoUrl} alt="Logo" className="h-10 w-28 object-contain" />
              ) : (
                <div className="h-10 w-40 rounded bg-slate-100 border border-dashed border-slate-300" />
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-slate-800">INVOICE</div>
              <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                <div className="text-slate-500">Invoice №</div><div>{invoice.invoiceNumber || '-'}</div>
                <div className="text-slate-500">Date</div><div>{invoice.issueDate || '-'}</div>
                <div className="text-slate-500">Due</div><div>{invoice.dueDate || '-'}</div>
                <div className="text-slate-500">PO / Ref</div><div>-</div>
              </div>
            </div>
          </div>

          {/* From / Bill To */}
          <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
            <div>
              <div className="font-semibold mb-1">From</div>
              <div className="p-3 rounded border border-dashed border-slate-300 bg-slate-50">
                <div className="font-semibold">{invoice.company.name}</div>
                {invoice.company.vatNumber && <div className="muted">VAT / Reg {invoice.company.vatNumber}</div>}
                {invoice.company.address && <div>{invoice.company.address}</div>}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Bill to</div>
              <div className="p-3 rounded border border-dashed border-slate-300 bg-slate-50">
                <div className="font-semibold">{invoice.client.name}</div>
                {invoice.client.vatNumber && <div className="muted">VAT / Reg {invoice.client.vatNumber}</div>}
                {invoice.client.address && <div>{invoice.client.address}</div>}
              </div>
            </div>
          </div>

          {/* Items table */}
          <div className="mt-8">
            <div className="text-sm font-semibold mb-2">Items</div>
            <div className="rounded-lg overflow-hidden border border-slate-200">
              <div className="grid grid-cols-[1fr,80px,100px,80px,120px] text-xs bg-slate-50 border-b border-slate-200">
                <div className="px-3 py-2">Description</div>
                <div className="px-3 py-2 text-right">Qty</div>
                <div className="px-3 py-2 text-right">Rate</div>
                <div className="px-3 py-2 text-right">Tax</div>
                <div className="px-3 py-2 text-right">Line total</div>
              </div>
              {rows.map((it, i) => (
                <div key={i} className={`grid grid-cols-[1fr,80px,100px,80px,120px] text-sm ${i%2? 'bg-slate-50':''}`}>
                  <div className="px-3 py-3">{it.description}</div>
                  <div className="px-3 py-3 text-right">{it.quantity}</div>
                  <div className="px-3 py-3 text-right">{money(it.unitPrice, currency)}</div>
                  <div className="px-3 py-3 text-right">{it.vatPct}%</div>
                  <div className="px-3 py-3 text-right">{money(it.lineTotal, currency)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mt-8 ml-auto w-[360px] text-sm">
            <div className="grid grid-cols-2 gap-y-2">
              <div className="text-slate-500">Subtotal</div><div className="text-right">{money(totals.net, currency)}</div>
              <div className="text-slate-500">Tax</div><div className="text-right">{money(totals.vat, currency)}</div>
              <div className="text-slate-500">Shipping</div><div className="text-right">{money(0, currency)}</div>
              <div className="h-px bg-slate-200 col-span-2 my-1" />
              <div className="font-semibold">Total</div><div className="text-right font-semibold">{money(totals.total, currency)}</div>
            </div>
          </div>

          {/* Payment & Notes */}
          <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
            <div>
              <div className="font-semibold mb-1">Payment details</div>
              <div className="p-3 rounded border border-dashed border-slate-300 bg-slate-50">
                {invoice.company.iban && <div><span className="muted">IBAN:</span> {invoice.company.iban}</div>}
                {invoice.company.bankName && <div><span className="muted">Bank:</span> {invoice.company.bankName}</div>}
                {invoice.company.bic && <div><span className="muted">BIC:</span> {invoice.company.bic}</div>}
                {zeroNote && <div className="mt-2 text-emerald-700 text-xs">{zeroNote}</div>}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Notes</div>
              <div className="p-3 rounded border border-dashed border-slate-300 bg-slate-50">
                {invoice.notes || '-'}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-2 text-[11px] text-slate-500">
            This invoice is generated electronically and is valid without a signature.
          </div>
        </div>
      </div>
    </div>
  );
}
