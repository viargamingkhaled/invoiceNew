import InvoiceA4 from '@/components/pdf/InvoiceA4';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

// Тип для пропсов, соответствующий Next.js 15
type SharedInvoicePageProps = {
  params: {
    id: string;
  };
};

// Функция теперь `async`, чтобы использовать `await`
export default async function SharedInvoicePage({ params }: SharedInvoicePageProps) {
  // `params` больше не Promise здесь, так как Next.js обрабатывает это для страниц
  const { id } = params;

  const invoice = await prisma.invoice.findUnique({
    where: { id: id },
    include: {
      user: {
        include: {
          company: true,
        },
      },
      items: true,
    },
  });

  if (!invoice) {
    // Используем стандартный `notFound` из Next.js для отображения 404
    notFound();
  }

  return (
    <main className="bg-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        <InvoiceA4
            currency={invoice.currency}
            items={invoice.items.map(it => ({
              desc: it.description,
              qty: it.quantity,
              rate: it.rate.toNumber(),
              tax: it.tax
            }))}
            subtotal={invoice.subtotal.toNumber()}
            taxTotal={invoice.tax.toNumber()}
            total={invoice.total.toNumber()}
            sender={{
              company: invoice.user?.company?.name || 'N/A',
              vat: invoice.user?.company?.vat || undefined,
              address: invoice.user?.company?.address1 || undefined,
              city: invoice.user?.company?.city || undefined,
              country: invoice.user?.company?.country || undefined,
              iban: invoice.user?.company?.iban || undefined,
              bankName: invoice.user?.company?.bankName || undefined,
              bic: invoice.user?.company?.bic || undefined
            }}
            client={{
              name: invoice.client,
              vat: (invoice.clientMeta as any)?.vat || undefined,
              address: (invoice.clientMeta as any)?.address || undefined,
              city: (invoice.clientMeta as any)?.city || undefined,
              country: (invoice.clientMeta as any)?.country || undefined,
            }}
            invoiceNo={invoice.number}
            invoiceDate={new Date(invoice.date).toISOString().slice(0, 10)}
            invoiceDue={invoice.due ? new Date(invoice.due).toISOString().slice(0, 10) : ''}
            notes={''}
          />
      </div>
    </main>
  );
}
