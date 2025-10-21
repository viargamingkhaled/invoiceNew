import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
// ИЗМЕНЕНО: Используем именованный импорт { ContactEmail } вместо дефолтного.
import { ContactEmail } from "@/components/emails/ContactEmail";

let resendClient: Resend | null = null;

function getResendClient() {
  if (resendClient) return resendClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  resendClient = new Resend(apiKey);
  return resendClient;
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const { name, email, message } = validation.data;
    const resend = getResendClient();

    const { data, error } = await resend.emails.send({
      from: "Ventira Contact Form <info@ventira.co.uk>", // Замените на ваш верифицированный домен
      to: ["info@ventira.co.uk"], // Укажите здесь ваш email
      subject: `New message from ${name}`,
      replyTo: email,
      // Теперь этот компонент будет найден и отрендерен корректно
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    if (error instanceof Error && error.message.includes("RESEND_API_KEY")) {
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
