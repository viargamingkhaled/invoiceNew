import React from "react";

interface CompactFitPreviewProps {
  className?: string;
}

export default function CompactFitPreview({ className = "" }: CompactFitPreviewProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Mini Compact Fit Preview */}
      <div className="w-full h-full bg-white rounded-lg border border-black/5 overflow-hidden">
        {/* Header */}
        <div className="bg-[#14B8A6] text-white px-2 py-1">
          <div className="text-[5px] font-semibold">IT SERVICES</div>
          <div className="text-[4px] opacity-90">IT-2025-001</div>
        </div>

        {/* Content */}
        <div className="p-2 h-full">
          {/* From/To */}
          <div className="flex justify-between mb-2">
            <div className="flex-1">
              <div className="text-[4px] uppercase tracking-wide text-slate-500">Provider</div>
              <div className="text-[5px] font-medium text-slate-800">Ventira IT</div>
              <div className="text-[4px] text-slate-600">VAT: GB123456789</div>
            </div>
            <div className="flex-1">
              <div className="text-[4px] uppercase tracking-wide text-slate-500">Client</div>
              <div className="text-[5px] font-medium text-slate-800">Tech Startup</div>
              <div className="text-[4px] text-slate-600">VAT: GB111222333</div>
            </div>
          </div>

          {/* Items table - compact design */}
          <div className="mb-2">
            {/* Header */}
            <div className="grid grid-cols-[6px_1fr_15px_25px] items-center text-[3px] uppercase tracking-wide bg-[#14B8A6] text-white">
              <div className="px-0.5 py-0.5">#</div>
              <div className="px-0.5 py-0.5">Service</div>
              <div className="px-0.5 py-0.5 text-right">Qty</div>
              <div className="px-0.5 py-0.5 text-right">Total</div>
            </div>
            {/* Rows */}
            <div className="grid grid-cols-[6px_1fr_15px_25px] items-center text-[4px] border-b border-slate-200">
              <div className="px-0.5 py-0.5 text-slate-500">1</div>
              <div className="px-0.5 py-0.5 text-slate-700">Web development</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">1</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£2,500</div>
            </div>
            <div className="grid grid-cols-[6px_1fr_15px_25px] items-center text-[4px] bg-slate-50 border-b border-slate-200">
              <div className="px-0.5 py-0.5 text-slate-500">2</div>
              <div className="px-0.5 py-0.5 text-slate-700">Database setup</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">1</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£800</div>
            </div>
            <div className="grid grid-cols-[6px_1fr_15px_25px] items-center text-[4px] border-b border-slate-200">
              <div className="px-0.5 py-0.5 text-slate-500">3</div>
              <div className="px-0.5 py-0.5 text-slate-700">Support</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">1</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£300</div>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="text-[4px] border-t border-slate-200 w-20">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">Subtotal</span>
                <span className="tabular-nums">£3,600</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">VAT</span>
                <span className="tabular-nums">£720</span>
              </div>
              <div className="flex justify-between py-0.5 border-t border-slate-200 font-semibold">
                <span>Total</span>
                <span className="tabular-nums">£4,320</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-1">
            <div className="text-[3px] uppercase tracking-wide text-slate-500">Notes</div>
            <div className="text-[4px] text-slate-600">Monthly support included</div>
          </div>
        </div>
      </div>
    </div>
  );
}


