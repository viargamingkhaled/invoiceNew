'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import InvoiceForm from './InvoiceForm';
import InvoicePaper from './InvoicePaper';

export default function DemoPreview() {
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
            <InvoiceForm />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <InvoicePaper />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
