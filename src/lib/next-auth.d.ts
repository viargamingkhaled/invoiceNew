import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  // Расширяем тип Session
  interface Session {
    user: {
      id: string;
      tokenBalance: number;
      currency: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  // Расширяем тип JWT (токена)
  interface JWT {
    id: string;
    tokenBalance: number;
    currency: string;
  }
}
