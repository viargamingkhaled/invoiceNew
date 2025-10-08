import { Metadata } from 'next';
import SecurityPageClient from './SecurityPageClient';

export const metadata: Metadata = {
  title: 'Security & Trust Center | Invoicerly',
  description: 'How Invoicerly protects your data: encryption, access controls, monitoring, backups, and incident response. UK-first · EU-ready.',
  keywords: 'security, data protection, encryption, GDPR, UK GDPR, privacy, trust, compliance',
  openGraph: {
    title: 'Security & Trust Center | Invoicerly',
    description: 'Our approach to security, privacy-by-design, and operational excellence.',
    type: 'website',
    url: 'https://www.invoicerly.co.uk/security',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Trust Center | Invoicerly',
    description: 'Our approach to security, privacy-by-design, and operational excellence.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Security & Trust Center",
            "description": "Overview of Invoicerly security controls and trust commitments.",
            "url": "https://www.invoicerly.co.uk/security",
            "about": { "@type": "Organization", "name": "Invoicerly" },
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
      <SecurityPageClient />
    </>
  );
}
