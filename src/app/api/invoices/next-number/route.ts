import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/invoices/next-number
 * Returns the next available invoice number for the authenticated user
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    
    // Get the last invoice for this user
    const last = await prisma.invoice.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { number: true },
    });

    // Calculate next number
    const nextNum = (last?.number && parseInt(last.number.split('-').pop() || '0', 10) + 1) || 245;
    const number = `INV-${new Date().getFullYear()}-${String(nextNum).padStart(6, '0')}`;

    return NextResponse.json({ number });
  } catch (error) {
    console.error('[NEXT_NUMBER_API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate next invoice number' },
      { status: 500 }
    );
  }
}

