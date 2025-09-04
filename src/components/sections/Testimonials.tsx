'use client';

import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    name: 'Marta K.',
    role: 'Freelance Designer',
    location: 'Warsaw, PL',
    quote:
      'I send EU-compliant invoices in minutes. Reverse charge notes are added automatically—no second guessing.',
    img: '/marta.webp',
  },
  {
    name: 'Anders L.',
    role: 'Construction PM',
    location: 'Copenhagen, DK',
    quote:
      'Live preview + single-column form shaved our billing time from 20 minutes to under 5.',
    img: '/anders.webp',
  },
  {
    name: 'Nicolas D.',
    role: 'IT Services Lead',
    location: 'Paris, FR',
    quote:
      'Saved clients & items as presets = zero repeats. Totals and VAT breakdown are always spot on.',
    img: '/nicolas.webp',
  },
  {
    name: 'Sofia R.',
    role: 'Accountant',
    location: 'Lisbon, PT',
    quote:
      'Multi-currency is flawless. GBP↔EUR with the right number formats—clients stopped asking for corrections.',
    img: '/sofia.webp',
  },
  {
    name: 'Tom B.',
    role: 'Founder',
    location: 'Manchester, UK',
    quote:
      'Auto numbering and PDF export just work. We created 30+ invoices the first day without a single error.',
    img: '/tom.webp',
  },
  {
    name: 'Elena P.',
    role: 'Consultant',
    location: 'Milan, IT',
    quote:
      'Love the VAT modes: domestic, intra-EU 0%, export. The system explains what applies and why.',
    img: '/elena.webp',
  },
] as const;

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
        <p className="mt-2 text-slate-600">Real teams. Real invoices. Real results.</p>
      </motion.div>

      {/* Auto-scrolling carousel */}
      <style>{`@keyframes tscroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          style={{ animation: 'tscroll 30s linear infinite' as any }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={`${t.name}-${i}`} className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px]">
              <Card hover>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-200">
                    <Image
                      src={t.img}
                      alt={`${t.name} photo`}
                      width={64}
                      height={64}
                      className="h-12 w-12 object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role} · {t.location}</div>
                  </div>
                </div>
                <p className="mt-4 text-slate-700 text-sm">“{t.quote}”</p>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
