import React from "react";

interface MinimalMonoPreviewProps {
  className?: string;
}

export default function MinimalMonoPreview({ className = "" }: MinimalMonoPreviewProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Mini Minimal Mono Preview */}
      <div className="w-full h-full bg-white rounded-lg border border-black/5 overflow-hidden">
        {/* Top meta line */}
        <div className="font-mono text-[5px] text-slate-700 border-b border-slate-200 pb-1 px-2">
          <span className="mr-2">INVOICE VI-2025-001</span>
          <span className="mr-2">| 2025-01-15</span>
          <span>| Due 2025-01-29</span>
        </div>

        {/* Content */}
        <div className="p-2 h-full">
          {/* From/To */}
          <div className="flex justify-between mb-2">
            <div className="flex-1">
              <div className="font-mono text-[4px] uppercase tracking-wide text-slate-500">From</div>
              <div className="text-[6px] font-semibold text-slate-800">Ventira Ltd</div>
              <div className="font-mono text-[5px] text-slate-600">VAT:GB123456789</div>
              <div className="font-mono text-[5px] text-slate-600">221B Baker Street</div>
            </div>
            <div className="flex-1">
              <div className="font-mono text-[4px] uppercase tracking-wide text-slate-500">Bill to</div>
              <div className="text-[6px] font-semibold text-slate-800">Client s.r.o.</div>
              <div className="font-mono text-[5px] text-slate-600">VAT:CZ12345678</div>
              <div className="font-mono text-[5px] text-slate-600">Na Príkope 14</div>
            </div>
          </div>

          {/* Items table */}
          <div className="mb-2">
            {/* Header */}
            <div className="grid grid-cols-[12px_1fr_20px_30px_15px_35px] items-center text-[4px] uppercase tracking-wide border-t border-b border-slate-200">
              <div className="px-1 py-0.5">#</div>
              <div className="px-1 py-0.5">Description</div>
              <div className="px-1 py-0.5 text-right">Qty</div>
              <div className="px-1 py-0.5 text-right">Unit</div>
              <div className="px-1 py-0.5 text-right">VAT</div>
              <div className="px-1 py-0.5 text-right">Total</div>
            </div>
            {/* Rows */}
            <div className="grid grid-cols-[12px_1fr_20px_30px_15px_35px] items-center text-[5px] border-b border-slate-200">
              <div className="px-1 py-0.5 text-slate-500 font-mono">1</div>
              <div className="px-1 py-0.5 text-slate-700">Design workshop</div>
              <div className="px-1 py-0.5 text-right tabular-nums font-mono">2</div>
              <div className="px-1 py-0.5 text-right tabular-nums font-mono">£600</div>
              <div className="px-1 py-0.5 text-right tabular-nums font-mono">20</div>
              <div className="px-1 py-0.5 text-right font-semibold tabular-nums font-mono">£1,440</div>
            </div>
            <div className="grid grid-cols-[12px_1fr_20px_30px_15px_35px] items-center text-[5px] border-b border-slate-200">
              <div className="px-1 py-0.5 text-slate-500 font-mono">2</div>
              <div className="px-1 py-0.5 text-slate-700">UI template</div>
              <div className="px-1 py-0.5 text-right tabular-nums font-mono">1</div>
              <div className="px-1 py-0.5 text-right tabular-nums font-mono">£250</div>
              <div className="px-1 py-0.5 text-right tabular-nums font-mono">0</div>
              <div className="px-1 py-0.5 text-right font-semibold tabular-nums font-mono">£250</div>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="text-[5px] border-t border-slate-200 w-20">
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Subtotal</span>
                <span className="tabular-nums font-mono">£1,450</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">VAT</span>
                <span className="tabular-nums font-mono">£240</span>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-200 font-semibold">
                <span>Total</span>
                <span className="tabular-nums font-mono">£1,690</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-1">
            <div className="font-mono text-[4px] uppercase tracking-wide text-slate-500">Notes</div>
            <div className="font-mono text-[5px] text-slate-600">Payment within 14 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}



