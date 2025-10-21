import InvoiceA4 from '@/components/pdf/InvoiceA4';
import { Invoice } from '@/types/invoice';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

// Пропсы под Next 15: params/searchParams — Promise (исправлено для Vercel)
type SharedInvoicePageProps = {
  params: Promise<any>;
  // не используем, но оставляем для совместимости с общей сигнатурой
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SharedInvoicePage(props: SharedInvoicePageProps) {
  const params = await props.params;
  const id = params.id as string;

  const invoice = await prisma.invoice.findUnique({
   where: { id },
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
    notFound();
  }

  // Create Invoice object
  const pdfInvoice: Invoice = {
    company: {
      name: invoice.user?.company?.name || 'N/A',
      vatNumber: invoice.user?.company?.vat || undefined,
      address: invoice.user?.company?.address1 || undefined,
      city: invoice.user?.company?.city || undefined,
      country: invoice.user?.company?.country || undefined,
      iban: invoice.user?.company?.iban || undefined,
      bankName: invoice.user?.company?.bankName || undefined,
      bic: invoice.user?.company?.bic || undefined,
      logoUrl: invoice.user?.company?.logoUrl || undefined,
      email: invoice.user?.email || 'info@invoicerly.co.uk',
      phone: undefined,
    },
    client: {
      name: invoice.client,
      vatNumber: (invoice.clientMeta as any)?.vat || undefined,
      address: (invoice.clientMeta as any)?.address || undefined,
      city: (invoice.clientMeta as any)?.city || undefined,
      country: (invoice.clientMeta as any)?.country || undefined,
      email: (invoice.clientMeta as any)?.email || undefined,
    },
    items: invoice.items.map(it => ({
      description: it.description,
      quantity: it.quantity,
      unitPrice: it.rate.toNumber(),
      vatRate: it.tax,
    })),
    invoiceNumber: invoice.number,
    issueDate: new Date(invoice.date).toISOString().slice(0, 10),
    dueDate: invoice.due ? new Date(invoice.due).toISOString().slice(0, 10) : undefined,
    currency: invoice.currency,
    vatMode: 'Domestic',
    notes: '',
  };

  return (
    <main className="bg-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        <InvoiceA4 invoice={pdfInvoice} />
      </div>
    </main>
  );
}
