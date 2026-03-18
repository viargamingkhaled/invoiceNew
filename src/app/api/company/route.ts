import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;
  const company = await prisma.company.findUnique({ where: { userId } });
  return NextResponse.json({ company });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;
  const body = await req.json();
  const data: Prisma.CompanyUpdateInput = {};
  for (const key of ['name', 'vat', 'reg', 'address1', 'city', 'country', 'iban', 'logoUrl', 'bankName', 'bic'] as const) {
    if (key in body) data[key] = body[key as keyof typeof body];
  }
  let company = await prisma.company.findUnique({ where: { userId } });
  if (!company) {
    const companyName = typeof data.name === 'string' ? data.name : 'Company';
    company = await prisma.company.create({ data: { userId, name: companyName } });
  }
  const updated = await prisma.company.update({ where: { userId }, data });
  return NextResponse.json({ company: updated });
}
