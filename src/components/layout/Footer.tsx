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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-6 gap-8 text-sm">
          <div>
            <div className="font-semibold mb-2">Product</div>
            <div className="grid gap-1 text-[#6B7280]">
              <Link href="/generator" className="hover:text-[#0F766E] hover:underline transition-colors">Invoice Generator</Link>
              <Link href="/pricing" className="hover:text-[#0F766E] hover:underline transition-colors">Pricing</Link>
              <Link href="/token-calculator" className="hover:text-[#0F766E] hover:underline transition-colors">Token Calculator</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Help</div>
            <div className="grid gap-1 text-[#6B7280]">
              <Link href="/help/faq" className="hover:text-[#0F766E] hover:underline transition-colors">FAQ</Link>
              <Link href="/help/getting-started" className="hover:text-[#0F766E] hover:underline transition-colors">Getting Started</Link>
              <Link href="/help/billing-tokens" className="hover:text-[#0F766E] hover:underline transition-colors">Billing & Tokens</Link>
              <Link href="/help/troubleshooting" className="hover:text-[#0F766E] hover:underline transition-colors">Troubleshooting</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Legal</div>
            <div className="grid gap-1 text-[#6B7280]">
              <Link href="/privacy" className="hover:text-[#0F766E] hover:underline transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#0F766E] hover:underline transition-colors">Terms</Link>
              <Link href="/cookies" className="hover:text-[#0F766E] hover:underline transition-colors">Cookie Policy</Link>
              <Link href="/refund" className="hover:text-[#0F766E] hover:underline transition-colors">Refund</Link>
              <Link href="/disclaimer" className="hover:text-[#0F766E] hover:underline transition-colors">Disclaimer</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Company</div>
            <div className="grid gap-1 text-[#6B7280]">
              <Link href="/about" className="hover:text-[#0F766E] hover:underline transition-colors">About</Link>
              <Link href="/contact" className="hover:text-[#0F766E] hover:underline transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Payment Methods</div>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-8 w-12 rounded border border-black/10 bg-white flex items-center justify-center p-1">
                <img src="/visa-logo.svg" alt="Visa" className="w-full h-full object-contain" />
              </div>
              <div className="h-8 w-12 rounded border border-black/10 bg-white flex items-center justify-center p-1">
                <img src="/mastercard-logo.svg" alt="Mastercard" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Meta</div>
            <div className="grid gap-2 text-[#6B7280]">
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/ventira.co.uk/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-8 w-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#E6F6F3] hover:border-[#14B8A6] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/ventira-co-uk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-8 w-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#E6F6F3] hover:border-[#14B8A6] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Legal block */}
        <div className="mt-10 pt-6 border-t border-black/10 text-xs text-[#6B7280] space-y-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="font-semibold text-[#374151]">VIARGAMING LTD</span>
            <span>Company No.&nbsp;15847699</span>
            <span>Registered in England &amp; Wales</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>43 Victoria Rd, Northampton, United Kingdom, NN1&nbsp;5ED</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href="mailto:info@ventira.co.uk" className="hover:text-[#0F766E] hover:underline transition-colors">
              info@ventira.co.uk
            </a>
            <a href="tel:+447861902258" className="hover:text-[#0F766E] hover:underline transition-colors">
              +44 7861 902258
            </a>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span>&copy; {new Date().getFullYear()} Ventira &mdash; All rights reserved.</span>
            <span>Made in UK</span>
          </div>
        </div>
      </section>
    </motion.footer>
  );
}
