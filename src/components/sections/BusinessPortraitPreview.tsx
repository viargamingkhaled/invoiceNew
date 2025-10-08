import React from "react";

interface BusinessPortraitPreviewProps {
  className?: string;
}

export default function BusinessPortraitPreview({ className = "" }: BusinessPortraitPreviewProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Mini Business Portrait Preview */}
      <div className="w-full h-full bg-white rounded-lg border border-black/5 overflow-hidden">
        <div className="flex h-full">
          {/* Left vertical band */}
          <div className="w-8 bg-[#F6F7F8] flex flex-col items-center justify-center">
            <div className="w-4 h-4 bg-[#0F766E]/15 rounded-full mb-1"></div>
            <div className="text-[4px] font-semibold text-slate-800 text-center px-1">Ventira</div>
            <div className="text-[3px] text-slate-600 text-center px-1 mt-1">221B Baker St</div>
          </div>

          {/* Right content */}
          <div className="flex-1 p-1">
            {/* Header */}
            <div className="flex justify-end mb-1">
              <div className="text-right">
                <div className="text-[4px] uppercase tracking-wide text-[#0F766E]">INVOICE</div>
                <div className="text-[5px] font-semibold text-slate-800">VI-2025-001</div>
                <div className="text-[4px] text-slate-600">Issue: 2025-01-15</div>
                <div className="text-[4px] text-slate-600">Due: 2025-01-29</div>
              </div>
            </div>

            {/* From/To */}
            <div className="flex justify-between mb-1">
              <div className="flex-1">
                <div className="text-[3px] uppercase tracking-wide text-slate-500">From</div>
                <div className="text-[4px] font-medium text-slate-800">Ventira Ltd</div>
                <div className="text-[3px] text-slate-600">VAT: GB123456789</div>
              </div>
              <div className="flex-1">
                <div className="text-[3px] uppercase tracking-wide text-slate-500">Bill to</div>
                <div className="text-[4px] font-medium text-slate-800">Client s.r.o.</div>
                <div className="text-[3px] text-slate-600">VAT: CZ12345678</div>
              </div>
            </div>

            {/* Items table */}
            <div className="mb-1">
              {/* Header */}
              <div className="grid grid-cols-[8px_1fr_12px_20px_8px_25px] items-center text-[3px] uppercase tracking-wide bg-slate-50 border-t border-b border-slate-200">
                <div className="px-0.5 py-0.5">#</div>
                <div className="px-0.5 py-0.5">Description</div>
                <div className="px-0.5 py-0.5 text-right">Qty</div>
                <div className="px-0.5 py-0.5 text-right">Unit</div>
                <div className="px-0.5 py-0.5 text-right">VAT</div>
                <div className="px-0.5 py-0.5 text-right">Total</div>
              </div>
              {/* Rows */}
              <div className="grid grid-cols-[8px_1fr_12px_20px_8px_25px] items-center text-[4px] border-b border-slate-200">
                <div className="px-0.5 py-0.5 text-slate-500">1</div>
                <div className="px-0.5 py-0.5 text-slate-700">Design workshop</div>
                <div className="px-0.5 py-0.5 text-right tabular-nums">2</div>
                <div className="px-0.5 py-0.5 text-right tabular-nums">£600</div>
                <div className="px-0.5 py-0.5 text-right tabular-nums">20</div>
                <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£1,440</div>
              </div>
              <div className="grid grid-cols-[8px_1fr_12px_20px_8px_25px] items-center text-[4px] bg-slate-50 border-b border-slate-200">
                <div className="px-0.5 py-0.5 text-slate-500">2</div>
                <div className="px-0.5 py-0.5 text-slate-700">UI template</div>
                <div className="px-0.5 py-0.5 text-right tabular-nums">1</div>
                <div className="px-0.5 py-0.5 text-right tabular-nums">£250</div>
                <div className="px-0.5 py-0.5 text-right tabular-nums">0</div>
                <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£250</div>
              </div>
            </div>

            {/* Totals and Signature */}
            <div className="flex justify-between">
              <div className="flex-1">
                <div className="text-[3px] uppercase tracking-wide text-slate-500 mb-0.5">Notes</div>
                <div className="text-[3px] text-slate-600">Payment within 14 days</div>
                
                {/* Signature lines */}
                <div className="flex gap-2 mt-1">
                  <div className="flex-1">
                    <div className="h-px bg-slate-200"></div>
                    <div className="text-[2px] text-slate-500 mt-0.5">Signature</div>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 rounded-full border border-dashed border-slate-200"></div>
                    <div className="text-[2px] text-slate-500 mt-0.5">Stamp</div>
                  </div>
                </div>
              </div>
              
              <div className="w-16">
                <div className="text-[4px] border-t border-slate-200">
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
      </div>
    </div>
  );
}



