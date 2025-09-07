import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const invoice = await prisma.invoice.findFirst({ where: { id, userId }, include: { items: true, user: { include: { company: true } } } });
  if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ invoice });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const body = await req.json().catch(() => ({}));
  const data: any = {};
  for (const key of ['client', 'status'] as const) if (key in body) data[key] = body[key];
  if ('subtotal' in body) data.subtotal = Number(body.subtotal);
  if ('tax' in body) data.tax = Number(body.tax);
  if ('total' in body) data.total = Number(body.total);

  // If marking Ready, deduct tokens and record ledger in a transaction
  if (data.status === 'Ready') {
    return await prisma.$transaction(async (tx) => {
      const inv = await tx.invoice.findUnique({ where: { id } });
      if (!inv || inv.userId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 });

      const user = await tx.user.findUnique({ where: { id: userId }, select: { tokenBalance: true } });
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      const cost = 100;
      if (user.tokenBalance < cost) return NextResponse.json({ error: 'Not enough tokens' }, { status: 400 });

      const invoice = await tx.invoice.update({ where: { id }, data });
      const newBalance = user.tokenBalance - cost;
      await tx.user.update({ where: { id: userId }, data: { tokenBalance: newBalance } });
      await tx.ledgerEntry.create({
        data: {
          userId,
          type: 'Invoice',
          delta: -cost,
          balanceAfter: newBalance,
        },
      });
      return NextResponse.json({ invoice, tokenBalance: newBalance });
    });
  }

  const invoice = await prisma.invoice.update({ where: { id }, data });
  if (invoice.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  return NextResponse.json({ invoice });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice || invoice.userId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await prisma.invoice.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
