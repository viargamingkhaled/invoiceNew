import { prisma } from '@/lib/prisma';
import InvoicePaper from '@/components/generator/InvoicePaper';

export default async function SharedInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) return <div className="max-w-5xl mx-auto p-6">Not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-sm text-slate-600">Public share link — read only</div>
        <InvoicePaper
          currency={invoice.currency}
          items={[]}
          subtotal={invoice.subtotal}
          taxTotal={invoice.tax}
          total={invoice.total}
          sender={{ company: '—', vat: '', address: '', city: '', country: '', iban: '' }}
          client={{ name: invoice.client, vat: '', address: '', city: '', country: '' }}
          invoiceNo={invoice.number}
          invoiceDate={new Date(invoice.date).toISOString().slice(0,10)}
          invoiceDue={''}
          notes={''}
        />
      </main>
    </div>
  );
}

