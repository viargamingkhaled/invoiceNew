import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;

  const body = await req.json().catch(() => ({}));
  const currency = (body.currency as 'GBP' | 'EUR') || ((session.user as any).currency ?? 'GBP');
  const client = (body.client as string) || 'New Client';
  const subtotal = Number(body.subtotal ?? 0);
  const tax = Number(body.tax ?? 0);
  const total = Number(body.total ?? subtotal + tax);

  // Create draft invoice without charging tokens
  const last = await prisma.invoice.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
  const nextNum = (last?.number && parseInt(last.number.split('-').pop() || '0', 10) + 1) || 245;
  const number = `INV-${new Date().getFullYear()}-${String(nextNum).padStart(6, '0')}`;

  const invoice = await prisma.invoice.create({
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

  return NextResponse.json({ invoice });
}

