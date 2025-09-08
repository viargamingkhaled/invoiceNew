import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const company = String(body.company || '').trim();
    const country = String(body.country || '').trim();
    const topic = String(body.topic || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.EMAIL_FROM || user || 'no-reply@invoicerly.co.uk';
    const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@invoicerly.co.uk';

    if (!host || !user || !pass) {
      return NextResponse.json({ error: 'Email is not configured on the server.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `[Contact] ${topic || 'General'} — ${name}`;
    const text = `New contact submission\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nCountry: ${country}\nTopic: ${topic}\n\nMessage:\n${message}`;

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      replyTo: email,
    });

    const id = `REQ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    return NextResponse.json({ ok: true, id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to send message' }, { status: 500 });
  }
}

