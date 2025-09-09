import Stripe from "stripe";

// Эта проверка убедится, что вы не забыли добавить ключ в .env.local
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil", // Используем последнюю стабильную версию API
  typescript: true,
});
