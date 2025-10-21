import PolicyPage from '@/components/policy/PolicyPage';
import { PolicySection } from '@/types/policy';

export const metadata = {
  title: 'Privacy Policy - Ventira',
  description: 'How Ventira collects, uses, and protects your personal data.',
};

const sections: PolicySection[] = [
  { 
    id: 'introduction', 
    title: 'Introduction', 
    body: `We value your privacy and are committed to handling personal data responsibly. This Privacy Policy explains what data we collect, why we process it, how long we retain it, who we share it with, and how you can exercise your rights in connection with the services provided at ventira.co.uk operated by VIARGAMING LTD, Company No. 15847699, registered office: 43 Victoria Rd, Northampton, United Kingdom, NN1 5ED ("Ventira," "we," "us," "our").

For questions or data requests, contact: info@ventira.co.uk or +44 7457 423147.

Who is the controller?

• We act as controller for account, billing, support, website and app usage data.

• We act as processor for Customer Content you input into the Service (e.g., invoice line items, your clients' names/addresses/emails, recipients) and process it on your documented instructions. A Data Processing Addendum (DPA) is available on request.` 
  },
  { 
    id: 'data-collection', 
    title: 'What Personal Data We Collect', 
    body: `We collect only what is necessary to operate and improve the Service:

• Account & Identity — name, email address, password hash, role/team, company profile, billing/postal address.

• Transactions — token top-ups, order references, invoice/receipt records, payment identifiers (we do not store full card details; payments are handled by our processors).

• Service Usage & Technical — IP address, device/browser type, access and event logs, timestamps, cookie IDs, error telemetry, security signals.

• Customer Content — invoice data you provide (your business details, recipients' names/emails/addresses, line items, taxes, numbers), file metadata and generated PDFs based on templates (CleanA4, Pro Ledger, Compact Fit, Modern Stripe, Nordic Grid, Bold Header, Minimal Mono, Business Portrait).

• Email Delivery Metadata — recipient addresses you choose to send to, message IDs, delivery status (sent/bounced/open where available), timestamps.

• Support & Correspondence — messages, attachments, case history.

• Marketing Preferences — opt-in/opt-out status, communication history.

We do not collect more information than required for the purposes below.` 
  },
  { 
    id: 'legal-bases', 
    title: 'Why We Process Your Data and Legal Bases', 
    body: `• Provide the Service (contract performance): create drafts, generate/store PDFs, send invoices by email, manage tokens and accounts, and communicate about service delivery.

• Payments & fraud prevention (legal obligation / legitimate interests): verify purchases, detect misuse, maintain accounting and tax records.

• Support, refunds, disputes (contract / legitimate interests).

• Improvements & security (legitimate interests): monitoring, debugging, aggregated/anonymous analytics, load balancing, access controls, abuse prevention.

• Marketing (consent): we send marketing messages only if you have opted in; you may withdraw consent at any time.

• Legal compliance (legal obligation): record-keeping, responding to lawful requests from authorities.

Where we rely on legitimate interests, we assess and balance them against your rights and reasonable expectations.` 
  },
  { 
    id: 'sharing', 
    title: 'Sharing and International Transfers', 
    body: `We share personal data with trusted service providers where necessary to operate the Service, for example:

• Payment processors and banks (billing, fraud checks).
• Hosting/cloud platforms (application hosting, storage, backups, CDN).
• Email delivery and communications tools (sending invoices/notifications, logging delivery).
• Analytics/monitoring/error-tracking tools.
• Professional advisers (legal/accounting) where needed.
• Regulators, courts or law enforcement where required by law.

Some providers may be located outside the UK/EEA. We rely on UK adequacy regulations, the UK International Data Transfer Addendum (IDTA) and/or Standard Contractual Clauses (SCCs), alongside appropriate supplementary measures. We do not transfer data in a way that reduces protections under applicable law.` 
  },
  { 
    id: 'cookies', 
    title: 'Cookies and Similar Technologies', 
    body: `We use cookies and similar technologies for essential operations, security, analytics and (with your consent) marketing. Essential cookies are required for the platform to function.

See our Cookies Policy for details and controls.` 
  },
  { 
    id: 'retention', 
    title: 'Data Retention', 
    body: `We retain data only as long as necessary for the stated purposes and legal obligations:

• Orders, invoices and payment logs: minimum 24 months, up to 6 years for tax, accounting or disputes.

• Account & support records: while your account is active and for a reasonable period thereafter for security, fraud prevention and record-keeping.

• Customer Content (drafts/PDFs): stored while you keep them in your workspace; temporary files created during generation may be deleted automatically after processing.

• Email delivery metadata: retained for a limited period to evidence delivery and troubleshoot deliverability.

• Marketing data: until you withdraw consent or we no longer have a lawful basis.

When data is no longer required, we securely delete or anonymise it.` 
  },
  { 
    id: 'responsibilities', 
    title: 'Your Responsibilities (Recipients\' Data)', 
    body: `You are responsible for ensuring you have a lawful basis (e.g., contract or legitimate interests) to use and send personal data of your invoice recipients through the Service and for providing any required privacy information to those recipients.` 
  },
  { 
    id: 'your-rights', 
    title: 'Your Rights', 
    body: `Under UK data-protection law, you may:

• Access your personal data;
• Rectify inaccurate data;
• Erase data in certain cases;
• Restrict processing;
• Object to processing based on legitimate interests or to direct marketing;
• Port data you provided in a structured, commonly used format;
• Withdraw consent where processing relies on consent.

To exercise your rights, email info@ventira.co.uk. We may need to verify your identity. We respond within statutory time limits (normally one month) unless an extension or lawful refusal applies.` 
  },
  { 
    id: 'security', 
    title: 'Security Measures', 
    body: `We implement appropriate technical and organisational measures, including encryption in transit, hardened infrastructure, access controls and least-privilege permissions, secure backups, audit logging and staff awareness.

No system is completely secure; if a breach occurs likely to affect your rights, we will notify you and the relevant regulator in accordance with law.` 
  },
  { 
    id: 'children', 
    title: 'Children', 
    body: `The Service is intended for users 18+. We do not knowingly collect personal data from children.` 
  },
  { 
    id: 'automated-decisions', 
    title: 'Automated Decision-Making and Profiling', 
    body: `We do not conduct automated decision-making that produces legal or similarly significant effects.

Limited automation (e.g., analytics, spam/abuse detection) may be used to protect and improve the Service and does not override your rights.` 
  },
  { 
    id: 'changes', 
    title: 'Changes to this Policy', 
    body: `We may revise this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on our website.

The updated Policy will display a new effective date.` 
  },
  { 
    id: 'contact', 
    title: 'Contact & Complaints', 
    body: `Controller: VIARGAMING LTD
Email: info@ventira.co.uk | Tel: +44 7457 423147
Address: 43 Victoria Rd, Northampton, United Kingdom, NN1 5ED

If you are not satisfied with how we handle your request, you can lodge a complaint with the Information Commissioner's Office (ICO): ico.org.uk | Tel: 0303 123 1113.

Nothing in this Policy affects your statutory rights.` 
  },
  { 
    id: 'company-details', 
    title: 'Company Details', 
    body: `VIARGAMING LTD
Company number: 15847699
Registered office: 43 Victoria Rd, Northampton, United Kingdom, NN1 5ED
Email: info@ventira.co.uk | Tel: +44 7457 423147` 
  },
];

export default function PrivacyPage() {
  return (
    <PolicyPage 
      title="Privacy Policy" 
      sections={sections}
      effectiveDate="21 Oct 2025"
      lastUpdated="21 Oct 2025"
      version="v1.0.0"
      showRegionToggle={false}
    />
  );
}
