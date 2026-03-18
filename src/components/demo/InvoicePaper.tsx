'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { DemoState } from './DemoPreview';

const fmt = (n: number) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface Props {
  state: DemoState;
  subtotal: number;
  vatAmount: number;
  total: number;
  vatRate: number;
}

// Flashes teal then fades to grey whenever the value key changes
function LiveValue({ value, children }: { value: number | string; children: React.ReactNode }) {
  return (
    <motion.span
      key={String(value)}
      initial={{ color: '#0F766E' }}
      animate={{ color: '#64748b' }}
      transition={{ duration: 0.8 }}
      className="font-mono"
    >
      {children}
    </motion.span>
  );
}

export default function InvoicePaper({ state, subtotal, vatAmount, total, vatRate }: Props) {
  const vatLabel =
    vatRate === 0
      ? state.vatMode === 'intra-eu'
        ? 'VAT 0% (reverse charge)'
        : 'VAT 0% (export)'
      : `VAT ${vatRate}%`;

  return (
    <motion.div
      className="w-full min-h-[520px] rounded-xl bg-white border border-black/10 shadow-sm p-6 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-lg bg-[#0F766E] flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 7h12v1.5H4V7zm0 3.5h12V12H4v-1.5zm0 3.5h8V15.5H4V14z" fill="white" />
          </svg>
        </div>
        <div className="text-right text-xs text-slate-600">
          <div className="font-semibold text-slate-900">Invoice #INV-2026-0001</div>
          <div>Date: 18 Mar 2026</div>
          <div>Due: 01 Apr 2026</div>
        </div>
      </div>

      {/* From / Bill To */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="font-semibold text-slate-700 mb-1">From</div>
          <motion.div
            key={state.from}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            className="font-medium text-slate-900"
          >
            {state.from || '—'}
          </motion.div>
          <motion.div
            key={state.fromVat}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            className="text-slate-500"
          >
            VAT {state.fromVat || '—'}
          </motion.div>
        </div>
        <div>
          <div className="font-semibold text-slate-700 mb-1">Bill To</div>
          <motion.div
            key={state.client}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            className="font-medium text-slate-900"
          >
            {state.client || '—'}
          </motion.div>
          <motion.div
            key={state.clientVat}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            className="text-slate-500"
          >
            VAT {state.clientVat || '—'}
          </motion.div>
        </div>
      </div>

      {/* Line items table */}
      <div className="mt-4">
        <div className="grid grid-cols-12 gap-1 text-xs font-medium border-b border-black/10 pb-1 text-slate-600">
          <div className="col-span-5">Description</div>
          <div className="col-span-2 text-right">Qty</div>
          <div className="col-span-3 text-right">Rate</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        <AnimatePresence initial={false}>
          {state.items.map((item, i) => {
            const lineTotal = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
            return (
              <motion.div
                key={i}
                className="grid grid-cols-12 gap-1 text-xs py-1.5 border-b border-black/5"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="col-span-5 truncate text-slate-900">{item.desc || '—'}</div>
                <div className="col-span-2 text-right text-slate-600">{item.qty || '0'}</div>
                <div className="col-span-3 text-right text-slate-600">
                  £{fmt(parseFloat(item.rate) || 0)}
                </div>
                <LiveValue value={lineTotal}>
                  <span className="col-span-2 block text-right">£{fmt(lineTotal)}</span>
                </LiveValue>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {state.items.length === 0 && (
          <div className="text-xs text-slate-400 py-3 text-center">No items</div>
        )}

        {/* Totals */}
        <motion.div className="mt-3 flex justify-end" layout>
          <div className="w-52 text-xs space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <LiveValue value={subtotal}>£{fmt(subtotal)}</LiveValue>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>{vatLabel}</span>
              <LiveValue value={vatAmount}>£{fmt(vatAmount)}</LiveValue>
            </div>
            <div className="flex justify-between font-semibold border-t border-black/10 pt-1 text-slate-900">
              <span>Total</span>
              <motion.span
                key={total}
                initial={{ color: '#0F766E' }}
                animate={{ color: '#0B1221' }}
                transition={{ duration: 0.8 }}
                className="font-mono"
              >
                £{fmt(total)}
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Reverse charge note */}
        <AnimatePresence>
          {state.vatMode === 'intra-eu' && (
            <motion.div
              className="mt-3 text-[10px] text-slate-500 bg-slate-50 rounded px-2 py-1.5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              Reverse charge — VAT to be accounted for by the recipient
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-3 text-[10px] text-slate-500">{state.notes}</div>
      </div>
    </motion.div>
  );
}

