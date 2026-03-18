'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Card from '@/components/ui/Card';
import InvoiceForm from './InvoiceForm';
import InvoicePaper from './InvoicePaper';

export type VatMode = 'domestic' | 'intra-eu' | 'export';

export interface DemoItem {
  desc: string;
  qty: string;
  rate: string;
}

export interface DemoState {
  from: string;
  fromVat: string;
  client: string;
  clientVat: string;
  vatMode: VatMode;
  items: DemoItem[];
  notes: string;
}

const VAT_RATES: Record<VatMode, number> = {
  domestic: 20,
  'intra-eu': 0,
  export: 0,
};

export default function DemoPreview() {
  const [state, setState] = useState<DemoState>({
    from: 'Acme Ltd',
    fromVat: 'GB123456789',
    client: 'Client GmbH',
    clientVat: 'DE987654321',
    vatMode: 'intra-eu',
    items: [
      { desc: 'Design services', qty: '2', rate: '100' },
      { desc: 'Support retainer', qty: '1', rate: '50' },
    ],
    notes: 'Payment within 14 days. IBAN: GB00BANK0000000000',
  });

  const set = <K extends keyof DemoState>(key: K, val: DemoState[K]) =>
    setState(prev => ({ ...prev, [key]: val }));

  const setItem = (index: number, field: keyof DemoItem, val: string) =>
    setState(prev => ({
      ...prev,
      items: prev.items.map((it, i) => (i === index ? { ...it, [field]: val } : it)),
    }));

  const { subtotal, vatAmount, total, vatRate } = useMemo(() => {
    const subtotal = state.items.reduce((sum, it) => {
      return sum + (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0);
    }, 0);
    const vatRate = VAT_RATES[state.vatMode];
    const vatAmount = (subtotal * vatRate) / 100;
    return { subtotal, vatAmount, total: subtotal + vatAmount, vatRate };
  }, [state.items, state.vatMode]);

  return (
    <motion.div
      id="demo"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <InvoiceForm state={state} set={set} setItem={setItem} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <InvoicePaper
              state={state}
              subtotal={subtotal}
              vatAmount={vatAmount}
              total={total}
              vatRate={vatRate}
            />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
