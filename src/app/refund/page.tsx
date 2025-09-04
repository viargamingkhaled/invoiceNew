import PolicyPage from '@/components/policy/PolicyPage';
import { PolicySection } from '@/types/policy';

export const metadata = {
  title: 'Refund & Cancellation Policy - Invoicerly',
  description: 'How refunds and cancellations work.',
};

const sections: PolicySection[] = [
  { id: 'intro', title: 'Introduction', body: 'How refunds and cancellations work.' },
  { id: 'trials', title: 'Trials & Renewals', body: 'Trials, auto-renewal, and how to turn off renewal.' },
  { id: 'refunds', title: 'Refunds', body: 'When we refund and how long processing takes.' },
  { id: 'eu_rights', title: 'EU/UK Consumer Rights', body: 'Statutory rights and exceptions for digital services.' },
  { id: 'contact', title: 'Contact', body: 'Email: info@mail.com.' },
];

export default function RefundPage() {
  return (
    <PolicyPage title="Refund & Cancellation Policy" sections={sections} />
  );
}
