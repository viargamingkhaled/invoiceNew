import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    console.error(`❌ Webhook signature verification failed: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const tokensToAdd = session.metadata?.tokens;

    if (!userId || !tokensToAdd) {
      return new NextResponse("Webhook Error: Missing metadata", {
        status: 400,
      });
    }

    try {
      const numericTokens = parseInt(tokensToAdd, 10);

      // ИЗМЕНЕНО: Используем атомарную операцию `increment`
      // Это гарантирует, что баланс обновится корректно, даже при одновременных операциях.
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          tokenBalance: {
            increment: numericTokens,
          },
        },
      });

      // Теперь создаем запись в Ledger с уже обновленным балансом
      await prisma.ledgerEntry.create({
        data: {
          userId: userId,
          type: "STRIPE_PURCHASE",
          delta: numericTokens,
          balanceAfter: updatedUser.tokenBalance, // Используем актуальный баланс
          receiptUrl:
            typeof session.payment_intent === "string"
              ? `https://dashboard.stripe.com/payments/${session.payment_intent}`
              : null,
        },
      });
    } catch (error) {
      console.error("Error in webhook handler:", error);
      return new NextResponse("Webhook handler failed.", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
