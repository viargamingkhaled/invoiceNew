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
  const invoice = await prisma.invoice.findFirst({ where: { id, userId } });
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
