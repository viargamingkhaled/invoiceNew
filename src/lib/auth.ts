import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

const hasSmtp = !!(
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.EMAIL_FROM
);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  providers: [
    // Credentials provider for test users (no SMTP required)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = (credentials?.email || '').toLowerCase().trim();
        const password = credentials?.password || '';

        if (!email || !password) return null;

        const allowed = new Map<
          string,
          { name: string; tokenBalance: number }
        >([
          ['user-with-tokens@mail.com', { name: 'Test User (tokens)', tokenBalance: 1000 }],
          ['user-without-tokens@mail.com', { name: 'Test User (no tokens)', tokenBalance: 0 }],
        ]);

        const match = allowed.get(email);
        if (!match) return null;
        if (password !== 'password123') return null;

        // Ensure a user row exists and token balance is set
        const user = await prisma.user.upsert({
          where: { email },
          update: { tokenBalance: match.tokenBalance },
          create: {
            email,
            name: match.name,
            tokenBalance: match.tokenBalance,
            currency: 'GBP' as any,
          },
        });

        return { id: user.id, name: user.name ?? undefined, email: user.email ?? undefined } as any;
      },
    }),
    // Email magic-link (enabled only if SMTP configured)
    ...(hasSmtp
      ? [
          EmailProvider({
            server: {
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT || 587),
              auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
            },
            from: process.env.EMAIL_FROM,
            maxAge: 24 * 60 * 60,
          }),
        ]
      : []),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).tokenBalance = (user as any).tokenBalance ?? 0;
        (session.user as any).currency = (user as any).currency ?? 'GBP';
      }
      return session;
    },
  },
};
