'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PRICING_PLANS } from '@/lib/data';
import { THEME } from '@/lib/theme';
import { Currency, convertFromGBP, formatCurrency, getAvailableCurrencies } from '@/lib/currency';

export default function Pricing() {
  const bcRef = useRef<BroadcastChannel | null>(null);
  const [currency, setCurrency] = useState<Currency>('GBP');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const signedIn = status === 'authenticated';

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

  const handlePurchase = async (planName: string, baseGBP: number) => {
    if (!signedIn) {
      return router.push('/auth/signin?mode=login');
    }

    if (!termsAccepted) {
      toast.error('Please confirm that you have read and agree to the Terms of Purchase, Service Delivery, and Return Policy');
      return;
    }

    setIsLoading(planName);
    try {
      const amountToSend = convertFromGBP(baseGBP, currency);

      if (amountToSend <= 0) throw new Error('Invalid amount');

      const response = await fetch('/api/payments/spoynt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountToSend, currency }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('No redirect URL received');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not initiate payment. Please try again.');
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
        {PRICING_PLANS.filter(p => p.name !== 'Custom').map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={plan.popular ? 'md:-mt-4' : ''}
          >
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
                  {plan.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span>-</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 space-y-3">
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-black/20 text-[#0F766E] focus:ring-[#0F766E] focus:ring-offset-0"
                  />
                  <span>
                    I confirm that I have read and agree to the Terms of Purchase, Service Delivery, and Return Policy
                  </span>
                </label>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handlePurchase(plan.name, plan.baseGBP)}
                  disabled={isLoading === plan.name || !termsAccepted}
                >
                  {isLoading === plan.name ? <Loader2 className="h-5 w-5 animate-spin" /> : plan.cta}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500 text-center">Prices exclude VAT. Tokens deposit to your account after purchase (signed-in users only).</p>
    </Section>
  );
}

