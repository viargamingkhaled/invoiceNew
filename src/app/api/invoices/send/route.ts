import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Resend } from "resend";
// Switched to Browserless Cloud to avoid Chromium issues on Vercel

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

const absoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
};

// Функция теперь принимает только один аргумент `req`
export async function POST(req: Request) {
  try {
    console.log(`[INVOICE_SEND] Starting email send process`);
    console.log(`[INVOICE_SEND] RESEND_API_KEY exists: ${!!process.env.RESEND_API_KEY}`);
    console.log(`[INVOICE_SEND] EMAIL_FROM: ${process.env.EMAIL_FROM}`);
    
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ИЗМЕНЕНО: Получаем и email, и invoiceId из тела запроса
    const { email: toEmail, invoiceId } = await req.json();
    if (!toEmail || !invoiceId) {
      return NextResponse.json(
        { message: "Recipient email and Invoice ID are required" },
        { status: 400 },
      );
    }

    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId, // Используем ID из тела запроса
        userId: session.user.id,
      },
      include: { user: { include: { company: true } } },
    });

    if (!invoice) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 },
      );
    }

    console.log(`[INVOICE_SEND] Generating PDF for invoice ${invoice.id}`);
    
    // Generate PDF directly instead of fetching from API
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const origin = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
    const printUrl = `${origin}/print/${invoice.id}`;
    
    console.log(`[INVOICE_SEND] Print URL: ${printUrl}`);
    
    // Generate PDF via Browserless Cloud
    const token = process.env.BROWSERLESS_TOKEN;
    if (!token) throw new Error('Missing BROWSERLESS_TOKEN env');

    const blUrl = `https://chrome.browserless.io/pdf?token=${token}`;
    const blRes = await fetch(blUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: printUrl,
        options: {
          printBackground: true,
          format: 'A4',
          margin: { top: '10mm', right: '10mm', bottom: '12mm', left: '10mm' },
          waitUntil: ['domcontentloaded', 'networkidle0'],
          timeout: 30000,
        },
      }),
    });

    if (!blRes.ok) {
      const msg = await blRes.text().catch(()=> '');
      throw new Error(`Browserless PDF failed: ${msg}`);
    }

    const pdfArrayBuffer = await blRes.arrayBuffer();
    const pdfBuffer = Buffer.from(pdfArrayBuffer);
    console.log(`[INVOICE_SEND] PDF generated via Browserless, size: ${pdfBuffer.length} bytes`);

    const resend = getResendClient();
    await resend.emails.send({
      from: `Invoicerly <${process.env.EMAIL_FROM || "info@invoicerly.co.uk"}>`,
      to: toEmail,
      subject: `Invoice ${invoice.number} from ${invoice.user?.company?.name || "Invoicerly"}`,
      html: `<p>Please find your invoice attached.</p>`,
      attachments: [
        {
          filename: `Invoice-${invoice.number}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    if (error instanceof Error && error.message.includes("RESEND_API_KEY")) {
      console.error("[INVOICE_SEND_ERROR]", error.message);
      return NextResponse.json(
        { message: "Email service is not configured. Please try again later." },
        { status: 500 },
      );
    }
    console.error("[INVOICE_SEND_ERROR]", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
