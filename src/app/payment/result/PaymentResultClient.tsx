'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, ArrowRight, RefreshCw } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  
  const status = searchParams.get('status') || 'pending';
  
  // Auto-redirect for success
  useEffect(() => {
    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Notify other tabs about token update
            try {
              const bc = new BroadcastChannel('app-events');
              bc.postMessage({ type: 'tokens-updated' });
              bc.close();
            } catch {}
            router.push('/dashboard');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, router]);

  const statusConfig = {
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      title: 'Payment Successful!',
      description: 'Your tokens have been added to your account.',
      showCountdown: true,
    },
    fail: {
      icon: XCircle,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      title: 'Payment Failed',
      description: 'Your payment could not be processed. Please try again or use a different payment method.',
      showCountdown: false,
    },
    pending: {
      icon: Clock,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      title: 'Payment Pending',
      description: 'Your payment is being processed. Tokens will be added once the payment is confirmed.',
      showCountdown: false,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Section className="py-16">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`rounded-2xl border ${config.borderColor} ${config.bgColor} p-8 text-center`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Icon className={`w-16 h-16 mx-auto ${config.iconColor}`} />
            </motion.div>
            
            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              {config.title}
            </h1>
            
            <p className="mt-3 text-slate-600">
              {config.description}
            </p>

            {status === 'success' && config.showCountdown && (
              <p className="mt-4 text-sm text-slate-500">
                Redirecting to dashboard in {countdown} seconds...
              </p>
            )}

            <div className="mt-8 space-y-3">
              {status === 'success' ? (
                <Button 
                  href="/dashboard" 
                  className="w-full"
                  size="lg"
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : status === 'fail' ? (
                <>
                  <Button 
                    href="/pricing" 
                    className="w-full"
                    size="lg"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                  </Button>
                  <Button 
                    href="/contact" 
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Contact Support
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    href="/dashboard" 
                    className="w-full"
                    size="lg"
                  >
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-slate-500">
                    We&apos;ll notify you once the payment is confirmed.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-6 text-center text-sm text-slate-500">
            {status === 'success' ? (
              <p>A receipt has been sent to your email address.</p>
            ) : status === 'fail' ? (
              <p>If you believe this is an error, please check your bank statement or contact support.</p>
            ) : (
              <p>Payment processing typically takes a few seconds to a few minutes.</p>
            )}
          </div>
        </motion.div>
      </Section>
    </div>
  );
}

export default function PaymentResultClient() {
  return (
    <Suspense fallback={
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    }>
      <PaymentResultContent />
    </Suspense>
  );
}
