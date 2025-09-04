import PolicyPage from '@/components/policy/PolicyPage';
import { PolicySection } from '@/types/policy';

export const metadata = {
  title: 'Terms of Service - Invoicerly',
  description: 'Your agreement with us to use the service.',
};

const sections: PolicySection[] = [
  { id: 'intro', title: 'Introduction', body: 'Your agreement with us to use the service.' },
  { id: 'eligibility', title: 'Eligibility & Account', body: 'You must provide accurate information and keep credentials secure.' },
  { id: 'use', title: 'Acceptable Use', body: 'No illegal, harmful, or abusive behavior; respect IP rights.' },
  { id: 'billing', title: 'Billing & Taxes', body: 'Subscriptions, trials, renewals, and VAT invoicing.' },
  { id: 'cancellation', title: 'Cancellation & Termination', body: 'How to cancel and what happens to data.' },
  { id: 'liability', title: 'Limitation of Liability', body: 'The service is provided as-is within lawful limits.' },
  { id: 'law', title: 'Governing Law', body: 'As per region (UK/EU) shown above.' },
  { id: 'contact', title: 'Contact', body: 'Email: info@mail.com for any questions.' },
];

export default function TermsPage() {
  return (
    <PolicyPage title="Terms of Service" sections={sections} />
  );
}
