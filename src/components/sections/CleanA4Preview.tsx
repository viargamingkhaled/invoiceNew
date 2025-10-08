import React from "react";

interface CleanA4PreviewProps {
  className?: string;
}

export default function CleanA4Preview({ className = "" }: CleanA4PreviewProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Mini CleanA4 Preview */}
      <div className="w-full h-full bg-white rounded-lg border border-black/5 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F766E] text-white px-2 py-1">
          <div className="text-[5px] font-semibold">INVOICE</div>
          <div className="text-[4px] opacity-90">VI-2025-001</div>
        </div>

        {/* Content */}
        <div className="p-2 h-full">
          {/* From/To */}
          <div className="flex justify-between mb-2">
            <div className="flex-1">
              <div className="text-[4px] uppercase tracking-wide text-slate-500">From</div>
              <div className="text-[5px] font-medium text-slate-800">Ventira Ltd</div>
              <div className="text-[4px] text-slate-600">VAT: GB123456789</div>
            </div>
            <div className="flex-1">
              <div className="text-[4px] uppercase tracking-wide text-slate-500">Bill to</div>
              <div className="text-[5px] font-medium text-slate-800">Client s.r.o.</div>
              <div className="text-[4px] text-slate-600">VAT: CZ12345678</div>
            </div>
          </div>

          {/* Items table */}
          <div className="mb-2">
            {/* Header */}
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[3px] uppercase tracking-wide bg-slate-50 border-t border-b border-slate-200">
              <div className="px-0.5 py-0.5">#</div>
              <div className="px-0.5 py-0.5">Description</div>
              <div className="px-0.5 py-0.5 text-right">Qty</div>
              <div className="px-0.5 py-0.5 text-right">Unit</div>
              <div className="px-0.5 py-0.5 text-right">Total</div>
            </div>
            {/* Rows */}
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[4px] border-b border-slate-200">
              <div className="px-0.5 py-0.5 text-slate-500">1</div>
              <div className="px-0.5 py-0.5 text-slate-700">Design workshop</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">2</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">£600</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£1,200</div>
            </div>
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[4px] bg-slate-50 border-b border-slate-200">
              <div className="px-0.5 py-0.5 text-slate-500">2</div>
              <div className="px-0.5 py-0.5 text-slate-700">UI template</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">1</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">£250</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£250</div>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="text-[4px] border-t border-slate-200 w-20">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">Subtotal</span>
                <span className="tabular-nums">£1,450</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">VAT</span>
                <span className="tabular-nums">£290</span>
              </div>
              <div className="flex justify-between py-0.5 border-t border-slate-200 font-semibold">
                <span>Total</span>
                <span className="tabular-nums">£1,740</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-1">
            <div className="text-[3px] uppercase tracking-wide text-slate-500">Notes</div>
            <div className="text-[4px] text-slate-600">Payment within 14 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}


