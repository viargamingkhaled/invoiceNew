import { prisma } from '@/lib/prisma';
import InvoicePaper from '@/components/generator/InvoicePaper';

export default async function SharedInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({ where: { id }, include: { items: true, user: { include: { company: true } } } });
  if (!invoice) return <div className="max-w-5xl mx-auto p-6">Not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-sm text-slate-600">Freelance template — public share link (read‑only)</div>
        <InvoicePaper
          currency={invoice.currency}
          items={invoice.items.map(it => ({ desc: it.description, qty: it.quantity, rate: it.rate, tax: it.tax })) as any}
          subtotal={invoice.subtotal}
          taxTotal={invoice.tax}
          total={invoice.total}
          sender={{ company: invoice.user.company?.name || '—', vat: invoice.user.company?.vat || '', address: invoice.user.company?.address1 || '', city: invoice.user.company?.city || '', country: invoice.user.company?.country || '', iban: invoice.user.company?.iban || '' }}
          client={{ name: invoice.client, vat: (invoice.clientMeta as any)?.vat || '', address: (invoice.clientMeta as any)?.address || '', city: (invoice.clientMeta as any)?.city || '', country: (invoice.clientMeta as any)?.country || '' }}
          invoiceNo={invoice.number}
          invoiceDate={new Date(invoice.date).toISOString().slice(0,10)}
          invoiceDue={''}
          notes={''}
        />
      </main>
    </div>
  );
}
