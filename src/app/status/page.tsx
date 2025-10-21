import { Metadata } from 'next';
import StatusPageClient from './StatusPageClient';

export const metadata: Metadata = {
  title: 'Service Status | Ventira',
  description: 'Real-time status of Ventira services: availability, uptime, incidents, and scheduled maintenance.',
  keywords: 'status, uptime, incidents, maintenance, availability, service status, system health',
  openGraph: {
    title: 'Service Status | Ventira',
    description: 'Live component status, incident history, and 90-day uptime metrics.',
    type: 'website',
    url: 'https://www.ventira.co.uk/status',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Status | Ventira',
    description: 'Live component status, incident history, and 90-day uptime metrics.',
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
            "description": "Public status page for Ventira services.",
            "url": "https://www.ventira.co.uk/status",
            "lastReviewed": "2025-10-21",
            "publisher": {
              "@type": "Organization",
              "name": "Ventira",
              "legalName": "VIARGAMING LTD",
              "identifier": {
                "@type": "PropertyValue",
                "propertyID": "Company Number",
                "value": "15847699"
              }
            }
          })
        }}
      />
      <StatusPageClient />
    </>
  );
}
