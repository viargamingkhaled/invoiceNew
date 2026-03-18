'use client';

import { motion } from 'framer-motion';
import { DemoState, DemoItem, VatMode } from './DemoPreview';

const inp = 'rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-white text-slate-900 w-full focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition-colors';
const lbl = 'text-xs text-slate-600 font-medium';

interface Props {
  state: DemoState;
  set: <K extends keyof DemoState>(key: K, val: DemoState[K]) => void;
  setItem: (index: number, field: keyof DemoItem, val: string) => void;
}

export default function InvoiceForm({ state, set, setItem }: Props) {
  return (
    <div className="space-y-3">
      {/* VAT mode */}
      <div className="grid gap-1.5">
        <label className={lbl}>VAT mode</label>
        <select
          value={state.vatMode}
          onChange={e => set('vatMode', e.target.value as VatMode)}
          className={inp}
          aria-label="VAT mode"
        >
          <option value="domestic">Domestic (20% VAT)</option>
          <option value="intra-eu">Intra-EU 0% (reverse charge)</option>
          <option value="export">Export (0% VAT)</option>
        </select>
      </div>

      {/* From */}
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <label className={lbl}>Company (From)</label>
          <input
            className={inp}
            value={state.from}
            onChange={e => set('from', e.target.value)}
            placeholder="Your company"
          />
        </div>
        <div className="grid gap-1.5">
          <label className={lbl}>VAT/Reg</label>
          <input
            className={inp}
            value={state.fromVat}
            onChange={e => set('fromVat', e.target.value)}
            placeholder="GB123456789"
          />
        </div>
      </div>

      {/* Client */}
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <label className={lbl}>Client (Bill To)</label>
          <input
            className={inp}
            value={state.client}
            onChange={e => set('client', e.target.value)}
            placeholder="Client name"
          />
        </div>
        <div className="grid gap-1.5">
          <label className={lbl}>VAT/Reg</label>
          <input
            className={inp}
            value={state.clientVat}
            onChange={e => set('clientVat', e.target.value)}
            placeholder="DE123456789"
          />
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-1 text-[10px] font-medium text-slate-500 px-0.5">
          <div className="col-span-5">Description</div>
          <div className="col-span-2">Qty</div>
          <div className="col-span-4">Rate (£)</div>
          <div className="col-span-1" />
        </div>
        {state.items.map((item, i) => (
          <motion.div
            key={i}
            className="grid grid-cols-12 gap-1 text-xs"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <input
              className={`col-span-5 ${inp}`}
              value={item.desc}
              onChange={e => setItem(i, 'desc', e.target.value)}
              placeholder="Description"
            />
            <input
              className={`col-span-2 ${inp}`}
              type="number"
              min="0"
              step="1"
              value={item.qty}
              onChange={e => setItem(i, 'qty', e.target.value)}
              placeholder="1"
            />
            <input
              className={`col-span-4 ${inp}`}
              type="number"
              min="0"
              step="0.01"
              value={item.rate}
              onChange={e => setItem(i, 'rate', e.target.value)}
              placeholder="0.00"
            />
            <button
              type="button"
              className="col-span-1 text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center text-base leading-none"
              onClick={() => set('items', state.items.filter((_, idx) => idx !== i))}
              aria-label="Remove item"
            >
              ×
            </button>
          </motion.div>
        ))}
        <button
          type="button"
          className="text-xs text-[#0F766E] hover:underline mt-1"
          onClick={() => set('items', [...state.items, { desc: '', qty: '1', rate: '' }])}
        >
          + Add line item
        </button>
      </div>

      <div className="pt-1">
        <p className="text-xs text-slate-500">
          Preview updates live · Full functionality available after registration.
        </p>
      </div>
    </div>
  );
}

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Currency</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            GBP
          </div>
        </div>
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Language</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            EN / DE / LV
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Company (From)</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            Acme Ltd
          </div>
        </div>
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">VAT/Reg</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            GB123456789
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Client (Bill To)</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            Client GmbH
          </div>
        </div>
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">VAT/Reg</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            DE123456789
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Number</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            INV-2025-000245
          </div>
        </div>
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Date</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            02 Sep 2025
          </div>
        </div>
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Due</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            16 Sep 2025
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-slate-600">Line items</div>
        <div className="space-y-2">
          <motion.div
            className="grid grid-cols-12 gap-1 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="col-span-5 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
              Service #1
            </div>
            <div className="col-span-2 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
              1
            </div>
            <div className="col-span-3 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
              £100.00
            </div>
            <div className="col-span-2 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
              0%
            </div>
          </motion.div>
          <motion.div
            className="grid grid-cols-12 gap-1 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="col-span-5 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
              Service #2
            </div>
            <div className="col-span-2 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
              1
            </div>
            <div className="col-span-3 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
              £100.00
            </div>
            <div className="col-span-2 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
              0%
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Discount %</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            0
          </div>
        </div>
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Shipping</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            0.00
          </div>
        </div>
        <div className="grid gap-1.5">
          <label className="text-xs text-slate-600 font-medium">Tax total</label>
          <div className="rounded-lg border border-black/10 px-2.5 py-2 text-sm bg-slate-50 text-slate-700">
            auto
          </div>
        </div>
      </div>

      <div className="pt-2">
        <p className="text-xs text-slate-500">
          This is a preview. Full functionality available after registration.
        </p>
      </div>
    </div>
  );
}

