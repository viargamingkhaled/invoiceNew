import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/currency';
import type { Currency } from '@/lib/currency';
import type { Metadata } from 'next';
import PrintButton from './PrintButton';

export const metadata: Metadata = {
  title: 'Payment Receipt - Ventira',
  description: 'Your payment receipt',
};

export const dynamic = 'force-dynamic';

export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/auth/signin?mode=login');

  const userId = (session.user as any).id as string;
  const { id } = await params;
  const payment = await prisma.payment.findUnique({ where: { id } });

  // Security: only let the owner view their own receipt
  if (!payment || payment.userId !== userId) notFound();

  const fmt = (n: number | string | { toNumber?: () => number }) =>
    formatCurrency(
      typeof n === 'object' && typeof (n as any).toNumber === 'function'
        ? (n as any).toNumber()
        : Number(n),
      payment.currency as Currency
    );

  const statusLabel: Record<string, string> = {
    completed: 'Paid',
    pending: 'Pending',
    processing: 'Processing',
    failed: 'Failed',
  };

  const statusColor: Record<string, string> = {
    completed: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    pending: 'text-amber-700 bg-amber-50 border-amber-200',
    processing: 'text-amber-700 bg-amber-50 border-amber-200',
    failed: 'text-red-700 bg-red-50 border-red-200',
  };

  const label = statusLabel[payment.status] ?? payment.status;
  const color = statusColor[payment.status] ?? 'text-slate-700 bg-slate-50 border-slate-200';

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-lg mx-auto px-4 py-16">
        <div className="rounded-2xl bg-white border border-black/10 shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Payment Receipt</h1>
              <p className="text-sm text-slate-500 mt-0.5">ventira.co.uk</p>
            </div>
            <span className={`text-xs rounded-full px-3 py-1 border font-medium ${color}`}>
              {label}
            </span>
          </div>

          <div className="mt-6 border-t border-black/10" />

          {/* Amount */}
          <div className="mt-6 text-center">
            <div className="text-4xl font-bold text-slate-900">{fmt(payment.amount)}</div>
            <div className="text-sm text-slate-500 mt-1">Token top-up</div>
          </div>

          <div className="mt-6 border-t border-black/10" />

          {/* Details */}
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Receipt ID</dt>
              <dd className="font-mono text-slate-900 text-xs">{payment.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Reference</dt>
              <dd className="font-mono text-slate-900 text-xs">{payment.referenceId}</dd>
            </div>
            {payment.spoyntPaymentId && (
              <div className="flex justify-between">
                <dt className="text-slate-500">Transaction ID</dt>
                <dd className="font-mono text-slate-900 text-xs">{payment.spoyntPaymentId}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-slate-500">Currency</dt>
              <dd className="text-slate-900">{payment.currency}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Date</dt>
              <dd className="text-slate-900">
                {payment.completedAt
                  ? new Date(payment.completedAt).toLocaleString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })
                  : new Date(payment.createdAt).toLocaleString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Provider</dt>
              <dd className="text-slate-900 capitalize">{payment.provider}</dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-black/10" />

          <div className="mt-6 flex gap-3">
            <a
              href="/dashboard"
              className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-center font-medium hover:bg-slate-50 transition-colors"
            >
              Back to Dashboard
            </a>
            <PrintButton />
          </div>
        </div>
      </div>
    </main>
  );
}
