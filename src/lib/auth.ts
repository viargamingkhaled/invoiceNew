import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

// Проверяем, настроена ли отправка почты
const hasSmtp = !!(
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.EMAIL_FROM
);

export const authOptions: NextAuthOptions = {
  debug: process.env.NEXTAUTH_DEBUG === "1",
  secret: process.env.NEXTAUTH_SECRET,
  // @ts-expect-error
  trustHost: true,
  adapter: PrismaAdapter(prisma as any),
  session: { strategy: "jwt" },

  // ИЗМЕНЕНО: Мы полностью удалили CredentialsProvider
  // Теперь доступен только вход по email (magic link)
  providers: [
    ...(hasSmtp
      ? [
          (() => {
            const port = Number(process.env.SMTP_PORT || 587);
            const secure = port === 465;
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
              // После перехода по ссылке из письма пользователь будет перенаправлен на дашборд
              maxAge: 24 * 60 * 60,
            });
          })(),
        ]
      : []),
  ],

  // Этот блок мы уже исправляли, он остается как есть
  callbacks: {
    async jwt({ token, user }) {
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
      if (session.user && token && token.id) {
        session.user.id = token.id;
        session.user.tokenBalance = token.tokenBalance;
        session.user.currency = token.currency;
      }
      return session;
    },
  },
};
