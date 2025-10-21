import PolicyPage from '@/components/policy/PolicyPage';
import { PolicySection } from '@/types/policy';

export const metadata = {
  title: 'Terms & Conditions - Ventira',
  description: 'Terms and conditions governing the use of Ventira invoice generation services.',
};

const sections: PolicySection[] = [
  { 
    id: 'general', 
    title: 'General Provisions', 
    body: `1.1. These Terms and Conditions ("Terms") govern access to and use of ventira.co.uk and the related online services for generating and sending invoices (the "Service") operated by VIARGAMING LTD, Company No. 15847699, registered office: 43 Victoria Rd, Northampton, United Kingdom, NN1 5ED ("Company," "we," "us," "our").

1.2. By visiting the Site, creating an invoice draft, topping up tokens, or using any feature of the Service, you ("you," the "Client") agree to be bound by these Terms. If you do not agree, do not use the Service.` 
  },
  { 
    id: 'definitions', 
    title: 'Definitions', 
    body: `• Services — web tools that allow you to create, edit, export, and send invoices (PDF export and email dispatch), choose from eight templates (CleanA4, Pro Ledger, Compact Fit, Modern Stripe, Nordic Grid, Bold Header, Minimal Mono, Business Portrait), store records, and manage related operations.

• Draft — a preliminary invoice you compose in the interface.

• Final File — the generated invoice in PDF format downloaded by you or sent by email through the Service.

• Tokens — internal credits used to pay for features within the Service. Tokens are purchased as top-ups and do not expire.

• Consumer — a natural person acting for purposes wholly or mainly outside their trade, business, craft, or profession.

• Business User — any user acting for business purposes.` 
  },
  { 
    id: 'eligibility', 
    title: 'Eligibility, Accounts, and Security', 
    body: `3.1. To register or purchase Tokens, you must be 18+ or an authorised representative of a legal entity.

3.2. You agree to provide accurate registration details and keep them up to date.

3.3. You are responsible for safeguarding your credentials and for all activity under your account. Notify us immediately at info@ventira.co.uk of any unauthorised use or security incident.` 
  },
  { 
    id: 'acceptable-use', 
    title: 'Acceptable Use', 
    body: `4.1. You must use the Service lawfully and ethically. Prohibited uses include:

(a) creating fraudulent, misleading, or sham invoices;
(b) impersonation or unauthorised use of third-party data;
(c) sending spam, phishing, threats, or harassment via email features;
(d) attempting to bypass security, reverse-engineer, scrape at scale, or overload the platform;
(e) using the Service for illegal transactions or to disguise proceeds of crime.

4.2. We may suspend or terminate accounts involved in the above, investigate suspected abuse, and cooperate with law enforcement where required.` 
  },
  { 
    id: 'payments', 
    title: 'Ordering, Tokens, and Payments', 
    body: `5.1. Token top-ups are offered as one-time purchases: Beginner (£10), Pro (£50), Business (£100), and Custom (user-defined amount). Prices are shown in GBP; indicative equivalents may be displayed in other currencies.

5.2. Payments are processed by third-party providers. Available methods: Visa and Mastercard. Access to paid features becomes available after successful settlement.

5.3. Indicative reference rate: 100 Tokens = £1.00 / €1.16 / $1.27 / 5.12 PLN / 29.80 CZK. Displayed equivalents are for convenience only and may vary due to FX and provider fees.

5.4. Token consumption. Unless otherwise stated in the interface, generating one Final File costs 10 Tokens. If the UI indicates that email dispatch consumes additional Tokens, those are charged separately and shown before you confirm the action.

5.5. Tokens do not expire, are not legal tender, are non-transferable between users, and hold no cash value outside the Service. Tokens cannot be redeemed for cash.

5.6. In case of suspected fraud, chargeback, or payment reversal, we may freeze or deduct Tokens, suspend the account, and request verification.

5.7. Taxes and payment-provider fees may apply according to law and provider terms.` 
  },
  { 
    id: 'service-delivery', 
    title: 'Service Delivery (Drafts, PDFs, Email)', 
    body: `6.1. Drafts and Final Files are generated automatically once the required Tokens are deducted.

6.2. You must review the Final File immediately upon generation and before sending it to third parties.

6.3. Email dispatch occurs on your instruction. We do not guarantee third-party deliverability (spam filters, mailbox limits, throttling, incorrect addresses). If sending fails due to reasons beyond our control, we may allow re-send attempts or regeneration of the file; refunds are governed by Section 7.

6.4. The Service is a tool; you remain solely responsible for the accuracy of invoices, lawful use, and regulatory/tax compliance (e.g., VAT, invoice numbering, mandatory disclosures).` 
  },
  { 
    id: 'refunds', 
    title: 'Cancellations and Refunds', 
    body: `7.1. Unused Tokens (Consumers only). If you are a Consumer purchasing remotely, you may cancel a Token purchase within 14 days of the transaction provided none of the Tokens have been used. Where applicable, refunds are issued minus non-recoverable payment-provider fees.

7.2. Spent Tokens are non-refundable. Tokens consumed for generation or email features cannot be returned.

7.3. Service faults. If a significant technical fault attributable to us prevents generation or results in materially corrupted output, we will, at our discretion, (i) regenerate the file, or (ii) credit/refund the Tokens used for that action.

7.4. Refunds are made to the original payment method where possible. We may request reasonable information to verify the requester and prevent fraud.

7.5. Business Users. Statutory cooling-off rights for Consumers do not apply to Business Users.` 
  },
  { 
    id: 'intellectual-property', 
    title: 'Intellectual Property and Template Licence', 
    body: `8.1. Your content. You retain all rights to data you input (business details, line items, and logos you own). You grant us a limited licence to process that content solely to provide the Service and to maintain audit and delivery logs.

8.2. Our materials. The Site, code, designs, templates, and documentation are our or our licensors' intellectual property. We grant you a personal, non-exclusive, non-transferable licence to use the invoice templates to generate your own invoices via the Service.

8.3. You must not copy, resell, sublicense, or redistribute templates or Service elements outside the platform.` 
  },
  { 
    id: 'privacy', 
    title: 'Privacy, Confidentiality, and Data Handling', 
    body: `9.1. We process personal data under UK GDPR and the Data Protection Act 2018. See our Privacy Policy for details on purposes, lawful bases, retention, and your rights.

9.2. Content you save remains in your account until you delete it or your account is closed. We may retain limited system and delivery logs (e.g., timestamps, recipient addresses, status codes) for security, billing, and legal compliance.

9.3. We apply reasonable technical and organisational measures appropriate to the risk. For high-level measures, see our Security page (if available).` 
  },
  { 
    id: 'warranties', 
    title: 'Warranties and Disclaimers', 
    body: `10.1. We will provide the Service with reasonable care and skill and substantially as described.

10.2. Except as set out above, the Service is provided "as is" and "as available." We do not warrant uninterrupted or error-free operation or specific email deliverability.

10.3. We do not provide accounting, tax, or legal advice and do not guarantee that any invoice meets jurisdiction-specific formalities. You are responsible for compliance and outcomes.` 
  },
  { 
    id: 'liability', 
    title: 'Limitation of Liability', 
    body: `11.1. Nothing in these Terms limits liability that cannot be limited by law (e.g., fraud, death or personal injury caused by negligence).

11.2. We are not liable for indirect or consequential loss, including lost profit, revenue, business, goodwill, or data.

11.3. Our aggregate liability for all claims arising out of or in connection with the Service shall not exceed the amount you paid for the Token package used for the specific action giving rise to the claim, or, if none, the total fees paid by you to us in the 12 months preceding the event.` 
  },
  { 
    id: 'indemnity', 
    title: 'Indemnity', 
    body: `You agree to indemnify and hold us harmless from claims, damages, and costs (including reasonable legal fees) arising from:

(a) your breach of these Terms;
(b) your unauthorised or unlawful use of third-party data;
(c) invoices you generate or emails you send via the Service.` 
  },
  { 
    id: 'third-party', 
    title: 'Third-Party Services and Links', 
    body: `The Site may reference or integrate third-party services (e.g., payment processors, email providers). We are not responsible for third-party content, availability, or terms. Your use of them is governed by their respective policies.` 
  },
  { 
    id: 'termination', 
    title: 'Suspension and Termination', 
    body: `14.1. We may suspend or terminate access if you breach these Terms, engage in fraud, pose a security or legal risk, or if we are required to do so by law.

14.2. Termination does not affect accrued rights or obligations. We may retain minimal records as required by law.

14.3. Upon termination, any unspent Tokens in accounts involved in fraud, chargeback, or unlawful conduct may be withheld or cancelled where permitted by law.` 
  },
  { 
    id: 'changes', 
    title: 'Changes to the Service and to These Terms', 
    body: `15.1. We may modify or discontinue features (including templates) with reasonable notice where practicable.

15.2. We may update these Terms. Material changes will be posted on the Site or communicated by email. Continued use after the effective date constitutes acceptance.` 
  },
  { 
    id: 'notices', 
    title: 'Notices and Contact', 
    body: `Official communications to the Company should be sent to:

Email: info@ventira.co.uk
Address: VIARGAMING LTD, 43 Victoria Rd, Northampton, United Kingdom, NN1 5ED
Phone: +44 7457 423147` 
  },
  { 
    id: 'governing-law', 
    title: 'Governing Law and Jurisdiction', 
    body: `These Terms are governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction of the courts of England and Wales, except where mandatory consumer law provides otherwise.` 
  },
  { 
    id: 'complaints', 
    title: 'Complaints and Dispute Resolution', 
    body: `18.1. If you have a complaint, contact us at info@ventira.co.uk. We aim to acknowledge complaints within 5 business days and provide a substantive response within 30 days.

18.2. If we cannot resolve your complaint, you may have the right to seek alternative dispute resolution (ADR) with an independent body or pursue a claim in court. Nothing limits your statutory rights.` 
  },
  { 
    id: 'export-controls', 
    title: 'Export Controls and Sanctions', 
    body: `You represent that you are not subject to UK, EU, or US sanctions and will not use the Service in or for the benefit of sanctioned persons or jurisdictions in violation of applicable laws.` 
  },
  { 
    id: 'force-majeure', 
    title: 'Force Majeure', 
    body: `We will not be liable for delay or failure to perform due to events beyond our reasonable control (including but not limited to outages of third-party providers, telecommunications failures, acts of God, war, terrorism, strikes, new regulations).` 
  },
  { 
    id: 'assignment', 
    title: 'Assignment', 
    body: `You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations in connection with a merger, acquisition, corporate reorganisation, or sale of assets.` 
  },
  { 
    id: 'miscellaneous', 
    title: 'Miscellaneous', 
    body: `22.1. If any provision of these Terms is found invalid or unenforceable, the remainder remains in force.

22.2. A failure or delay to enforce any right is not a waiver.

22.3. These Terms constitute the entire agreement between you and us regarding the Service and supersede all prior understandings.` 
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

export default function TermsPage() {
  return (
    <PolicyPage 
      title="Terms & Conditions" 
      sections={sections}
      effectiveDate="21 Oct 2025"
      lastUpdated="21 Oct 2025"
      version="v1.0.0"
      showRegionToggle={false}
    />
  );
}
