import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: any) {
  const { id } = (params || {}) as { id: string };

  const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || "";
  const origin = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
  const url = `${origin}/s/${id}`;

  const isLocal = !process.env.AWS_REGION && process.env.NODE_ENV !== "production";
  const execPath = isLocal ? undefined : await chromium.executablePath();

  const browser = await puppeteer.launch({
    args: isLocal ? [] : chromium.args,
    defaultViewport: { width: 1240, height: 1754, deviceScaleFactor: 2 },
    executablePath: execPath,
    headless: chromium.headless,
  });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: ["domcontentloaded", "networkidle0"] });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "14mm", right: "14mm", bottom: "16mm", left: "14mm" },
      preferCSSPageSize: true,
    });
    // Convert Buffer to ArrayBuffer slice to satisfy Web Response types
    const arrayBuffer = pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength);
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${id || 'document'}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });

  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to render PDF" }, { status: 500 });
  } finally {
    try { await browser.close(); } catch {}
  }
}







