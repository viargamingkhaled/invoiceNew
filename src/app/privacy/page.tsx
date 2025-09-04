import PolicyPage from '@/components/policy/PolicyPage';
import { PolicySection } from '@/types/policy';

export const metadata = {
  title: 'Privacy Policy - Invoicerly',
  description: 'How we collect, use, and protect personal data.',
};

const sections: PolicySection[] = [
  { id: 'intro', title: 'Introduction', body: 'How we collect, use, and protect personal data.' },
  { id: 'scope', title: 'Scope & Region', body: 'This policy applies to users in the UK and EU/EEA.' },
  { id: 'data', title: 'Data We Collect', body: 'Account, billing, product usage, and support data.' },
  { id: 'use', title: 'How We Use Data', body: 'Provide the service, billing, analytics, support, and security.' },
  { id: 'legal', title: 'Legal Bases (EU/UK)', body: 'Contract, legitimate interests, consent, legal obligation.' },
  { id: 'rights', title: 'Your Rights', body: 'Access, rectify, erase, restrict, portability, object.' },
  { id: 'security', title: 'Security', body: 'Administrative, technical, and organizational measures.' },
  { id: 'retention', title: 'Retention', body: 'We keep data only as long as necessary for stated purposes.' },
  { id: 'sharing', title: 'Sharing & Processors', body: 'We use carefully selected sub-processors for core features.' },
  { id: 'cookies', title: 'Cookies', body: 'See Cookie Policy for details; manage preferences in app.' },
  { id: 'contact', title: 'Contact', body: 'Email: info@mail.com. We reply within one business day.' },
];

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy Policy" sections={sections} />
  );
}
