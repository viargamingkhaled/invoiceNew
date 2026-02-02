import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyCallbackSignature, isPaymentSuccessful, isPaymentFailed, isPaymentPending } from '@/lib/spoynt';
import { convertToEUR, TOKENS_PER_EUR, isValidCurrency } from '@/lib/currency';
import type { Currency } from '@/lib/currency';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TxClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/payments/spoynt/callback
 * Handle Spoynt payment callbacks (webhooks)
 * 
 * Spoynt sends callbacks when payment status changes
 * Signature verification ensures requests are authentic
 */
export async function POST(req: Request) {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🟣 [CALLBACK] Spoynt webhook received');
  console.log('Time:', new Date().toISOString());
  console.log('───────────────────────────────────────────────────────');
  
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') || '';
    
    console.log('📦 Body length:', rawBody.length, 'bytes');
    console.log('🔐 Signature present:', signature ? 'Yes' : 'No');

    // Parse callback data
    let callbackData: any;
    try {
      callbackData = JSON.parse(rawBody);
      console.log('✅ JSON parsed successfully');
    } catch {
      console.error('❌ Invalid callback JSON');
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const attributes = callbackData.data?.attributes;
    if (!attributes) {
      console.error('❌ Invalid callback structure - no attributes');
      return NextResponse.json({ error: 'Invalid callback structure' }, { status: 400 });
    }

    const isTestMode = attributes.test_mode === true;

    console.log('📋 Callback data:', {
      spoyntPaymentId: callbackData.data?.id,
      referenceId: attributes.reference_id,
      status: attributes.status,
      resolution: attributes.resolution,
      amount: attributes.amount,
      currency: attributes.currency,
      testMode: isTestMode
    });

    // Verify signature in production
    if (process.env.NODE_ENV === 'production' || process.env.VERIFY_SPOYNT_SIGNATURE === 'true') {
      console.log('🔐 Verifying signature...');
      if (!verifyCallbackSignature(rawBody, signature, isTestMode)) {
        console.error('❌ Invalid callback signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
      console.log('✅ Signature verified');
    }

    const spoyntPaymentId = callbackData.data?.id;
    const referenceId = attributes.reference_id;
    const status = attributes.status;
    const resolution = attributes.resolution;
    const amount = attributes.amount;
    const currency = attributes.currency;

    console.log(`🟣 [CALLBACK] Processing: ${spoyntPaymentId} - Status: ${status}, Resolution: ${resolution}`);

    // Find payment in database
    const payment = await prisma.payment.findFirst({
      where: {
        OR: [
          { spoyntPaymentId },
          { referenceId },
        ],
      },
    });

    if (!payment) {
      console.error(`Payment not found: ${spoyntPaymentId} / ${referenceId}`);
      // Return 200 to prevent retries for unknown payments
      return NextResponse.json({ received: true, message: 'Payment not found' });
    }

    // Skip if already processed
    if (payment.status === 'completed' || payment.status === 'failed') {
      console.log(`Payment ${payment.id} already processed with status: ${payment.status}`);
      return NextResponse.json({ received: true, message: 'Already processed' });
    }

    // Process based on payment status
    if (isPaymentSuccessful(status)) {
      // Payment successful - add tokens to user balance
      await prisma.$transaction(async (tx: TxClient) => {
        // Update payment status
        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: 'completed',
            spoyntPaymentId,
            completedAt: new Date(),
          },
        });

        // Get user
        const user = await tx.user.findUnique({
          where: { id: payment.userId },
          select: { tokenBalance: true },
        });

        if (!user) {
          throw new Error('User not found');
        }

        // Calculate tokens
        const paymentCurrency: Currency = isValidCurrency(currency) ? currency : 'EUR';
        const amountEUR = convertToEUR(amount, paymentCurrency);
        const tokensToAdd = Math.round(amountEUR * TOKENS_PER_EUR);
        const newBalance = user.tokenBalance + tokensToAdd;

        // Update user balance
        await tx.user.update({
          where: { id: payment.userId },
          data: { tokenBalance: newBalance },
        });

        // Create ledger entry
        await tx.ledgerEntry.create({
          data: {
            userId: payment.userId,
            type: 'Top-up',
            delta: tokensToAdd,
            balanceAfter: newBalance,
            currency: paymentCurrency,
            amount: amount,
            receiptUrl: `https://ventira.co.uk/payment/receipt/${payment.id}`,
          },
        });

        console.log(`Added ${tokensToAdd} tokens to user ${payment.userId}. New balance: ${newBalance}`);
      });

    } else if (isPaymentFailed(status)) {
      // Payment failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'failed',
          errorMessage: resolution || 'Payment failed',
          spoyntPaymentId,
        },
      });
      console.log(`Payment ${payment.id} failed: ${resolution}`);

    } else if (isPaymentPending(status)) {
      // Payment pending - update status
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'processing',
          spoyntPaymentId,
        },
      });
      console.log(`Payment ${payment.id} pending: ${status}`);
    }

    // Return 200 to acknowledge receipt
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Callback processing error:', error);
    // Return 500 to trigger retry
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for verification/testing
export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: 'Spoynt callback handler' });
}
