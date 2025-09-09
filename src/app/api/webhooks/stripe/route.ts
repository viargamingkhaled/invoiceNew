import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  // ИСПРАВЛЕНО: Правильный синтаксис для получения заголовков
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
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return new NextResponse("User not found", { status: 404 });
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          tokenBalance: {
            increment: parseInt(tokensToAdd, 10),
          },
        },
      });

      await prisma.ledgerEntry.create({
        data: {
          userId: userId,
          type: "STRIPE_PURCHASE",
          delta: parseInt(tokensToAdd, 10),
          balanceAfter: user.tokenBalance + parseInt(tokensToAdd, 10),
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
