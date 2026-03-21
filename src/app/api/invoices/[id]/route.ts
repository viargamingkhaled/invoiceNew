import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const normalizeInvoice = (inv: any) => ({
  ...inv,
  subtotal: Number(inv.subtotal),
  tax: Number(inv.tax),
  total: Number(inv.total),
  items: inv.items?.map((it: any) => ({ ...it, rate: Number(it.rate) })),
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const resolvedParams = await params;
    const id = resolvedParams.id as string;
    const userId = session.user.id;

    const invoice = await prisma.invoice.findFirst({
      where: { id, userId },
      include: {
        items: true,
        user: { include: { company: true } },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({ invoice: normalizeInvoice(invoice) });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = resolvedParams.id as string;
    const userId = session.user.id;
    const body = await req.json();

    // If transitioning Draft → Ready, charge 10 tokens
    if (body.status === 'Ready') {
      const current = await prisma.invoice.findFirst({ where: { id, userId }, select: { status: true, number: true } });
      if (!current) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });

      if (current.status === 'Draft') {
        return await prisma.$transaction(async (tx) => {
          const user = await tx.user.findUnique({ where: { id: userId }, select: { tokenBalance: true } });
          if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
          if (user.tokenBalance < 10) return NextResponse.json({ error: 'Not enough tokens' }, { status: 400 });

          const updated = await tx.invoice.update({
            where: { id, userId },
            data: body,
            include: { items: true, user: { include: { company: true } } },
          });

          const newBalance = user.tokenBalance - 10;
          await tx.user.update({ where: { id: userId }, data: { tokenBalance: newBalance } });
          await tx.ledgerEntry.create({
            data: {
              userId,
              type: 'Invoice',
              delta: -10,
              balanceAfter: newBalance,
              invoiceNumber: current.number,
            },
          });

          return NextResponse.json({ invoice: normalizeInvoice(updated), tokenBalance: newBalance });
        });
      }
    }

    // All other updates (no token charge)
    const updatedInvoice = await prisma.invoice.update({
      where: { id, userId },
      data: body,
      include: { items: true, user: { include: { company: true } } },
    });

    return NextResponse.json({ invoice: normalizeInvoice(updatedInvoice) });
  } catch (error) {
    console.error('Error updating invoice:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}