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

interface InvoiceA4Props {
  invoice: Invoice;
}

export default function InvoiceA4({ invoice }: InvoiceA4Props) {
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
    return { ...item, id: index + 1, vatPct, net, vat, total };
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
        @page { size: A4; margin: 10mm 10mm 12mm 10mm; }
        @media print { 
          body { background: white; margin: 0; padding: 0; }
          * { box-sizing: border-box; }
        }
        .a4 { width: 210mm; max-height: 297mm; margin: 0 auto; background: white; box-shadow: 0 1px 6px rgba(0,0,0,0.06); overflow: hidden; }
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

        /* Keep the print area hidden on screen */
        #print-area, #dash-print-area { display: none; }

        /* Print isolation: only print the print-area when printing */
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area *, #dash-print-area, #dash-print-area * { visibility: visible; }
          #print-area, #dash-print-area { display: block !important; position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>

      <div id="print-area">
        <div className="a4 p-[10mm]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {invoice.company.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={invoice.company.logoUrl} alt="Logo" className="h-10 w-28 object-contain" />
              )}
            </div>
            <div className="text-right text-sm text-slate-600">
              <div className="font-semibold text-slate-800">Invoice {invoice.invoiceNumber}</div>
              <div>Date: {invoice.issueDate || '-'}</div>
              <div>Due: {invoice.dueDate || '-'}</div>
            </div>
          </div>

          <div className="cut" />

          <div className="grid-2">
            <div className="avoid-break">
              <div className="label">From</div>
              <div className="mt-1 text-sm">
                <div className="font-semibold">{invoice.company.name}</div>
                {invoice.company.vatNumber && <div className="muted">VAT {invoice.company.vatNumber}</div>}
                {invoice.company.address && <div>{invoice.company.address}</div>}
              </div>
            </div>
            <div className="avoid-break">
              <div className="label">Bill To</div>
              <div className="mt-1 text-sm">
                <div className="font-semibold">{invoice.client.name}</div>
                {invoice.client.email && <div className="muted">{invoice.client.email}</div>}
                {invoice.client.vatNumber && <div className="muted">VAT {invoice.client.vatNumber}</div>}
                {invoice.client.address && <div>{invoice.client.address}</div>}
              </div>
            </div>
          </div>

          <div className="cut" />

          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '54%' }}>Item</th>
                <th className="right" style={{ width: '10%' }}>Qty</th>
                <th className="right" style={{ width: '18%' }}>Rate ({currency})</th>
                <th className="right" style={{ width: '18%' }}>Tax</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((it, i) => (
                <tr key={i} className="avoid-break">
                  <td>{it.description}</td>
                  <td className="right">{it.quantity}</td>
                  <td className="right">{money(it.unitPrice, currency)}</td>
                  <td className="right">{it.vatPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cut" />

          <div className="grid-2">
            <div className="avoid-break">
              <div className="label">Payment details</div>
              <div className="mt-1 text-sm">
                {invoice.company.iban && (
                  <div><span className="muted">IBAN:</span> {invoice.company.iban}</div>
                )}
                {invoice.company.bankName && (
                  <div><span className="muted">Bank:</span> {invoice.company.bankName}</div>
                )}
                {invoice.company.bic && (
                  <div><span className="muted">BIC:</span> {invoice.company.bic}</div>
                )}
                {zeroNote && <div className="mt-2 text-emerald-700 text-xs">{zeroNote}</div>}
              </div>
            </div>
            <div className="avoid-break">
              <table className="table" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <tbody>
                  <tr>
                    <td className="right muted">Subtotal</td>
                    <td className="right" style={{ width: '40%' }}>{money(totals.net, currency)}</td>
                  </tr>
                  <tr>
                    <td className="right muted">Tax</td>
                    <td className="right">{money(totals.vat, currency)}</td>
                  </tr>
                  <tr className="totals">
                    <td className="right">Total</td>
                    <td className="right">{money(totals.total, currency)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {invoice.notes && (
            <div className="avoid-break mt-6">
              <div className="label">Notes</div>
              <div className="mt-1 text-sm">{invoice.notes}</div>
            </div>
          )}

          <div className="cut" />

          <div className="footer">This invoice is generated electronically and is valid without a signature.</div>
        </div>
      </div>
    </div>
  );
}
