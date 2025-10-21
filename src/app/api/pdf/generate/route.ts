import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// Switched to Browserless Cloud to avoid Chromium issues on Vercel

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/pdf/generate
 * Generates PDF from invoice data without saving to database
 * Professional approach: server-side rendering with Puppeteer
 */
export async function POST(req: Request) {
  try {
    console.log(`[PDF_GENERATE] Starting PDF generation`);
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { invoice, template } = body;
    
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice data required' }, { status: 400 });
    }

    console.log(`[PDF_GENERATE] Template: ${template || 'default'}`);
    console.log(`[PDF_GENERATE] Invoice number: ${invoice.invoiceNumber}`);

    // Build HTML and send to Browserless Cloud
    const html = generateInvoiceHTML(invoice, template);
    const token = process.env.BROWSERLESS_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Missing BROWSERLESS_TOKEN env' }, { status: 500 });
    }

    const url = `https://chrome.browserless.io/pdf?token=${token}`;
    const blRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html,
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
    const fileName = `invoice-${invoice.invoiceNumber || 'document'}.pdf`;
    return new Response(pdfArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e: any) {
    console.error(`[PDF_GENERATE] Error:`, e);
    return NextResponse.json({ 
      error: e?.message || 'Failed to generate PDF',
      details: e?.stack || 'No stack trace available'
    }, { status: 500 });
  }
}

/**
 * Generate HTML for different invoice templates
 */
function generateInvoiceHTML(invoice: any, template?: string): string {
  // Import styles - we'll inline them for Puppeteer
  const baseStyles = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.5;
        color: #0B1221;
        background: white;
      }
      .a4 {
        width: 210mm;
        min-height: 297mm;
        padding: 10mm;
        margin: 0 auto;
        background: white;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 20px;
      }
      .logo {
        height: 40px;
        width: auto;
        object-fit: contain;
      }
      .company-info {
        text-align: right;
        font-size: 11px;
        color: #6B7280;
      }
      .invoice-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .invoice-meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 30px;
        font-size: 12px;
      }
      .section-title {
        font-weight: 600;
        margin-bottom: 8px;
        color: #0B1221;
      }
      .client-info {
        color: #6B7280;
      }
      .items-table {
        width: 100%;
        border-collapse: collapse;
        margin: 30px 0;
        font-size: 12px;
      }
      .items-table th {
        background: #F6F7F8;
        padding: 10px;
        text-align: left;
        font-weight: 600;
        border-bottom: 2px solid #E5E7EB;
      }
      .items-table td {
        padding: 10px;
        border-bottom: 1px solid #E5E7EB;
      }
      .items-table tr:last-child td {
        border-bottom: none;
      }
      .text-right {
        text-align: right;
      }
      .totals {
        margin-left: auto;
        width: 300px;
        margin-top: 20px;
      }
      .totals-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 13px;
      }
      .totals-row.total {
        font-weight: bold;
        font-size: 16px;
        border-top: 2px solid #0B1221;
        margin-top: 8px;
        padding-top: 12px;
      }
      .notes {
        margin-top: 40px;
        padding: 15px;
        background: #F6F7F8;
        border-radius: 8px;
        font-size: 11px;
        color: #6B7280;
      }
      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 10px;
        color: #9CA3AF;
        padding-top: 20px;
        border-top: 1px solid #E5E7EB;
      }
    </style>
  `;

  // Calculate totals
  const items = invoice.items || [];
  let subtotal = 0;
  let taxTotal = 0;

  items.forEach((item: any) => {
    const lineTotal = item.quantity * item.unitPrice;
    subtotal += lineTotal;
    taxTotal += (lineTotal * item.vatRate) / 100;
  });

  const total = subtotal + taxTotal;
  const currency = invoice.currency || 'GBP';

  // Format currency
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Build HTML
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice ${invoice.invoiceNumber}</title>
      ${baseStyles}
    </head>
    <body>
      <div class="a4">
        <!-- Header -->
        <div class="header">
          <div>
            ${invoice.company.logoUrl ? `<img src="${invoice.company.logoUrl}" alt="Logo" class="logo" />` : ''}
            <div style="margin-top: 10px;">
              <div style="font-weight: 600; font-size: 14px;">${invoice.company.name || ''}</div>
              ${invoice.company.vatNumber ? `<div style="font-size: 11px; color: #6B7280;">VAT: ${invoice.company.vatNumber}</div>` : ''}
            </div>
          </div>
          <div class="company-info">
            ${invoice.company.address ? `<div>${invoice.company.address}</div>` : ''}
            ${invoice.company.city ? `<div>${invoice.company.city}</div>` : ''}
            ${invoice.company.country ? `<div>${invoice.company.country}</div>` : ''}
            ${invoice.company.email ? `<div>${invoice.company.email}</div>` : ''}
            ${invoice.company.phone ? `<div>${invoice.company.phone}</div>` : ''}
          </div>
        </div>

        <!-- Invoice Title -->
        <div class="invoice-title">INVOICE</div>

        <!-- Invoice Meta & Client Info -->
        <div class="invoice-meta">
          <div>
            <div class="section-title">Bill To:</div>
            <div class="client-info">
              <div style="font-weight: 600; color: #0B1221; margin-bottom: 4px;">${invoice.client.name || ''}</div>
              ${invoice.client.address ? `<div>${invoice.client.address}</div>` : ''}
              ${invoice.client.city ? `<div>${invoice.client.city}</div>` : ''}
              ${invoice.client.country ? `<div>${invoice.client.country}</div>` : ''}
              ${invoice.client.vatNumber ? `<div>VAT: ${invoice.client.vatNumber}</div>` : ''}
              ${invoice.client.email ? `<div>${invoice.client.email}</div>` : ''}
            </div>
          </div>
          <div>
            <div class="section-title">Invoice Details:</div>
            <div class="client-info">
              <div>Number: <strong>${invoice.invoiceNumber || ''}</strong></div>
              <div>Issue Date: <strong>${invoice.issueDate || ''}</strong></div>
              ${invoice.dueDate ? `<div>Due Date: <strong>${invoice.dueDate}</strong></div>` : ''}
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Unit Price</th>
              <th class="text-right">VAT %</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item: any) => {
              const lineTotal = item.quantity * item.unitPrice;
              return `
                <tr>
                  <td>${item.description || ''}</td>
                  <td class="text-right">${item.quantity || 0}</td>
                  <td class="text-right">${formatMoney(item.unitPrice || 0)}</td>
                  <td class="text-right">${item.vatRate || 0}%</td>
                  <td class="text-right">${formatMoney(lineTotal)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <!-- Totals -->
        <div class="totals">
          <div class="totals-row">
            <span>Subtotal:</span>
            <span>${formatMoney(subtotal)}</span>
          </div>
          <div class="totals-row">
            <span>VAT:</span>
            <span>${formatMoney(taxTotal)}</span>
          </div>
          <div class="totals-row total">
            <span>Total:</span>
            <span>${formatMoney(total)}</span>
          </div>
        </div>

        <!-- Notes -->
        ${invoice.notes ? `
          <div class="notes">
            <div style="font-weight: 600; margin-bottom: 8px;">Notes & Terms:</div>
            <div>${invoice.notes}</div>
          </div>
        ` : ''}

        <!-- Bank Details -->
        ${invoice.company.iban ? `
          <div class="notes" style="margin-top: 20px;">
            <div style="font-weight: 600; margin-bottom: 8px;">Payment Details:</div>
            <div>IBAN: ${invoice.company.iban}</div>
            ${invoice.company.bankName ? `<div>Bank: ${invoice.company.bankName}</div>` : ''}
            ${invoice.company.bic ? `<div>BIC/SWIFT: ${invoice.company.bic}</div>` : ''}
          </div>
        ` : ''}

        <!-- Footer -->
        <div class="footer">
          This invoice is generated electronically and is valid without a signature.
        </div>
      </div>
    </body>
    </html>
  `;
}

