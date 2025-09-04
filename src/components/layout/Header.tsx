'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { THEME } from '@/lib/theme';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const signedIn = status === 'authenticated';
  const isHome = pathname === '/';
  const isGenerator = pathname === '/generator';
  const isPricing = pathname === '/pricing';
  const isDashboard = pathname === '/dashboard';

  return (
    <motion.header 
      className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-black/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className={`flex items-center gap-2 font-semibold ${THEME.text}`}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center gap-2"
            >
              <div className={`h-7 w-7 rounded-xl ${THEME.primary.bg}`}></div>
              <span>Invoicerly</span>
            </motion.span>
          </Link>
          
          <nav className="hidden sm:flex items-center gap-2 text-sm">
            <a href="/" className={`rounded-xl px-3 py-2 transition-colors ${isHome ? 'bg-black/5' : ''}`}>Home</a>
            <a href="/generator" className={`rounded-xl px-3 py-2 transition-colors ${isGenerator ? 'bg-black/5' : ''}`}>Invoice Generator</a>
            {signedIn && (
              <a href="/dashboard" className={`rounded-xl px-3 py-2 transition-colors ${isDashboard ? 'bg-black/5' : ''}`}>Dashboard</a>
            )}
            <a href="/pricing" className={`rounded-xl px-3 py-2 hidden md:inline-block transition-colors ${isPricing ? 'bg-black/5' : 'hover:bg-black/5'}`}>Pricing</a>
            <a href="/contact" className="rounded-xl px-3 py-2 hidden md:inline-block hover:bg-black/5 transition-colors">Contact</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {!signedIn ? (
            <>
              <Link
                href="/auth/signin?mode=login"
                className="rounded-xl bg-slate-900 hover:bg-black text-white px-4 py-2 text-sm transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/auth/signin?mode=signup"
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm transition-colors"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="rounded-xl bg-slate-900 hover:bg-black text-white px-4 py-2 text-sm transition-colors"
            >
              Sign out
            </button>
          )}
        </div>
      </section>
    </motion.header>
  );
}
