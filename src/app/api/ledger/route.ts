import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isValidCurrency } from '@/lib/currency';
import type { Currency } from '@/lib/currency';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;
  const ledger = await prisma.ledgerEntry.findMany({ where: { userId }, orderBy: { ts: 'desc' } });
  const normalized = ledger.map((entry) => ({
    ...entry,
    amount: entry.amount != null ? Number(entry.amount) : null,
  }));
  return NextResponse.json({ ledger: normalized });
}

// POST: Invoice token deduction only.
// Top-up credits are handled exclusively by the Spoynt webhook callback (server-side, verified).
// This endpoint must never be used to credit tokens — doing so would bypass payment verification.
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;
  const body = await req.json().catch(() => ({}));
  const type = (body.type as string);

  // Only Invoice deductions are permitted from the client side.
  // Top-up and Adjust require server-side verification (webhook / admin).
  if (type !== 'Invoice') {
    return NextResponse.json(
      { error: 'Forbidden: token credits must go through the payment flow' },
      { status: 403 }
    );
  }

  const rawCurrency = (body.currency as string) || session.user.currency || 'GBP';
  const currency: Currency = isValidCurrency(rawCurrency) ? rawCurrency : 'GBP';
  const delta = -Math.abs(Number(body.delta ?? 0));

  if (delta === 0) return NextResponse.json({ error: 'delta required' }, { status: 400 });

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId }, select: { tokenBalance: true } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const newBalance = user.tokenBalance + delta;
    if (newBalance < 0) return NextResponse.json({ error: 'Insufficient token balance' }, { status: 400 });

    await tx.user.update({ where: { id: userId }, data: { tokenBalance: newBalance } });
    const entry = await tx.ledgerEntry.create({
      data: {
        userId,
        type: 'Invoice',
        delta,
        balanceAfter: newBalance,
        currency,
        amount: null,
        receiptUrl: null,
      },
    });
    return NextResponse.json({ entry, tokenBalance: newBalance });
  });
}
