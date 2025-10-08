import React from "react";

interface ModernStripePreviewProps {
  className?: string;
}

export default function ModernStripePreview({ className = "" }: ModernStripePreviewProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Mini Modern Stripe Preview */}
      <div className="w-full h-full bg-white rounded-lg border border-black/5 overflow-hidden">
        {/* Header with modern design */}
        <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white px-2 py-1">
          <div className="text-[5px] font-semibold">CONSULTING INVOICE</div>
          <div className="text-[4px] opacity-90">CON-2025-001</div>
        </div>

        {/* Content */}
        <div className="p-2 h-full">
          {/* From/To */}
          <div className="flex justify-between mb-2">
            <div className="flex-1">
              <div className="text-[4px] uppercase tracking-wide text-slate-500">Consultant</div>
              <div className="text-[5px] font-medium text-slate-800">Ventira Consulting</div>
              <div className="text-[4px] text-slate-600">VAT: GB123456789</div>
            </div>
            <div className="flex-1">
              <div className="text-[4px] uppercase tracking-wide text-slate-500">Client</div>
              <div className="text-[5px] font-medium text-slate-800">Business Corp</div>
              <div className="text-[4px] text-slate-600">VAT: GB444555666</div>
            </div>
          </div>

          {/* Items table with modern stripes */}
          <div className="mb-2">
            {/* Header */}
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[3px] uppercase tracking-wide bg-gradient-to-r from-slate-100 to-slate-200 border-t border-b border-slate-300">
              <div className="px-0.5 py-0.5">#</div>
              <div className="px-0.5 py-0.5">Consulting Service</div>
              <div className="px-0.5 py-0.5 text-right">Hrs</div>
              <div className="px-0.5 py-0.5 text-right">Rate</div>
              <div className="px-0.5 py-0.5 text-right">Total</div>
            </div>
            {/* Rows with alternating stripes */}
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[4px] border-b border-slate-200 bg-white">
              <div className="px-0.5 py-0.5 text-slate-500">1</div>
              <div className="px-0.5 py-0.5 text-slate-700">Strategic planning</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">10</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">£150</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£1,500</div>
            </div>
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[4px] bg-slate-50 border-b border-slate-200">
              <div className="px-0.5 py-0.5 text-slate-500">2</div>
              <div className="px-0.5 py-0.5 text-slate-700">Market analysis</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">8</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">£120</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£960</div>
            </div>
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[4px] border-b border-slate-200 bg-white">
              <div className="px-0.5 py-0.5 text-slate-500">3</div>
              <div className="px-0.5 py-0.5 text-slate-700">Implementation</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">5</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">£100</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£500</div>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="text-[4px] border-t border-slate-200 w-20">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">Subtotal</span>
                <span className="tabular-nums">£2,960</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">VAT</span>
                <span className="tabular-nums">£592</span>
              </div>
              <div className="flex justify-between py-0.5 border-t border-slate-200 font-semibold">
                <span>Total</span>
                <span className="tabular-nums">£3,552</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-1">
            <div className="text-[3px] uppercase tracking-wide text-slate-500">Notes</div>
            <div className="text-[4px] text-slate-600">Follow-up session included</div>
          </div>
        </div>
      </div>
    </div>
  );
}


