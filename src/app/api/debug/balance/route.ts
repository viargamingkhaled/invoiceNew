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

  const dbUser = await prisma.user.findUnique({ where: { id: userId }, select: { tokenBalance: true } });
  const last = await prisma.ledgerEntry.findFirst({ where: { userId }, orderBy: { ts: 'desc' }, select: { balanceAfter: true, delta: true, ts: true, type: true } });
  const sessionBalance = (session.user as any).tokenBalance ?? null;
  return NextResponse.json({
    sessionBalance,
    dbBalance: dbUser?.tokenBalance ?? null,
    ledgerLast: last || null,
  });
}

