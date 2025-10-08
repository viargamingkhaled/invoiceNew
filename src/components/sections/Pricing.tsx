'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PRICING_PLANS } from '@/lib/data';
import { THEME } from '@/lib/theme';
import { Currency, convertFromGBP, convertToGBP, formatCurrency, getCurrencySymbol, getAvailableCurrencies } from '@/lib/currency';

export default function Pricing() {
  const bcRef = useRef<BroadcastChannel | null>(null);
  const [currency, setCurrency] = useState<Currency>('GBP');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  useEffect(()=>{
    try {
      bcRef.current = new BroadcastChannel('app-events');
      bcRef.current.onmessage = (ev: MessageEvent) => {
        const data: any = (ev as any)?.data || {};
        if (data.type === 'currency-updated' && getAvailableCurrencies().includes(data.currency)) {
          setCurrency(data.currency);
          try { localStorage.setItem('currency', data.currency); } catch {}
        }
      };
    } catch {}
    return () => { try { bcRef.current?.close(); } catch {} };
  }, []);

  // Load currency from localStorage after mount to prevent hydration mismatch
  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem('currency') as Currency;
      if (savedCurrency && getAvailableCurrencies().includes(savedCurrency)) {
        setCurrency(savedCurrency);
      }
    } catch {}
  }, []);

  const formatPrice = (baseGBP: number) => {
    const convertedAmount = convertFromGBP(baseGBP, currency);
    return formatCurrency(convertedAmount, currency);
  };

  const handleTopUp = async (planName: string) => {
    setIsLoading(planName);
    try {
      // Определяем количество токенов для пополнения
      let tokensToAdd = 0;
      let amountGBP = 0;
      
      switch (planName) {
        case 'Starter':
          tokensToAdd = 1000;
          amountGBP = 10;
          break;
        case 'Professional':
          tokensToAdd = 2500;
          amountGBP = 25;
          break;
        case 'Team':
          tokensToAdd = 5000;
          amountGBP = 50;
          break;
        case 'Custom':
          // Custom plan handled separately
          throw new Error('Custom plan requires special handling');
        default:
          throw new Error('Invalid plan');
      }

      const response = await fetch('/api/ledger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'Top-up', 
          amount: amountGBP, // Always store in GBP
          currency: 'GBP' // Always store in GBP
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      // Обновляем BroadcastChannel для синхронизации с другими компонентами
      try {
        bcRef.current?.postMessage({ type: 'tokens-updated', tokenBalance: data.tokenBalance });
      } catch {}

      alert(`Successfully added ${tokensToAdd} tokens to your account!`);
      setIsLoading(null);

    } catch (error) {
      console.error("Top-up error:", error);
      alert('Could not add tokens. Please try again.');
      setIsLoading(null);
    }
  };

  return (
    <Section id="pricing" className="py-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold">Plans</h2>
        <p className="mt-2 text-slate-600">Top-up and start working when you're ready</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {PRICING_PLANS.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={plan.popular ? 'md:-mt-4' : ''}
          >
            {plan.name === 'Custom' ? (
              <CustomHomeCard currency={currency} />
            ) : (
              <Card className={`${plan.popular ? 'shadow-md border-black/10' : ''} flex flex-col justify-between h-full`}>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.popular && (
                      <motion.span
                        className={`text-xs rounded-full px-2 py-1 ${THEME.primary.text} bg-black/5`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        POPULAR
                      </motion.span>
                    )}
                  </div>
                  <div className="mt-3 text-3xl font-bold">
                    {formatPrice(plan.baseGBP)}
                    <span className="text-base font-normal text-slate-500">/one-time</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    ≈ {plan.tokens.toLocaleString('en-US')} tokens (~{Math.round(plan.tokens / 10)} invoices)
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {plan.points.map((point, pointIndex) => (
                      <motion.li
                        key={point}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + pointIndex * 0.1, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <span>-</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Button className="w-full" size="lg" onClick={() => handleTopUp(plan.name)} disabled={isLoading === plan.name}>
                    {isLoading === plan.name ? 'Processing...' : plan.cta}
                  </Button>
                </div>
              </Card>
            )}
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500 text-center">Prices exclude VAT. Tokens deposit to your account after purchase (signed-in users only).</p>
    </Section>
  );
}


function CustomHomeCard({ currency }: { currency: Currency }) {
  const [price, setPrice] = useState<number>(0.01);
  const [isLoading, setIsLoading] = useState(false);
  const min = 0.01;
  const TOKENS_PER_UNIT = 100;
  const TOKENS_PER_INVOICE = 10;
  const tokens = Math.max(0, Math.round(price * TOKENS_PER_UNIT));
  const invoices = Math.round(tokens / TOKENS_PER_INVOICE);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = parseFloat(e.target.value || '0');
    if (isNaN(v)) return;
    setPrice(Math.max(min, v));
  };

  const handleCustomTopUp = async () => {
    setIsLoading(true);
    try {
      // Convert to GBP for storage
      const priceGBP = convertToGBP(price, currency);
      
      const response = await fetch('/api/ledger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'Top-up', 
          amount: priceGBP, // Store in GBP
          currency: 'GBP' // Always store in GBP
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      alert(`Successfully added ${tokens} tokens to your account!`);
      setIsLoading(false);

    } catch (error) {
      console.error("Top-up error:", error);
      alert('Could not add tokens. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold">Custom</h3>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">{getCurrencySymbol(currency)}</span>
          <input
            type="number"
            min={min}
            step={0.01}
            value={price}
            onChange={onChange}
            className="w-24 text-3xl font-bold bg-transparent border-b border-black/10 focus:outline-none focus:ring-0"
            aria-label="Custom price"
          />
          <span className="text-base font-normal text-slate-500">/one-time</span>
        </div>
        <div className="mt-1 text-xs text-slate-600">≈ {tokens} tokens (~{invoices} invoices)</div>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>All 8 templates</li>
          <li>PDF export</li>
          <li>Email send</li>
          <li>Custom numbering mask</li>
        </ul>
      </div>
      <div className="mt-6">
        <Button className="w-full" size="lg" onClick={handleCustomTopUp} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Buy tokens'}
        </Button>
      </div>
    </Card>
  );
}



