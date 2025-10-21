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

    // ИЗМЕНЕНО: Получаем email, invoiceId и template из тела запроса
    const { email: toEmail, invoiceId, template } = await req.json();
    if (!toEmail || !invoiceId) {
      return NextResponse.json(
        { message: "Recipient email and Invoice ID are required" },
        { status: 400 },
      );
    }
    
    console.log(`[INVOICE_SEND] Selected template: ${template || 'default'}`);

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
    const printUrl = `${origin}/print/${invoice.id}${template ? `?template=${encodeURIComponent(template)}` : ''}`;
    
    console.log(`[INVOICE_SEND] Print URL: ${printUrl}`);
    
    // Generate PDF via Browserless Cloud
    const token = process.env.BROWSERLESS_TOKEN;
    const base = process.env.BROWSERLESS_BASE_URL || 'https://production-sfo.browserless.io';
    if (!token) throw new Error('Missing BROWSERLESS_TOKEN env');

    const blRes = await fetch(`${base}/pdf?token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: printUrl,
        gotoOptions: {
          waitUntil: 'networkidle0',
          timeout: 30000,
        },
        options: {
          printBackground: true,
          format: 'A4',
          margin: { top: '10mm', right: '10mm', bottom: '12mm', left: '10mm' },
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
    const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Ventira';
    const companyName = invoice.user?.company?.name || appName;
    const clientName = (invoice as any).clientMeta?.name || (invoice as any).client || 'Customer';
    const totalAmount = `${invoice.currency} ${Number(invoice.total).toFixed(2)}`;
    const dueDate = invoice.due ? new Date(invoice.due).toLocaleDateString('en-GB') : 'N/A';
    
    await resend.emails.send({
      from: `${appName} <${process.env.EMAIL_FROM || "info@ventira.co.uk"}>`,
      to: toEmail,
      subject: `Invoice ${invoice.number} from ${companyName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f6f9fc;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #0F766E 0%, #14B8A6 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Invoice from ${companyName}</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px 0; font-size: 16px; color: #1f2937; line-height: 1.6;">
                          Dear <strong>${clientName}</strong>,
                        </p>
                        <p style="margin: 0 0 20px 0; font-size: 16px; color: #1f2937; line-height: 1.6;">
                          Thank you for your business! Please find your invoice attached to this email.
                        </p>
                        
                        <!-- Invoice Details -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                          <tr>
                            <td style="padding: 15px 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                              <strong style="color: #374151; font-size: 14px;">Invoice Number:</strong>
                            </td>
                            <td style="padding: 15px 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; text-align: right;">
                              <span style="color: #1f2937; font-size: 14px;">${invoice.number}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 20px; border-bottom: 1px solid #e5e7eb;">
                              <strong style="color: #374151; font-size: 14px;">Amount:</strong>
                            </td>
                            <td style="padding: 15px 20px; border-bottom: 1px solid #e5e7eb; text-align: right;">
                              <span style="color: #0F766E; font-size: 18px; font-weight: 600;">${totalAmount}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 20px;">
                              <strong style="color: #374151; font-size: 14px;">Due Date:</strong>
                            </td>
                            <td style="padding: 15px 20px; text-align: right;">
                              <span style="color: #1f2937; font-size: 14px;">${dueDate}</span>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 30px 0 0 0; font-size: 16px; color: #1f2937; line-height: 1.6;">
                          If you have any questions about this invoice, please don't hesitate to contact us.
                        </p>
                        <p style="margin: 10px 0 0 0; font-size: 16px; color: #1f2937; line-height: 1.6;">
                          Best regards,<br>
                          <strong>${companyName}</strong>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; text-align: center;">
                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">
                          Need help? Contact us at <a href="mailto:${process.env.EMAIL_FROM || 'info@ventira.co.uk'}" style="color: #0F766E; text-decoration: none;">${process.env.EMAIL_FROM || 'info@ventira.co.uk'}</a>
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                          © ${new Date().getFullYear()} ${appName}. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
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
