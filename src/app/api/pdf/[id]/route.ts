import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// Switched to Browserless Cloud to avoid Chromium issues on Vercel

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<any> }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id as string;
    console.log(`[PDF_API] Generating PDF for invoice ${id}`);
    
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const origin = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
    const urlObj = new URL(req.url);
    const due = urlObj.searchParams.get('due');
    const template = urlObj.searchParams.get('template');
    const queryParams = new URLSearchParams();
    if (due) queryParams.append('due', due);
    if (template) queryParams.append('template', template);
    const q = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const url = `${origin}/print/${id}${q}`;
    
    console.log(`[PDF_API] Base URL: ${baseUrl}`);
    console.log(`[PDF_API] Origin: ${origin}`);
    console.log(`[PDF_API] Template: ${template || 'default'}`);
    console.log(`[PDF_API] Print URL: ${url}`);

    // Render the /print page via Browserless Cloud (new REST base)
    const token = process.env.BROWSERLESS_TOKEN;
    const base = process.env.BROWSERLESS_BASE_URL || 'https://production-sfo.browserless.io';
    if (!token) return NextResponse.json({ error: 'Missing BROWSERLESS_TOKEN env' }, { status: 500 });

    const blRes = await fetch(`${base}/pdf?token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
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
      return NextResponse.json({ error: 'Browserless PDF failed', details: msg }, { status: 500 });
    }

    const pdfArrayBuffer = await blRes.arrayBuffer();
    const fileName = `invoice-${id || 'document'}.pdf`;
    return new Response(pdfArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e: any) {
    console.error(`[PDF_API] Error:`, e);
    return NextResponse.json({ 
      error: e?.message || 'Failed to render PDF',
      details: e?.stack || 'No stack trace available'
    }, { status: 500 });
  }
}

