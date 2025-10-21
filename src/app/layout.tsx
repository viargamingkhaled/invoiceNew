import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthProvider from '@/components/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Ventira - Create invoices in 30 seconds',
  description: 'VAT-aware templates, multi-currency, live preview, and one-click sending. Simple. Fast. Compliant.',
  keywords: 'invoice, invoicing, VAT, UK, EU, PDF, business, accounting',
  authors: [{ name: 'Ventira Team' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Ventira - Create invoices in 30 seconds',
    description: 'VAT-aware templates, multi-currency, live preview, and one-click sending.',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ventira - Create invoices in 30 seconds',
    description: 'VAT-aware templates, multi-currency, live preview, and one-click sending.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
