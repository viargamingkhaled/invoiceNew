import ContactForm from '@/components/contact/ContactForm';
import Section from '@/components/layout/Section';
import Pill from '@/components/policy/Pill';
import Card from '@/components/ui/Card';

export const metadata = {
  title: 'Contact - Ventira',
  description: 'Get in touch with sales, support, or billing.',
};

export default function ContactPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <Section className="py-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2">
            <Pill>UK-first</Pill>
            <Pill>EU-ready</Pill>
            <Pill>Avg. reply: 1 business day</Pill>
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-slate-900">Contact us</h1>
          <p className="mt-3 text-slate-600 text-lg">We're here to help with sales, support, and billing.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

            <div className="space-y-6">
              <Card className="p-6" padding="md">
                <h3 className="text-base font-semibold">Contact details</h3>
                <div className="mt-3 grid gap-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between"><div>Support</div><a className="underline" href="mailto:info@ventira.co.uk">info@ventira.co.uk</a></div>
                  <div className="flex items-center justify-between"><div>Phone</div><a className="underline" href="tel:+447457423147">+44 7457 423147</a></div>
                </div>
                <div className="mt-4 text-xs text-slate-500">Hours: Mon-Fri, 09:00-18:00 (UK). Limited support on EU public holidays.</div>
              </Card>

              <Card className="p-6" padding="md">
                <h3 className="text-base font-semibold">Offices</h3>
                <div className="mt-3 grid gap-4 text-sm text-slate-700">
                  <div>
                    <div className="font-medium">United Kingdom (Primary)</div>
                    <div>VIARGAMING LTD</div>
                    <div>Company number 15847699</div>
                    <div>43 Victoria Rd,<br/>Northampton, United Kingdom, NN1 5ED</div>
                  </div>
                </div>
                <div className="mt-4 h-40 rounded-xl overflow-hidden border border-black/10">
                  <iframe
                    title="Ventira Office Location"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=43%20Victoria%20Rd%2C%20Northampton%2C%20United%20Kingdom%2C%20NN1%205ED&output=embed"
                  />
                </div>
              </Card>
            </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <Card className="p-4" padding="sm"><div className="text-sm font-medium">Sales</div><div className="text-slate-600 text-sm mt-1">Demos, quotes, volume pricing.</div></Card>
          <Card className="p-4" padding="sm"><div className="text-sm font-medium">Support</div><div className="text-slate-600 text-sm mt-1">Product questions & bug reports.</div></Card>
          <Card className="p-4" padding="sm"><div className="text-sm font-medium">Billing</div><div className="text-slate-600 text-sm mt-1">Invoices, VAT, refunds.</div></Card>
        </div>
      </Section>
    </main>
  );
}
