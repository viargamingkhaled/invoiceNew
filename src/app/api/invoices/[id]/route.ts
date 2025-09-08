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
  // Coerce Decimal fields to numbers for client
  const serialize = (inv: any) => ({
    ...inv,
    subtotal: Number(inv.subtotal),
    tax: Number(inv.tax),
    total: Number(inv.total),
    items: inv.items.map((it: any) => ({ ...it, rate: Number(it.rate) })),
  });
  return NextResponse.json({ invoice: serialize(invoice) });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const body = await req.json().catch(() => ({}));
  const data: any = {};
  for (const key of ['client', 'status'] as const) if (key in body) data[key] = body[key];
  const toDec = (v: any) => typeof v === 'number' ? v.toFixed(2) : (Number(v||0)).toFixed(2);
  if ('subtotal' in body) data.subtotal = toDec(body.subtotal);
  if ('tax' in body) data.tax = toDec(body.tax);
  if ('total' in body) data.total = toDec(body.total);
  if (body.clientMeta) data.clientMeta = body.clientMeta;
  const items = Array.isArray(body.items)
    ? (body.items as Array<{ description: string; quantity: number; rate: number; tax: number }>)
    : null;

  // Helper to (re)write items and totals
  const rewriteItemsAndTotals = async (tx: typeof prisma, invId: string) => {
    if (!items) return {} as any;
    await tx.invoiceItem.deleteMany({ where: { invoiceId: invId } });
    if (items.length) {
      await tx.invoiceItem.createMany({
        data: items.map((it) => ({
          invoiceId: invId,
          description: String(it.description || ''),
          quantity: Math.round(Number(it.quantity || 0)),
          rate: toDec(it.rate),
          tax: Math.round(Number(it.tax || 0)),
        })),
      });
    }
    // Recalculate totals from items
    const all = await tx.invoiceItem.findMany({ where: { invoiceId: invId } });
    const toCents = (v: any) => Math.round(Number(v) * 100);
    const subtotalC = all.reduce((s, it: any) => s + it.quantity * toCents(it.rate), 0);
    const taxC = all.reduce((s, it: any) => s + Math.round(it.quantity * toCents(it.rate) * (it.tax / 100)), 0);
    const totalC = subtotalC + taxC;
    return { subtotal: (subtotalC/100).toFixed(2), tax: (taxC/100).toFixed(2), total: (totalC/100).toFixed(2) } as any;
  };

  // If marking Ready, deduct tokens and record ledger in a transaction
  if (data.status === 'Ready') {
    return await prisma.$transaction(async (tx) => {
      const inv = await tx.invoice.findUnique({ where: { id } });
      if (!inv || inv.userId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 });

      const user = await tx.user.findUnique({ where: { id: userId }, select: { tokenBalance: true } });
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      const cost = 10;
      if (user.tokenBalance < cost) return NextResponse.json({ error: 'Not enough tokens' }, { status: 400 });
      // Optional items update + totals recalculation
      let totals: any = {};
      if (items) {
        totals = await rewriteItemsAndTotals(tx as any, id);
      }
      const invoice = await tx.invoice.update({ where: { id }, data: { ...data, ...(items ? totals : {}) } });
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
      // Coerce Decimals for client
      return NextResponse.json({ invoice: { ...invoice, subtotal: Number(invoice.subtotal), tax: Number(invoice.tax), total: Number(invoice.total) }, tokenBalance: newBalance });
    });
  }

  // Regular update (no token charge)
  if (items) {
    return await prisma.$transaction(async (tx) => {
      const inv0 = await tx.invoice.findUnique({ where: { id } });
      if (!inv0 || inv0.userId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      const totals = await rewriteItemsAndTotals(tx as any, id);
      const invoice = await tx.invoice.update({ where: { id }, data: { ...data, ...totals } });
      return NextResponse.json({ invoice: { ...invoice, subtotal: Number(invoice.subtotal), tax: Number(invoice.tax), total: Number(invoice.total) } });
    });
  }

  const invoice = await prisma.invoice.update({ where: { id }, data });
  if (invoice.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  return NextResponse.json({ invoice: { ...invoice, subtotal: Number(invoice.subtotal), tax: Number(invoice.tax), total: Number(invoice.total) } });
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

