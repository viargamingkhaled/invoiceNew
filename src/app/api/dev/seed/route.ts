import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get('secret');
  const expected = process.env.SEED_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = [
    { email: 'user-with-tokens@mail.com', name: 'Test User (tokens)', tokenBalance: 1000 },
    { email: 'user-without-tokens@mail.com', name: 'Test User (no tokens)', tokenBalance: 0 },
  ];

  const results = [] as any[];
  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { tokenBalance: u.tokenBalance },
      create: { email: u.email, name: u.name, tokenBalance: u.tokenBalance, currency: 'GBP' as any },
    });
    results.push({ id: user.id, email: user.email, tokenBalance: user.tokenBalance });
  }

  return NextResponse.json({ ok: true, users: results });
}

