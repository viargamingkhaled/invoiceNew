import { Currency, convertFromGBP } from './currency';

export type { Currency };

export const pricingPlans = [
  {
    id: "price_starter_10", // Уникальный ID для планов
    name: "Beginner",
    baseGBP: 10,
    tokens: 1000,
    popular: false,
    cta: "Buy tokens",
    bullets: [
      "Top up 1,000 tokens (~100 invoices)",
      "No subscription",
      "Draft/preview free",
    ],
  },
  {
    id: "price_pro_50",
    name: "Pro",
    baseGBP: 50,
    tokens: 5000,
    popular: true,
    cta: "Buy tokens",
    bullets: [
      "Top up 5,000 tokens (~500 invoices)",
      "Templates & logo",
      "Payment links",
      "Read receipts",
    ],
  },
  {
    id: "price_business_100",
    name: "Business",
    baseGBP: 100,
    tokens: 10000,
    popular: false,
    cta: "Buy tokens",
    bullets: [
      "Top up 10,000 tokens (~1,000 invoices)",
      "Teams & roles",
      "Integrations (Wise)",
      "API & webhooks",
    ],
  },
];

export type Plan = (typeof pricingPlans)[0];

// Helper function to get price in specific currency
export function getPlanPrice(plan: Plan, currency: Currency): number {
  return convertFromGBP(plan.baseGBP, currency);
}
