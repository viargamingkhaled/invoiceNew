import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // ИЗМЕНЕНО: Строка с PrismaAdapter была полностью удалена, чтобы убрать конфликт.

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt", // Мы явно используем JWT, поэтому адаптер не нужен.
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Этот колбэк вызывается после успешной authorize
    async jwt({ token, user }) {
      // `user` передается сюда только при первом входе
      if (user) {
        token.id = user.id;
        token.tokenBalance = (user as any).tokenBalance ?? 0;
        token.currency = (user as any).currency ?? "GBP";
      }
      return token;
    },
    // Этот колбэк передает данные из токена в клиентский объект session
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        (session.user as any).tokenBalance = token.tokenBalance;
        (session.user as any).currency = token.currency;
      }
      return session;
    },
  },
};
