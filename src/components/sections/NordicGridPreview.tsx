import React from "react";

interface NordicGridPreviewProps {
  className?: string;
}

export default function NordicGridPreview({ className = "" }: NordicGridPreviewProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Mini Nordic Grid Preview */}
      <div className="w-full h-full bg-white rounded-lg border border-black/5 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-30" aria-hidden>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="miniGrid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#miniGrid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative p-2 h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="text-[6px] uppercase tracking-wide text-slate-500">From</div>
              <div className="text-[8px] font-semibold text-slate-800">Ventira Ltd</div>
              <div className="text-[6px] text-slate-600">VAT: GB123456789</div>
            </div>
            <div className="text-right">
              <div className="text-[6px] uppercase tracking-wide text-[#0F766E]">INVOICE</div>
              <div className="text-[7px] font-semibold text-slate-800">VI-2025-001</div>
            </div>
          </div>

          {/* Client */}
          <div className="mb-2">
            <div className="text-[6px] uppercase tracking-wide text-slate-500">Bill to</div>
            <div className="text-[7px] font-medium text-slate-800">Client s.r.o.</div>
            <div className="text-[6px] text-slate-600">VAT: CZ12345678</div>
          </div>

          {/* Items table */}
          <div className="mb-2">
            {/* Header */}
            <div className="grid grid-cols-[12px_1fr_20px_30px_15px_35px] items-center text-[5px] uppercase tracking-wide bg-slate-50 border-t border-b border-slate-200">
              <div className="px-1 py-0.5">#</div>
              <div className="px-1 py-0.5">Description</div>
              <div className="px-1 py-0.5 text-right">Qty</div>
              <div className="px-1 py-0.5 text-right">Unit</div>
              <div className="px-1 py-0.5 text-right">VAT</div>
              <div className="px-1 py-0.5 text-right">Total</div>
            </div>
            {/* Rows */}
            <div className="grid grid-cols-[12px_1fr_20px_30px_15px_35px] items-center text-[6px] border-b border-slate-200">
              <div className="px-1 py-0.5 text-slate-500">1</div>
              <div className="px-1 py-0.5 text-slate-700">Design workshop</div>
              <div className="px-1 py-0.5 text-right tabular-nums">2</div>
              <div className="px-1 py-0.5 text-right tabular-nums">£600</div>
              <div className="px-1 py-0.5 text-right tabular-nums">20</div>
              <div className="px-1 py-0.5 text-right font-medium tabular-nums">£1,440</div>
            </div>
            <div className="grid grid-cols-[12px_1fr_20px_30px_15px_35px] items-center text-[6px] bg-slate-50 border-b border-slate-200">
              <div className="px-1 py-0.5 text-slate-500">2</div>
              <div className="px-1 py-0.5 text-slate-700">UI template</div>
              <div className="px-1 py-0.5 text-right tabular-nums">1</div>
              <div className="px-1 py-0.5 text-right tabular-nums">£250</div>
              <div className="px-1 py-0.5 text-right tabular-nums">0</div>
              <div className="px-1 py-0.5 text-right font-medium tabular-nums">£250</div>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="text-[6px] border-t border-slate-200 w-24">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">Subtotal</span>
                <span className="tabular-nums">£1,450</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">VAT</span>
                <span className="tabular-nums">£240</span>
              </div>
              <div className="flex justify-between py-0.5 border-t border-slate-200 font-semibold">
                <span>Total</span>
                <span className="tabular-nums">£1,690</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



