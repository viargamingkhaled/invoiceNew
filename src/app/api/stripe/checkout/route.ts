import { authOptions } from "@/lib/auth";
import { Currency, pricingPlans } from "@/lib/plans";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const absoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ИЗМЕНЕНО: Получаем и planId, и currency из тела запроса
    const { planId, currency } = (await req.json()) as {
      planId: string;
      currency: Currency;
    };
    const plan = pricingPlans.find((p) => p.id === planId);

    if (!plan) {
      return new NextResponse("Plan not found", { status: 404 });
    }

    // ИЗМЕНЕНО: Выбираем правильную цену в зависимости от валюты
    const priceInCents =
      currency === "GBP" ? plan.baseGBP * 100 : plan.baseEUR * 100;
    if (!priceInCents) {
      return new NextResponse("Price not found for this currency", {
        status: 400,
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: session.user.email || undefined,
      line_items: [
        {
          price_data: {
            // ИЗМЕНЕНО: Используем полученную валюту
            currency: currency.toLowerCase(),
            product_data: {
              name: plan.name,
              description: `Get ${plan.tokens} tokens for your account.`,
            },
            // ИЗМЕНЕНО: Используем правильную цену в центах/евроцентах
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        tokens: plan.tokens,
        planId: plan.id,
      },
      success_url: absoluteUrl("/dashboard?payment=success"),
      cancel_url: absoluteUrl("/pricing?payment=cancelled"),
    });

    if (!checkoutSession.url) {
      return new NextResponse("Error creating checkout session", {
        status: 500,
      });
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
