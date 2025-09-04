import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const invoices = await prisma.invoice.findMany({ where: { userId }, orderBy: { date: 'desc' } });
  return NextResponse.json({ invoices });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;

  const body = await req.json().catch(() => ({}));
  const currency = (body.currency as 'GBP' | 'EUR') || ((session.user as any).currency ?? 'GBP');
  const client = (body.client as string) || 'New Client';
  const subtotal = Number(body.subtotal ?? 100);
  const tax = Number(body.tax ?? 20);
  const total = Number(body.total ?? subtotal + tax);

  // Charge 10 tokens per created invoice
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId }, select: { tokenBalance: true } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    if (user.tokenBalance < 10) return NextResponse.json({ error: 'Not enough tokens' }, { status: 400 });

    const last = await tx.invoice.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
    const nextNum = (last?.number && parseInt(last.number.split('-').pop() || '0', 10) + 1) || 245;
    const number = `INV-${new Date().getFullYear()}-${String(nextNum).padStart(6, '0')}`;

    const invoice = await tx.invoice.create({
      data: {
        userId,
        number,
        date: new Date(),
        client,
        currency,
        subtotal,
        tax,
        total,
        status: 'Draft',
      },
    });

    const newBalance = user.tokenBalance - 10;
    await tx.user.update({ where: { id: userId }, data: { tokenBalance: newBalance } });
    await tx.ledgerEntry.create({
      data: {
        userId,
        type: 'Invoice',
        delta: -10,
        balanceAfter: newBalance,
      },
    });

    return NextResponse.json({ invoice, tokenBalance: newBalance });
  });
}
