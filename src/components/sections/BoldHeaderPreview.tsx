import React from "react";

interface BoldHeaderPreviewProps {
  className?: string;
}

export default function BoldHeaderPreview({ className = "" }: BoldHeaderPreviewProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Mini Bold Header Preview */}
      <div className="w-full h-full bg-white rounded-lg border border-black/5 overflow-hidden">
        {/* Masthead */}
        <div className="w-full h-8 bg-[#0F766E] flex items-center justify-between px-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white/20 rounded"></div>
            <div className="text-white text-[6px] font-semibold">Ventira Ltd</div>
          </div>
          <div className="text-right">
            <div className="text-white text-[5px] uppercase tracking-wide opacity-90">INVOICE</div>
            <div className="text-white text-[6px] font-semibold">VI-2025-001</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 h-full">
          {/* From/To */}
          <div className="flex justify-between mb-2">
            <div className="flex-1">
              <div className="text-[5px] uppercase tracking-wide text-slate-500">From</div>
              <div className="text-[6px] font-medium text-slate-800">Ventira Ltd</div>
              <div className="text-[5px] text-slate-600">VAT: GB123456789</div>
            </div>
            <div className="flex-1">
              <div className="text-[5px] uppercase tracking-wide text-slate-500">Bill to</div>
              <div className="text-[6px] font-medium text-slate-800">Client s.r.o.</div>
              <div className="text-[5px] text-slate-600">VAT: CZ12345678</div>
            </div>
          </div>

          {/* VAT badges */}
          <div className="flex gap-1 mb-2">
            <span className="text-[4px] px-1 py-0.5 rounded-full border border-slate-200 text-slate-600">VAT: Domestic</span>
            <span className="text-[4px] px-1 py-0.5 rounded-full border border-slate-200 text-slate-600">Currency: GBP</span>
          </div>

          {/* Items table */}
          <div className="mb-2">
            {/* Header */}
            <div className="grid grid-cols-[12px_1fr_20px_30px_15px_35px] items-center text-[4px] uppercase tracking-wide bg-[#0F766E] text-white">
              <div className="px-1 py-0.5">#</div>
              <div className="px-1 py-0.5">Description</div>
              <div className="px-1 py-0.5 text-right">Qty</div>
              <div className="px-1 py-0.5 text-right">Unit</div>
              <div className="px-1 py-0.5 text-right">VAT</div>
              <div className="px-1 py-0.5 text-right">Total</div>
            </div>
            {/* Rows */}
            <div className="grid grid-cols-[12px_1fr_20px_30px_15px_35px] items-center text-[5px] border-b border-slate-200">
              <div className="px-1 py-0.5 text-slate-500">1</div>
              <div className="px-1 py-0.5 text-slate-700">Design workshop</div>
              <div className="px-1 py-0.5 text-right tabular-nums">2</div>
              <div className="px-1 py-0.5 text-right tabular-nums">£600</div>
              <div className="px-1 py-0.5 text-right tabular-nums">20</div>
              <div className="px-1 py-0.5 text-right font-medium tabular-nums">£1,440</div>
            </div>
            <div className="grid grid-cols-[12px_1fr_20px_30px_15px_35px] items-center text-[5px] bg-slate-50 border-b border-slate-200">
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
            <div className="text-[5px] border border-slate-200 rounded-lg w-20">
              <div className="flex justify-between px-2 py-1 border-b border-slate-200">
                <span className="text-slate-600">Subtotal</span>
                <span className="tabular-nums">£1,450</span>
              </div>
              <div className="flex justify-between px-2 py-1 border-b border-slate-200">
                <span className="text-slate-600">VAT</span>
                <span className="tabular-nums">£240</span>
              </div>
              <div className="flex justify-between px-2 py-1 font-semibold">
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



