'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import Section from '@/components/layout/Section';
import Pill from '@/components/policy/Pill';
import { Button } from '@/components/ui/Button';
import Segmented from '@/components/ui/Segmented';
import { CC, VAT_RATES } from '@/lib/constants';
import { Currency, calculateTokens, convertFromEUR, convertToEUR, formatCurrency, getCurrencySymbol, getAvailableCurrencies } from '@/lib/currency';
import { pricingPlans, getPlanPrice } from '@/lib/plans';

const COUNTRIES = Object.keys(CC);

function money(n: number, currency: Currency) {
  return formatCurrency(n, currency);
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="text-xs rounded-full px-2 py-1 text-blue-700 bg-blue-50 border border-blue-200">{children}</span>;
}

function Price({ amount, currency, vatRate }: { amount: number; currency: Currency; vatRate: number }) {
  const monthlyTarget = amount;
  const [display, setDisplay] = useState(0);
  // Count-up 0 -> price (400ms)
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 400;
    const animate = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setDisplay(monthlyTarget * p);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [monthlyTarget]);
  const monthly = monthlyTarget;
  const incVatTotal = monthly * (1 + vatRate/100);
  return (
    <div>
      <div className="text-3xl font-bold">{money(display, currency)}<span className="text-base font-normal text-slate-500">/one-time</span></div>
      <div className="text-[11px] text-slate-500 mt-1">Est. incl. VAT: {money(incVatTotal, currency)}</div>
    </div>
  );
}

export default function PricingClient() {
  const bcRef = useRef<BroadcastChannel | null>(null);
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [country, setCountry] = useState<string>('United Kingdom');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { status } = useSession();
  const router = useRouter();
  const signedIn = status === 'authenticated';

  const vatRate = useMemo(() => {
    const code = (CC as Record<string,string>)[country] || 'UK';
    const rates = (VAT_RATES as Record<string, number[]>)[code] || [0,20];
    return rates[rates.length-1] || 20;
  }, [country]);

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
      
      // Проверяем и показываем сохраненные логи при возврате со страницы оплаты
      const savedLogs = localStorage.getItem('payment_logs');
      if (savedLogs) {
        console.group('📋 [SAVED LOGS] Payment logs from previous session');
        const logs = JSON.parse(savedLogs);
        logs.forEach((log: string) => console.log(log));
        console.groupEnd();
        
        const reference = localStorage.getItem('payment_reference');
        if (reference) {
          console.log('🔑 Payment Reference ID:', reference);
          console.log('💡 To view full backend logs:');
          console.log('   1. Vercel Dashboard → Your Project → Logs');
          console.log('   2. Search for:', reference);
          console.log('   3. Or use CLI: vercel logs --filter="' + reference + '"');
        }
      }
    } catch {}
  }, []);

  const handlePurchase = async (planId: string | null, customAmount?: number) => {
    // Массив для сохранения всех логов
    const paymentLog: string[] = [];
    const logToAll = (message: string, data?: any) => {
      const logEntry = `[${new Date().toISOString()}] ${message}${data ? ' | ' + JSON.stringify(data) : ''}`;
      console.log(message, data || '');
      paymentLog.push(logEntry);
    };

    logToAll('🔵 [PAYMENT] Step 1: Starting payment process', { planId, customAmount, currency });
    
    if (!signedIn) {
      logToAll('❌ [PAYMENT] User not signed in, redirecting to login');
      return router.push('/auth/signin?mode=login');
    }

    setIsLoading(planId || 'custom');
    try {
      // Calculate amount to send
      let amountToSend = 0;
      
      if (customAmount) {
        amountToSend = customAmount;
      } else if (planId) {
        const plan = pricingPlans.find(p => p.id === planId);
        if (plan) {
          amountToSend = convertFromEUR(plan.baseEUR, currency);
        }
      }

      logToAll('🔵 [PAYMENT] Step 2: Amount calculated', { amountToSend, currency });

      if (amountToSend <= 0) {
        logToAll('❌ [PAYMENT] Invalid amount');
        throw new Error('Invalid amount');
      }

      logToAll('🔵 [PAYMENT] Step 3: Calling API to create payment session');
      
      // Create Spoynt payment session
      const response = await fetch('/api/payments/spoynt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: amountToSend,
          currency,
        }),
      });

      logToAll('🔵 [PAYMENT] Step 4: API response received', { status: response.status, ok: response.ok });

      const data = await response.json();
      logToAll('🔵 [PAYMENT] Step 5: Response data', data);

      if (!response.ok) {
        logToAll('❌ [PAYMENT] API error', { error: data.error });
        
        // Сохраняем логи в localStorage и отправляем на сервер
        localStorage.setItem('payment_logs', JSON.stringify(paymentLog));
        fetch('/api/payments/spoynt/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'PAYMENT_API_ERROR',
            referenceId: data.referenceId || 'unknown',
            amount: amountToSend,
            timestamp: new Date().toISOString(),
            logs: paymentLog,
            error: data.error
          })
        }).catch(e => console.error('Failed to send error log:', e));
        
        throw new Error(data.error || 'Something went wrong.');
      }

      // Redirect to Spoynt payment page
      if (data.redirectUrl) {
        logToAll('✅ [PAYMENT] Step 6: Redirecting to Spoynt HPP', { redirectUrl: data.redirectUrl });
        
        // Сохраняем логи перед редиректом
        localStorage.setItem('payment_logs', JSON.stringify(paymentLog));
        localStorage.setItem('payment_reference', data.referenceId);
        
        // Отправляем событие на сервер для логирования в Vercel
        fetch('/api/payments/spoynt/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'REDIRECT_TO_HPP',
            referenceId: data.referenceId,
            amount: amountToSend,
            timestamp: new Date().toISOString(),
            logs: paymentLog
          })
        }).catch(e => console.error('Failed to send log to server:', e));
        
        // Небольшая задержка для гарантии отправки лога
        await new Promise(resolve => setTimeout(resolve, 100));
        
        window.location.href = data.redirectUrl;
      } else {
        logToAll('❌ [PAYMENT] No redirect URL in response');
        localStorage.setItem('payment_logs', JSON.stringify(paymentLog));
        throw new Error('No redirect URL received');
      }

    } catch (error) {
      logToAll('❌ [PAYMENT] Payment error:', error);
      
      // Сохраняем логи при ошибке
      localStorage.setItem('payment_logs', JSON.stringify(paymentLog));
      
      toast.error(error instanceof Error ? error.message : 'Could not initiate payment. Please try again.');
      setIsLoading(null);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Section className="py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2"><Pill>UK-first</Pill><Pill>EU-ready</Pill><Pill>Prices exclude VAT</Pill></div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold">Top-Up</h1>
          <p className="mt-2 text-slate-600">Choose a top-up, set your country — we estimate VAT for transparency.</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <select
              className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
              value={country}
              onChange={(e)=>setCountry(e.target.value)}
            >
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => {
            const base = getPlanPrice(plan, currency);
            const invoices = Math.round(plan.tokens / 10);
            const loading = isLoading === plan.id;

            return (
              <motion.div key={plan.id} className={`rounded-2xl bg-white border border-black/10 shadow-sm p-6 flex flex-col ${plan.popular ? 'md:-mt-4' : ''}`}
                initial={plan.popular ? { scale: 1.02, opacity: 0, y: 16 } : { opacity: 0, y: 16 }}
                whileInView={plan.popular ? { scale: 1, opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{plan.name}</div>
                  {plan.popular && <Badge>POPULAR</Badge>}
                </div>
                <div className="mt-3">
                  <Price amount={base} currency={currency} vatRate={vatRate} />
                </div>
                <div className="mt-1 text-xs text-slate-600">= {plan.tokens} tokens (~{invoices} invoices)</div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
                  {plan.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => handlePurchase(plan.id)}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : plan.cta}
                  </Button>
                </div>
              </motion.div>
            );
          })}

          <CustomPlanCard
            currency={currency}
            onPurchase={(amount, curr) => handlePurchase(null, amount)}
          />
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h3 className="text-lg font-semibold">FAQ</h3>
            <div className="mt-4 space-y-4 text-sm text-slate-700">
              <div>
                <div className="font-medium">Do prices include VAT?</div>
                <p className="text-slate-600 mt-1">No. Prices exclude VAT. We calculate tax at checkout using your country and VAT ID. For eligible EU B2B customers with a valid VAT ID, reverse charge (0%) is applied.</p>
              </div>
              <div>
                <div className="font-medium">Can I cancel anytime?</div>
                <p className="text-slate-600 mt-1">Yes. You can cancel with one click. Your plan remains active until the end of the period.</p>
              </div>
              <div>
                <div className="font-medium">Which payment methods do you accept?</div>
                <p className="text-slate-600 mt-1">Cards and popular wallets. Bank transfer is available on Business.</p>
              </div>
              <div>
                <div className="font-medium">Do you issue invoices?</div>
                <p className="text-slate-600 mt-1">Yes. Invoices include your company details and VAT breakdown.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <h3 className="text-lg font-semibold">Still not sure?</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-dashed border-black/15 p-4">
                <div className="font-medium">UK & EU VAT-ready</div>
                <p className="text-slate-600 mt-1">Correct tax, currencies, and number formats.</p>
              </div>
              <div className="rounded-xl border border-dashed border-black/15 p-4">
                <div className="font-medium">Exports & Sharing</div>
                <p className="text-slate-600 mt-1">PDF, email sending, and public links.</p>
              </div>
              <div className="rounded-xl border border-dashed border-black/15 p-4">
                <div className="font-medium">Security</div>
                <p className="text-slate-600 mt-1">Encryption, audit logs, and permissions on Business.</p>
              </div>
              <div className="rounded-xl border border-dashed border-black/15 p-4">
                <div className="font-medium">Support</div>
                <p className="text-slate-600 mt-1">Community (Free), Email (Pro), Priority (Business).</p>
              </div>
            </div>
          </div>
        </div>
        {!signedIn && (
          <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 text-center">
            <h3 className="text-lg font-semibold">Ready to get started?</h3>
            <p className="mt-1 text-slate-600 text-sm">Create an account to top up tokens.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button size="lg" href="/auth/signin?mode=signup">Sign up</Button>
              <Button size="lg" variant="outline" href="/auth/signin?mode=login">Log in</Button>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

function CustomPlanCard({ currency, onPurchase }: { currency: Currency; onPurchase: (amount: number, currency: Currency) => void; }) {
  const [priceInput, setPriceInput] = useState<string>('5');
  const TOKENS_PER_INVOICE = 10;
  const min = 5;
  const max = 10000;
  const numericPrice = parseFloat(priceInput || '0');
  const validNumber = Number.isFinite(numericPrice);
  const isValidAmount = validNumber && numericPrice >= min && numericPrice <= max;
  const tokens = Math.max(0, calculateTokens(validNumber ? numericPrice : 0, currency));
  const invoices = Math.round(tokens / TOKENS_PER_INVOICE);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPriceInput(e.target.value);
  };

  return (
    <motion.div className="rounded-2xl bg-white border border-black/10 shadow-sm p-6 flex flex-col"
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Custom</div>
        <span className="text-xs rounded-full px-2 py-1 bg-slate-100 border border-black/10 text-slate-700">EARLY / SUPPORTER</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-3xl font-bold">{getCurrencySymbol(currency)}</span>
        <input type="number" step="any" min={min} max={max} value={priceInput}
          onChange={onChange}
          className="w-24 text-3xl font-bold bg-transparent border-b border-black/10 focus:outline-none focus:ring-0" aria-label="Custom price" />
        <span className="text-base font-normal text-slate-500">/one-time</span>
      </div>
      {!isValidAmount && (
        <div className="mt-1 text-[11px] text-red-600">Amount must be between {getCurrencySymbol(currency)}{min} and {getCurrencySymbol(currency)}{max.toLocaleString()}</div>
      )}
      <div className="mt-1 text-xs text-slate-600">= {tokens} tokens (~{invoices} invoices)</div>
      <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
        <li>Top up your account</li>
        <li>No subscription — pay what you need</li>
        <li>Min {getCurrencySymbol(currency)}{min} · Max {getCurrencySymbol(currency)}{max.toLocaleString()}</li>
      </ul>
      <div className="mt-6">
        <Button className="w-full" size="lg" onClick={() => onPurchase(numericPrice, currency)} disabled={!isValidAmount}>
          Buy tokens
        </Button>
      </div>
    </motion.div>
  );
}
