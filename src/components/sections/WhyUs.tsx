'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { HOME_V2_DATA } from '@/lib/home-v2-data';

export default function WhyUs() {
  const { whyUs } = HOME_V2_DATA;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1221] mb-4">
            Why choose us
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Built for professionals who need reliable, fast, and compliant invoicing
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUs.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-[#F6F7F8] transition-colors duration-200 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#0F766E] rounded-xl flex items-center justify-center group-hover:bg-[#14B8A6] transition-colors duration-200">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[#0B1221] mb-2 group-hover:text-[#0F766E] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#F6F7F8] rounded-xl">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[#0B1221]">
              All features included in every plan
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}