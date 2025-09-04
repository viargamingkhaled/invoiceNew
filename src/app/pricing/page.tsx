import PricingClient from './pricingClient';

export const metadata = {
  title: 'Pricing - Invoicerly',
  description: 'Simple pricing for UK/EU with transparent VAT estimation.',
};

export default function PricingPage() {
  return <PricingClient />;
}
