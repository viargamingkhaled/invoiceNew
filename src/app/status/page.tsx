import { Metadata } from 'next';
import StatusPageClient from './StatusPageClient';

export const metadata: Metadata = {
  title: 'Service Status | Invoicerly',
  description: 'Live view of Invoicerly availability, uptime, incidents, and maintenance.',
  keywords: 'status, uptime, incidents, maintenance, availability, service status',
  openGraph: {
    title: 'Service Status | Invoicerly',
    description: 'Current component status, incident history, and uptime charts.',
    type: 'website',
    url: 'https://www.invoicerly.co.uk/status',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Status | Invoicerly',
    description: 'Current component status, incident history, and uptime charts.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StatusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Service Status",
            "description": "Public status page for Invoicerly services.",
            "url": "https://www.invoicerly.co.uk/status",
            "lastReviewed": "2025-10-08",
            "publisher": {
              "@type": "Organization",
              "name": "Invoicerly",
              "legalName": "GET STUFFED LTD",
              "identifier": {
                "@type": "PropertyValue",
                "propertyID": "Company Number",
                "value": "15673179"
              }
            }
          })
        }}
      />
      <StatusPageClient />
    </>
  );
}
