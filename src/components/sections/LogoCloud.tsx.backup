'use client';

import { motion } from 'framer-motion';
import { HOME_V2_DATA } from '@/lib/home-v2-data';

export default function LogoCloud() {
  const { trustedBy } = HOME_V2_DATA;

  return (
    <section className="py-16 bg-[#F6F7F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-[#0B1221] mb-2">
            Trusted by
          </h2>
          <p className="text-[#6B7280]">
            Trusted by growing teams across the UK & EU
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {trustedBy.map((company, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-xl border border-black/5 hover:border-[#0F766E]/20 transition-all duration-200 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              {/* Placeholder for company logo */}
              <div className="text-center">
                <div className="w-12 h-12 bg-[#F6F7F8] rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#0F766E]/10 transition-colors duration-200">
                  <span className="text-lg font-bold text-[#0F766E]">
                    {company.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-[#6B7280] group-hover:text-[#0B1221] transition-colors duration-200">
                  {company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href="/auth/signin?mode=signup"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#0F766E] hover:text-[#0D6B63] transition-colors duration-200"
          >
            Become a customer →
          </a>
        </motion.div>
      </div>
    </section>
  );
}




