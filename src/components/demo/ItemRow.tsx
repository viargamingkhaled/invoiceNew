'use client';

import { motion } from 'framer-motion';

interface ItemRowProps {
  description: string;
  quantity: string;
  rate: string;
  tax: string;
  delay?: number;
}

export default function ItemRow({ description, quantity, rate, tax, delay = 0 }: ItemRowProps) {
  return (
    <motion.div 
      className="grid grid-cols-12 gap-2 text-xs"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="col-span-6 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
        {description}
      </div>
      <div className="col-span-2 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
        {quantity}
      </div>
      <div className="col-span-2 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
        {rate}
      </div>
      <div className="col-span-2 rounded-lg border border-black/10 px-2 py-1.5 bg-slate-50 text-slate-700">
        {tax}
      </div>
    </motion.div>
  );
}
