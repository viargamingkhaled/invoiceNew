import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const absoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
};

// ИСПРАВЛЕНО: Тип второго аргумента теперь правильный
export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { email: toEmail } = await req.json();
    if (!toEmail) {
      return NextResponse.json(
        { message: "Recipient email is required" },
        { status: 400 },
      );
    }

    const invoice = await prisma.invoice.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: { user: { include: { company: true } } },
    });

    if (!invoice) {
      return new NextResponse("Invoice not found", { status: 404 });
    }

    const pdfResponse = await fetch(absoluteUrl(`/api/pdf/${invoice.id}`));
    if (!pdfResponse.ok) {
      throw new Error("Failed to fetch PDF for attachment");
    }
    const pdfBlob = await pdfResponse.blob();
    const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer());

    await resend.emails.send({
      from: `Invoicerly <${process.env.EMAIL_FROM || "no-reply@invoicerly.co.uk"}>`,
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
    console.error("[INVOICE_SEND_ERROR]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
