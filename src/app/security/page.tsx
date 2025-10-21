import { Metadata } from 'next';
import SecurityPageClient from './SecurityPageClient';

export const metadata: Metadata = {
  title: 'Security & Trust Center | Ventira',
  description: 'How Ventira protects your data: encryption, access controls, monitoring, backups, and incident response. UK-first · EU-ready.',
  keywords: 'security, data protection, encryption, GDPR, UK GDPR, privacy, trust, compliance',
  openGraph: {
    title: 'Security & Trust Center | Ventira',
    description: 'Our approach to security, privacy-by-design, and operational excellence.',
    type: 'website',
    url: 'https://www.ventira.co.uk/security',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Trust Center | Ventira',
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
            "description": "Overview of Ventira security controls and trust commitments.",
            "url": "https://www.ventira.co.uk/security",
            "about": { "@type": "Organization", "name": "Ventira" },
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
      <SecurityPageClient />
    </>
  );
}
