import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev",
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.tokenBalance = (user as any).tokenBalance ?? 0;
        token.currency = (user as any).currency ?? "EUR";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        (session.user as any).tokenBalance = token.tokenBalance;
        (session.user as any).currency = token.currency;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      const appUrl = process.env.NEXTAUTH_URL || baseUrl;
      
      // If it's a relative URL, use the configured base URL
      if (url.startsWith("/")) return `${appUrl}${url}`;
      
      // If it's an absolute URL, check if it's from the same origin
      try {
        const urlObj = new URL(url);
        const appUrlObj = new URL(appUrl);
        if (urlObj.origin === appUrlObj.origin) return url;
      } catch {
        // Invalid URL, return base URL
      }
      
      // Default to configured base URL
      return appUrl;
    },
  },
};
