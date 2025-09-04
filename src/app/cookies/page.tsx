import PolicyPage from '@/components/policy/PolicyPage';
import { PolicySection } from '@/types/policy';

export const metadata = {
  title: 'Cookie Policy - Invoicerly',
  description: 'What cookies are and why we use them.',
};

const sections: PolicySection[] = [
  { id: 'intro', title: 'Introduction', body: 'What cookies are and why we use them.' },
  { id: 'types', title: 'Types of Cookies', body: 'Strictly necessary, performance, functionality, targeting.' },
  { id: 'prefs', title: 'Managing Preferences', body: 'Change consent in app settings or browser controls.' },
  { id: 'duration', title: 'Duration', body: 'Session vs persistent lifetimes.' },
  { id: 'contact', title: 'Contact', body: 'Email: info@mail.com.' },
];

export default function CookiesPage() {
  return (
    <PolicyPage title="Cookie Policy" sections={sections} />
  );
}
