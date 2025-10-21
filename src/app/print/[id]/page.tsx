import { prisma } from '@/lib/prisma';
import InvoiceA4 from '@/components/pdf/InvoiceA4';
import { Invoice } from '@/types/invoice';

export const dynamic = 'force-dynamic';

export default async function PrintInvoicePage({ params, searchParams }: { params: Promise<any>, searchParams?: Promise<any> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id as string;
  const sp = (await (searchParams || Promise.resolve({}))) as any;
  const invoice = await prisma.invoice.findUnique({ where: { id }, include: { items: true, user: { include: { company: true } } } });
  if (!invoice) return <div className="p-6">Not found.</div>;
  const dueStr = (sp?.due as string) || (invoice.due ? new Date(invoice.due as any).toISOString().slice(0,10) : '');

  // Create Invoice object
  const pdfInvoice: Invoice = {
    company: {
      name: invoice.user.company?.name || '',
      vatNumber: invoice.user.company?.vat || undefined,
      address: invoice.user.company?.address1 || undefined,
      city: invoice.user.company?.city || undefined,
      country: invoice.user.company?.country || undefined,
      iban: invoice.user.company?.iban || undefined,
      bankName: (invoice.user.company as any)?.bankName || undefined,
      bic: invoice.user.company?.bic || undefined,
      logoUrl: (invoice.user.company as any)?.logoUrl || undefined,
      email: invoice.user.email || 'info@invoicerly.co.uk',
      phone: (invoice.user.company as any)?.phone || undefined,
    },
    client: {
      name: invoice.client,
      vatNumber: (invoice as any).clientMeta?.vat || undefined,
      address: (invoice as any).clientMeta?.address || undefined,
      city: (invoice as any).clientMeta?.city || undefined,
      country: (invoice as any).clientMeta?.country || undefined,
      email: (invoice as any).clientMeta?.email || undefined,
    },
    items: invoice.items.map(it => ({
      description: it.description,
      quantity: it.quantity,
      unitPrice: Number(it.rate),
      vatRate: it.tax,
    })),
    invoiceNumber: invoice.number,
    issueDate: new Date(invoice.date).toISOString().slice(0, 10),
    dueDate: dueStr,
    currency: invoice.currency,
    vatMode: 'Domestic',
    notes: '',
  };

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-none p-0 m-0">
        <InvoiceA4 invoice={pdfInvoice} />
      </main>
    </div>
  );
}
