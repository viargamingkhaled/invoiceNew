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
    console.log('🟢 [API] Step 1: Payment session request received');
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      console.log('❌ [API] Unauthorized request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const userEmail = session.user.email!;
    const userName = session.user.name || undefined;
    console.log('🟢 [API] Step 2: User authenticated', { userId, userEmail });

    const body = await req.json().catch(() => ({}));
    const amount = Number(body.amount);
    const rawCurrency = (body.currency as string) || 'EUR';
    const currency: Currency = isValidCurrency(rawCurrency) ? rawCurrency : 'EUR';
    console.log('🟢 [API] Step 3: Request parsed', { amount, currency });

    // Validation
    if (!amount || amount < 5 || amount > 10000) {
      console.log('❌ [API] Invalid amount', { amount });
      return NextResponse.json(
        { error: 'Amount must be between 5 and 10,000' },
        { status: 400 }
      );
    }

    if (!CURRENCY_TO_SERVICE[currency]) {
      console.log('❌ [API] Unsupported currency', { currency });
      return NextResponse.json(
        { error: `Unsupported currency: ${currency}` },
        { status: 400 }
      );
    }

    // Generate unique reference ID
    const referenceId = `VNT_${Date.now()}_${randomUUID().slice(0, 8)}`;
    console.log('🟢 [API] Step 4: Reference ID generated', { referenceId });

    // Base URL for redirects
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://ventira.co.uk';
    console.log('🟢 [API] Step 5: Base URL', { baseUrl });

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
    console.log('🟢 [API] Step 6: Payment record created in DB', { paymentId: payment.id });

    // Create Spoynt payment invoice
    const testMode = process.env.NODE_ENV !== 'production';
    console.log('🟢 [API] Step 7: Calling Spoynt API', { testMode, service: CURRENCY_TO_SERVICE[currency] });
    
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
      testMode,
    });

    console.log('🟢 [API] Step 8: Spoynt API response', { 
      success: result.success, 
      paymentId: result.paymentId,
      hppUrl: result.hppUrl,
      fullResponse: JSON.stringify(result, null, 2)
    });

    if (!result.success || !result.hppUrl) {
      console.log('❌ [API] Spoynt API error', { error: result.error, fullResult: result });
      
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

    console.log('✅ [API] Step 9: Payment session created successfully', { 
      paymentId: payment.id, 
      spoyntPaymentId: result.paymentId,
      hppUrl: result.hppUrl 
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
