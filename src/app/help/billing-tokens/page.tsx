'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Currency, getAvailableCurrencies, convertFromGBP, formatCurrency } from '@/lib/currency';

// Generate dynamic token packages based on selected currency
const getTokenPackages = (currency: Currency) => {
  const basePackagesGBP = [10, 50, 100]; // Base packages in GBP
  return basePackagesGBP.map(amountGBP => {
    const amount = convertFromGBP(amountGBP, currency);
    const tokens = Math.round(amountGBP * 100);
    const invoices = Math.round(tokens / 10);
    const costPerInvoice = amount / invoices;
    return { amount, currency, tokens, invoices, costPerInvoice };
  });
};

const LEDGER_SAMPLE = [
  { date: '2024-01-15', type: 'Top-up', delta: 1000, balance: 1000, currency: 'GBP', amount: 10, receiptUrl: '#' },
  { date: '2024-01-15', type: 'Invoice', delta: -10, balance: 990, currency: 'GBP', amount: null, receiptUrl: null, invoiceNumber: 'INV-001' },
  { date: '2024-01-16', type: 'Invoice', delta: -10, balance: 980, currency: 'GBP', amount: null, receiptUrl: null, invoiceNumber: 'INV-002' },
  { date: '2024-01-17', type: 'Invoice', delta: -10, balance: 970, currency: 'GBP', amount: null, receiptUrl: null, invoiceNumber: 'INV-003' },
  { date: '2024-01-18', type: 'Top-up', delta: 5000, balance: 5970, currency: 'GBP', amount: 50, receiptUrl: '#' },
  { date: '2024-01-18', type: 'Invoice', delta: -10, balance: 5960, currency: 'GBP', amount: null, receiptUrl: null, invoiceNumber: 'INV-004' },
];

export default function BillingTokensPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('GBP');
  const [customAmount, setCustomAmount] = useState<number>(10);
  const [mounted, setMounted] = useState(false);
  const bcRef = useRef<BroadcastChannel | null>(null);

  // Track page view
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.gtag?.('event', 'billing_view', {
        page_title: 'Billing & Tokens',
      });
    }
  }, []);

  // Load currency from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedCurrency = localStorage.getItem('currency') as Currency;
      if (savedCurrency && getAvailableCurrencies().includes(savedCurrency)) {
        setSelectedCurrency(savedCurrency);
      }
    } catch {}
  }, []);

  // Sync with header via BroadcastChannel
  useEffect(() => {
    try {
      bcRef.current = new BroadcastChannel('app-events');
      bcRef.current.onmessage = (ev: MessageEvent) => {
        const data: any = ev?.data || {};
        if (data.type === 'currency-updated' && getAvailableCurrencies().includes(data.currency)) {
          setSelectedCurrency(data.currency);
        }
      };
    } catch {}
    return () => { try { bcRef.current?.close(); } catch {} };
  }, []);

  // Handle currency change and sync with header
  const onCurrencyChange = (nextCurrency: Currency) => {
    setSelectedCurrency(nextCurrency);
    try { localStorage.setItem('currency', nextCurrency); } catch {}
    try { bcRef.current?.postMessage({ type: 'currency-updated', currency: nextCurrency }); } catch {}
  };

  const handleTopUpClick = (amount?: number) => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.gtag?.('event', 'billing_click_topup', {
        amount: amount || customAmount,
        currency: selectedCurrency,
      });
    }
  };

  const calculateTokens = (amount: number) => Math.round(amount * 100);
  const calculateInvoices = (tokens: number) => Math.round(tokens / 10);
  const calculateCostPerInvoice = (amount: number) => (amount / calculateInvoices(calculateTokens(amount))).toFixed(2);

  // Get dynamic packages for selected currency
  const packages = getTokenPackages(selectedCurrency);

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Billing & Tokens</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Understand our pay-as-you-go model, token pricing, and billing system.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">How it works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Pay-as-you-go</h3>
                    <p className="text-sm text-slate-600">No subscriptions or monthly fees</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🪙</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">1 {selectedCurrency} = 100 tokens</h3>
                    <p className="text-sm text-slate-600">Simple conversion rate</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📄</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">1 invoice = 10 tokens</h3>
                    <p className="text-sm text-slate-600">Fixed cost per invoice</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-700">
                    <strong>Tokens never expire</strong> - use them whenever you need to create invoices. 
                    Drafting and previewing invoices is completely free.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Token Calculator</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Amount ({selectedCurrency})
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="5"
                        step="1"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(Number(e.target.value))}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <select
                        value={selectedCurrency}
                        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        {getAvailableCurrencies().map(curr => (
                          <option key={curr} value={curr}>{curr}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Tokens</span>
                      <span className="font-semibold text-slate-900">{calculateTokens(customAmount).toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Invoices</span>
                      <span className="font-semibold text-slate-900">≈{calculateInvoices(calculateTokens(customAmount))}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm text-emerald-700">Cost per invoice</span>
                      <span className="font-semibold text-emerald-900">{selectedCurrency} {calculateCostPerInvoice(customAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">How to top up</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {packages.map((pkg, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900 mb-1">
                          {formatCurrency(pkg.amount, selectedCurrency)}
                        </div>
                        <div className="text-sm text-slate-600 mb-2">
                          {pkg.tokens.toLocaleString('en-US')} tokens
                        </div>
                        <div className="text-xs text-slate-500">
                          ≈{pkg.invoices} invoices
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 font-semibold text-sm">💡 Custom amounts</div>
                    <p className="text-blue-800 text-sm">
                      You can top up any amount from {formatCurrency(5, selectedCurrency)} to {formatCurrency(10000, selectedCurrency)}.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">VAT & Receipts</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">VAT calculation</h3>
                    <p className="text-slate-700 text-sm mb-3">
                      VAT is calculated at checkout based on your business location and VAT registration status.
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1 ml-4">
                      <li>• UK businesses: 20% VAT</li>
                      <li>• EU businesses: Local VAT rate</li>
                      <li>• EU B2B with valid VAT ID: Reverse charge applies (0% VAT)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Receipts & Records</h3>
                    <p className="text-slate-700 text-sm mb-3">
                      All transactions are recorded in your token ledger. You can access:
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1 ml-4">
                      <li>• Transaction history in your Dashboard</li>
                      <li>• Detailed ledger with invoice numbers</li>
                      <li>• Automatic receipt generation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Token Ledger Sample</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left px-3 py-2 font-semibold text-slate-700">Date</th>
                        <th className="text-left px-3 py-2 font-semibold text-slate-700">Type</th>
                        <th className="text-right px-3 py-2 font-semibold text-slate-700">Delta</th>
                        <th className="text-right px-3 py-2 font-semibold text-slate-700">Balance</th>
                        <th className="text-left px-3 py-2 font-semibold text-slate-700">Invoice #</th>
                        <th className="text-center px-3 py-2 font-semibold text-slate-700">Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LEDGER_SAMPLE.map((entry, index) => (
                        <tr key={index} className="border-t border-slate-200">
                          <td className="px-3 py-2 text-slate-600">{entry.date}</td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              entry.type === 'Top-up' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {entry.type}
                            </span>
                          </td>
                          <td className={`px-3 py-2 text-right font-medium ${
                            entry.delta > 0 ? 'text-emerald-600' : 'text-slate-900'
                          }`}>
                            {entry.delta > 0 ? `+${entry.delta}` : entry.delta}
                          </td>
                          <td className="px-3 py-2 text-right font-medium">{entry.balance.toLocaleString('en-US')}</td>
                          <td className="px-3 py-2 text-slate-600">{entry.invoiceNumber || '-'}</td>
                          <td className="px-3 py-2 text-center">
                            {entry.receiptUrl ? (
                              <a href={entry.receiptUrl} className="text-emerald-600 hover:underline text-xs">
                                View
                              </a>
                            ) : (
                              <span className="text-slate-400 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Refunds</h2>
                <p className="text-slate-700 mb-4">
                  Unused tokens can be refunded within 14 days of purchase. Used tokens (for issued invoices) 
                  are non-refundable. All refunds are processed to the original payment method within 5-10 business days.
                </p>
                <Button href="/refund" variant="outline" size="sm">
                  View Refund Policy
                </Button>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Methods & Limits</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Accepted Payment Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Credit/Debit Cards</div>
                          <div className="text-sm text-slate-600">Visa, Mastercard</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 px-3">
                        All payments are processed securely through Stripe. Card details are encrypted and never stored on our servers.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Transaction Limits</h3>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li>• Minimum: {formatCurrency(5, selectedCurrency)} per transaction</li>
                      <li>• Maximum: {formatCurrency(10000, selectedCurrency)} per transaction</li>
                      <li>• Daily limit: {formatCurrency(25000, selectedCurrency)}</li>
                      <li>• Fraud protection: Automatic monitoring</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-amber-600 font-semibold text-sm">⚠️ Payment Issues</div>
                    <p className="text-amber-800 text-sm">
                      If your payment is declined, please verify your card details and billing address. 
                      For assistance, contact our support team.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      href={`/pricing?amount=${customAmount}&currency=${selectedCurrency}`}
                      className="w-full"
                      onClick={() => handleTopUpClick()}
                    >
                      Top up tokens
                    </Button>
                    <Button 
                      href="/token-calculator" 
                      variant="outline" 
                      className="w-full"
                    >
                      Open Token Calculator
                    </Button>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Examples</h3>
                  <div className="space-y-3">
                    {packages.slice(0, 3).map((pkg, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium text-slate-900">
                          {formatCurrency(pkg.amount, selectedCurrency)} → {pkg.tokens.toLocaleString('en-US')} tokens
                        </div>
                        <div className="text-slate-600">
                          ≈{pkg.invoices} invoices → ≈{formatCurrency(pkg.costPerInvoice, selectedCurrency)} per invoice
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Need Help?</h3>
                  <div className="space-y-3 text-sm">
                    <Link href="/help/faq" className="block text-slate-600 hover:text-slate-900">
                      View FAQ
                    </Link>
                    <Link href="/contact" className="block text-slate-600 hover:text-slate-900">
                      Contact Support
                    </Link>
                    <Link href="/help/troubleshooting" className="block text-slate-600 hover:text-slate-900">
                      Troubleshooting
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
