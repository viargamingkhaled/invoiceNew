'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <motion.footer
      className="py-10 border-t border-black/10 mt-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          (c) {new Date().getFullYear()} Invoicerly - All rights reserved
        </div>
        <nav className="text-sm text-slate-700 flex gap-4">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/cookies" className="hover:underline">Cookie</Link>
          <Link href="/refund" className="hover:underline">Refunds</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
      </section>
    </motion.footer>
  );
}
