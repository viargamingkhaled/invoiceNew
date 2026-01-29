'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Currency, getAvailableCurrencies, getCurrencySymbol, getCurrencyName } from '@/lib/currency';

interface CurrencyDropdownProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  className?: string;
}

export default function CurrencyDropdown({ value, onChange, className = '' }: CurrencyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies = getAvailableCurrencies();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (currency: Currency) => {
    onChange(currency);
    setIsOpen(false);
  };

  // Prevent hydration mismatch by not rendering interactive elements until client-side
  if (!isClient) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border border-black/10 bg-white hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-haspopup="listbox"
          aria-expanded={false}
          aria-label={`Currency: ${value}`}
          title={getCurrencyName(value)}
        >
          <span className="font-medium">{getCurrencySymbol(value)}</span>
          <svg
            className="h-4 w-4 text-slate-500 transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border border-black/10 bg-white hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Currency: ${value}`}
        title={getCurrencyName(value)}
      >
        <span className="font-medium">{getCurrencySymbol(value)}</span>
        <svg
          className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 rounded-xl border border-black/10 bg-white shadow-lg z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            role="listbox"
          >
            <div className="py-1">
              {currencies.map((currency) => (
                <button
                  key={currency}
                  type="button"
                  onClick={() => handleSelect(currency)}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-slate-50 transition-colors flex items-center justify-between ${
                    currency === value ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                  }`}
                  role="option"
                  aria-selected={currency === value}
                  title={`${currency} – ${getCurrencyName(currency)}`}
                >
                  <span className="font-medium text-base">{getCurrencySymbol(currency)}</span>
                  {currency === value && (
                    <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


