'use client';

import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import { TESTIMONIALS } from '@/lib/data';

export default function Testimonials() {
  return (
    <Section className="py-14">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold">Testimonials</h2>
        <p className="mt-2 text-slate-600">Short, specific, and credible.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card hover>
              <div className="flex items-center gap-3">
                <motion.div
                  className="h-10 w-10 rounded-full bg-slate-200"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                />
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-xs text-slate-500">{testimonial.role}</div>
                </div>
              </div>
              <p className="mt-4 text-slate-700 text-sm">"{testimonial.text}"</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

