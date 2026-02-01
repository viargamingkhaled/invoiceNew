import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createPaymentInvoice, CURRENCY_TO_SERVICE } from '@/lib/spoynt';
import { isValidCurrency, type Currency } from '@/lib/currency';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/payments/spoynt
 * Create a payment session and redirect user to Spoynt HPP
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const userEmail = session.user.email!;
    const userName = session.user.name || undefined;

    const body = await req.json().catch(() => ({}));
    const amount = Number(body.amount);
    const rawCurrency = (body.currency as string) || 'EUR';
    const currency: Currency = isValidCurrency(rawCurrency) ? rawCurrency : 'EUR';

    // Validation
    if (!amount || amount < 5 || amount > 10000) {
      return NextResponse.json(
        { error: 'Amount must be between 5 and 10,000' },
        { status: 400 }
      );
    }

    if (!CURRENCY_TO_SERVICE[currency]) {
      return NextResponse.json(
        { error: `Unsupported currency: ${currency}` },
        { status: 400 }
      );
    }

    // Generate unique reference ID
    const referenceId = `VNT_${Date.now()}_${randomUUID().slice(0, 8)}`;

    // Base URL for redirects
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://ventira.co.uk';

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        userId,
        referenceId,
        amount: amount,
        currency,
        status: 'pending',
        provider: 'spoynt',
      },
    });

    // Create Spoynt payment invoice
    const result = await createPaymentInvoice({
      referenceId,
      amount,
      currency,
      customerEmail: userEmail,
      customerName: userName,
      description: `Token top-up - ${amount} ${currency}`,
      returnUrl: `${baseUrl}/payment/result`,
      callbackUrl: `${baseUrl}/api/payments/spoynt/callback`,
      metadata: {
        userId,
        paymentId: payment.id,
      },
      testMode: process.env.NODE_ENV !== 'production',
    });

    if (!result.success || !result.hppUrl) {
      // Update payment status to failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'failed', errorMessage: result.error },
      });

      return NextResponse.json(
        { error: result.error || 'Failed to create payment session' },
        { status: 500 }
      );
    }

    // Update payment with Spoynt payment ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: { 
        spoyntPaymentId: result.paymentId,
        status: 'processing',
      },
    });

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      redirectUrl: result.hppUrl,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
