import React from "react";

interface ProLedgerPreviewProps {
  className?: string;
}

export default function ProLedgerPreview({ className = "" }: ProLedgerPreviewProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Mini Pro Ledger Preview */}
      <div className="w-full h-full bg-white rounded-lg border border-black/5 overflow-hidden">
        {/* Header with construction theme */}
        <div className="bg-[#0B1221] text-white px-2 py-1">
          <div className="text-[5px] font-bold">CONSTRUCTION INVOICE</div>
          <div className="text-[4px] opacity-90">CI-2025-001</div>
        </div>

        {/* Content */}
        <div className="p-2 h-full">
          {/* From/To */}
          <div className="flex justify-between mb-2">
            <div className="flex-1">
              <div className="text-[4px] uppercase tracking-wide text-slate-500">Contractor</div>
              <div className="text-[5px] font-medium text-slate-800">Ventira Construction</div>
              <div className="text-[4px] text-slate-600">VAT: GB123456789</div>
            </div>
            <div className="flex-1">
              <div className="text-[4px] uppercase tracking-wide text-slate-500">Client</div>
              <div className="text-[5px] font-medium text-slate-800">Building Corp</div>
              <div className="text-[4px] text-slate-600">VAT: GB987654321</div>
            </div>
          </div>

          {/* Project info */}
          <div className="mb-2 p-1 bg-slate-50 rounded border border-slate-200">
            <div className="text-[4px] uppercase tracking-wide text-slate-500">Project</div>
            <div className="text-[4px] text-slate-700">Office Building Renovation</div>
          </div>

          {/* Items table */}
          <div className="mb-2">
            {/* Header */}
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[3px] uppercase tracking-wide bg-[#0B1221] text-white">
              <div className="px-0.5 py-0.5">#</div>
              <div className="px-0.5 py-0.5">Work Description</div>
              <div className="px-0.5 py-0.5 text-right">Hrs</div>
              <div className="px-0.5 py-0.5 text-right">Rate</div>
              <div className="px-0.5 py-0.5 text-right">Total</div>
            </div>
            {/* Rows */}
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[4px] border-b border-slate-200">
              <div className="px-0.5 py-0.5 text-slate-500">1</div>
              <div className="px-0.5 py-0.5 text-slate-700">Electrical work</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">8</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">£45</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£360</div>
            </div>
            <div className="grid grid-cols-[8px_1fr_12px_20px_25px] items-center text-[4px] bg-slate-50 border-b border-slate-200">
              <div className="px-0.5 py-0.5 text-slate-500">2</div>
              <div className="px-0.5 py-0.5 text-slate-700">Plumbing</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">6</div>
              <div className="px-0.5 py-0.5 text-right tabular-nums">£40</div>
              <div className="px-0.5 py-0.5 text-right font-medium tabular-nums">£240</div>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="text-[4px] border-t border-slate-200 w-20">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">Subtotal</span>
                <span className="tabular-nums">£600</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-600">VAT</span>
                <span className="tabular-nums">£120</span>
              </div>
              <div className="flex justify-between py-0.5 border-t border-slate-200 font-semibold">
                <span>Total</span>
                <span className="tabular-nums">£720</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-1">
            <div className="text-[3px] uppercase tracking-wide text-slate-500">Notes</div>
            <div className="text-[4px] text-slate-600">Work completed as per contract</div>
          </div>
        </div>
      </div>
    </div>
  );
}


