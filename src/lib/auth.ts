import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";

const hasSmtp = !!(
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.EMAIL_FROM
);

export const authOptions: NextAuthOptions = {
  // Включаем подробные логи next-auth по флагу (включите NEXTAUTH_DEBUG=1 в Vercel при отладке)
  debug: process.env.NEXTAUTH_DEBUG === "1",
  secret: process.env.NEXTAUTH_SECRET,
  // Для некоторых конфигураций за прокси (Vercel, custom domain)
  // помогает, если NEXTAUTH_URL задан, но хост отличается
  // См. https://next-auth.js.org/configuration/options#trusthost
  // @ts-expect-error v4 тип может не знать trustHost, но опция поддерживается
  trustHost: true,
  // EmailProvider требует adapter для хранения verification tokens, users, sessions
  adapter: PrismaAdapter(prisma as any),
  session: { strategy: "jwt" },
  providers: [
    // Credentials provider for test users (no SMTP required)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email || "").toLowerCase().trim();
        const password = credentials?.password || "";

        if (!email || !password) return null;

        const allowed = new Map<string, { name: string; tokenBalance: number }>(
          [
            [
              "user-with-tokens@mail.com",
              { name: "Test User (tokens)", tokenBalance: 1000 },
            ],
            [
              "user-without-tokens@mail.com",
              { name: "Test User (no tokens)", tokenBalance: 0 },
            ],
          ],
        );

        const match = allowed.get(email);
        if (!match) return null;
        if (password !== "password123") return null;

        // Ensure a user row exists and token balance is set
        const user = await prisma.user.upsert({
          where: { email },
          update: { tokenBalance: match.tokenBalance },
          create: {
            email,
            name: match.name,
            tokenBalance: match.tokenBalance,
            currency: "GBP" as any,
          },
        });

        return {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email ?? undefined,
        } as any;
      },
    }),
    // Email magic-link (enabled only if SMTP configured)
    ...(hasSmtp
      ? [
          (() => {
            const port = Number(process.env.SMTP_PORT || 587);
            const secure = port === 465; // SMTPS
            return EmailProvider({
              server: {
                host: process.env.SMTP_HOST,
                port,
                auth: {
                  user: process.env.SMTP_USER!,
                  pass: process.env.SMTP_PASS!,
                },
                ...(secure ? { secure: true } : {}),
              },
              from: process.env.EMAIL_FROM,
              maxAge: 24 * 60 * 60,
            });
          })(),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // При первом входе или обновлении добавляем данные из БД в токен
      if (user && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email as string },
          select: { id: true, tokenBalance: true, currency: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.tokenBalance = dbUser.tokenBalance ?? 0;
          token.currency = (dbUser.currency as string) ?? "GBP";
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Always refresh balance/currency from DB so session stays in sync
      if (session.user && token && token.id) {
        session.user.id = token.id;
        session.user.tokenBalance = token.tokenBalance;
        session.user.currency = token.currency;
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: (token as any).id as string },
            select: { tokenBalance: true, currency: true },
          });
          (session.user as any).id = (token as any).id;
          (session.user as any).tokenBalance =
            dbUser?.tokenBalance ?? (token as any).tokenBalance ?? 0;
          (session.user as any).currency =
            (dbUser?.currency as any) ?? (token as any).currency ?? "GBP";
        } catch {
          // Fallback to token values if DB not reachable
          (session.user as any).id = (token as any).id;
          (session.user as any).tokenBalance = (token as any).tokenBalance ?? 0;
          (session.user as any).currency = (token as any).currency ?? "GBP";
        }
      }
      return session;
    },
  },
};
