import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Ventira - VAT-aware invoicing for UK & EU',
  description: 'Learn about Ventira\'s token-based invoice generation service. Simple, fast, compliant invoicing with pay-as-you-go pricing and privacy-by-design.',
  keywords: 'about Ventira, invoice generation, UK VAT, EU VAT, token pricing, privacy, security',
  openGraph: {
    title: 'About Ventira - VAT-aware invoicing for UK & EU',
    description: 'Learn about Ventira\'s token-based invoice generation service. Simple, fast, compliant invoicing with pay-as-you-go pricing.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Ventira",
            "legalName": "VIARGAMING LTD",
            "identifier": {
              "@type": "PropertyValue",
              "propertyID": "Company Number",
              "value": "15847699"
            },
            "url": "https://ventira.co.uk",
            "logo": "https://ventira.co.uk/logo.png",
            "description": "VAT-aware invoice generation service for UK and EU businesses with token-based pricing",
            "foundingDate": "2024",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Flat 21 County Chambers, 1 Drapery",
              "addressLocality": "Northampton",
              "postalCode": "NN1 2ET",
              "addressCountry": "GB"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@ventira.co.uk",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://ventira.co.uk"
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Ventira",
            "url": "https://ventira.co.uk",
            "description": "Create professional invoices in 30 seconds. VAT-aware templates, multi-currency, live preview, and one-click sending.",
            "publisher": {
              "@type": "Organization",
              "name": "Ventira"
            }
          })
        }}
      />
      <AboutPageClient />
    </>
  );
}
