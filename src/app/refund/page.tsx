import PolicyPage from '@/components/policy/PolicyPage';
import { PolicySection } from '@/types/policy';

export const metadata = {
  title: 'Refund & Cancellation Policy - Ventira',
  description: 'Refund and cancellation policy for Ventira invoice generation services.',
};

const sections: PolicySection[] = [
  { 
    id: 'summary', 
    title: 'Customer Summary', 
    body: `• Refunds are handled under this Policy and applicable consumer law.

• Standard processing time is 5–10 business days after approval; posting times depend on banks/payment providers.

• Refunds will not exceed the amount you originally paid (less any non-recoverable payment-provider fees and FX charges, where applicable).

• Used Tokens (e.g., invoice generation, PDF export, email sending, or other metered features) are non-refundable, except where a material technical fault attributable to us cannot reasonably be remedied.

• Token Packages/Top-Ups may be refunded only if completely unused. Once Tokens are deducted, refunds are generally unavailable.

• Promotional credits, discounts, or bonus Tokens are normally non-refundable, unless required by law or expressly stated otherwise.

• Submit refund requests to info@ventira.co.uk with full order details.

• We may update this Policy; material changes will be communicated as described in Section 8.

• Digital content & immediate use: if you request immediate access to the Service and explicitly agree to start performance (e.g., by generating/downloading a PDF invoice), you may lose your statutory cancellation right (see Section 4.6).` 
  },
  { 
    id: 'scope', 
    title: 'Scope and Legal Note', 
    body: `This Policy applies to refunds and cancellations relating to invoice creation, PDF export, email dispatch, template use, and other related services offered via ventira.co.uk by VIARGAMING LTD.

Nothing here affects your statutory rights (including, where applicable, the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 and the Consumer Rights Act 2015).` 
  },
  { 
    id: 'definitions', 
    title: 'Definitions', 
    body: `• Order / Service Fee — the amount you paid for Token Packages/Top-Ups.

• Token Package / Top-Up — prepaid credits used to access the Service (100 Tokens = £1.00 / €1.16 / $1.27 / 5.12 PLN / 29.80 CZK; generating one invoice costs 10 Tokens, unless otherwise stated in the interface).

• Used Tokens — Tokens deducted for generating a PDF invoice, sending an email, or using other metered features.

• Unused Tokens — Tokens that remain in your account balance.

• Promotional Credits — bonus Tokens or discounts granted under promotions.

• Tokens are not legal tender, are non-transferable, hold no cash value outside the Service, and do not expire.` 
  },
  { 
    id: 'core-rules', 
    title: 'Core Refund Rules', 
    body: `4.1 Refund cap. Refunds will not exceed the amount actually paid (less non-refundable payment-provider fees and any FX charges). Refunds are issued in the original payment currency where possible.

4.2 Used Tokens. Tokens already used are not eligible for refund, except where the Service was materially defective and could not be reasonably remedied.

4.3 Cancellation before use. If you cancel before spending any Tokens, your unused Token balance may be refunded, minus reasonable costs incurred (including non-refundable processing fees).

4.4 Defective or non-conforming output. If a generated PDF invoice is materially defective due to our fault, we will first attempt regeneration or re-send. If the issue cannot be resolved within a reasonable timeframe, a partial or full refund/credit may be issued.

4.5 Promotions. Promotional credits/bonus Tokens/discounts are normally non-refundable unless required by law.

4.6 Immediate access & loss of cancellation right. If you request that we begin supplying digital content immediately and explicitly acknowledge the loss of the statutory right to cancel, that right may no longer apply once generation/download starts.

4.7 Custom/managed services (if offered). Where manual implementation, API setup, or personal manager support is provided, once work has started, refunds are not available unless otherwise agreed in writing.

4.8 Business Users. Statutory cooling-off rights for Consumers do not apply to Business Users.` 
  },
  { 
    id: 'how-to-request', 
    title: 'How to Request a Refund', 
    body: `Email info@ventira.co.uk with:

• Your order reference number;
• The account email used for purchase;
• Whether the request concerns unused Tokens, cancellation, or defective output;
• For defects: a description plus evidence (screenshots, filenames, timestamps, error messages);
• Your preferred refund method (normally the original payment method).

Process:

• We acknowledge within 5 business days;
• We investigate and may request more details;
• We provide a decision and, if approved, issue the refund within 5–10 business days of approval (bank posting times vary).` 
  },
  { 
    id: 'investigation', 
    title: 'Investigation, Evidence and Decisions', 
    body: `6.1 We review order history, payment logs, Token usage, generation records, and email-delivery logs.

6.2 Approved refunds normally go to the original payment method; if not possible, a reasonable alternative (e.g., bank transfer) may be offered.

6.3 If refused, we will explain the reasons and outline next steps (e.g., further checks or evidence).` 
  },
  { 
    id: 'chargebacks', 
    title: 'Chargebacks, Fraud and Abuse', 
    body: `If you initiate a chargeback while a refund request is pending, the case becomes a dispute. We will provide evidence (order records, confirmations, timestamps, downloads/sends).

Refunds may be refused and accounts suspended in cases of fraud, abuse, or repeated unwarranted chargebacks.` 
  },
  { 
    id: 'changes', 
    title: 'Changes to this Policy', 
    body: `We may update this Policy periodically. Material changes will be announced on our website or by email.

Updates apply to future transactions and do not retroactively affect completed purchases.` 
  },
  { 
    id: 'retention', 
    title: 'Record Retention', 
    body: `We retain necessary records (orders, payments, Token usage, generation/delivery logs) for at least 24 months, and up to 6 years for disputes or corporate/legal requirements, in line with our Privacy Policy and applicable law.` 
  },
  { 
    id: 'escalation', 
    title: 'Escalation and Disputes', 
    body: `If you disagree with our decision, you may appeal by emailing full details to info@ventira.co.uk. Appeals are normally reviewed within 10 business days.

This does not affect your statutory right to seek alternative dispute resolution (ADR) or legal remedies.` 
  },
  { 
    id: 'examples', 
    title: 'Examples', 
    body: `• Unused Tokens: You purchased £20 = 2,000 Tokens and used 300 Tokens (e.g., three invoice generations). 1,700 Tokens remain → a refund may be issued for 1,700 Tokens (minus fees).

• Used Tokens: If Tokens were spent to generate/download a PDF invoice or send an invoice email, a refund is only possible where output/delivery was materially defective and could not be remedied.

• Promotional Tokens: 100 bonus Tokens received in a promotion → non-refundable.` 
  },
  { 
    id: 'payments-contact', 
    title: 'Payments & Contact Details', 
    body: `Payments: Visa and Mastercard via third-party processors; access to paid features is provided after confirmed settlement.

Email: info@ventira.co.uk
Phone: +44 7457 423147

Company: VIARGAMING LTD
Registered office: 43 Victoria Rd, Northampton, United Kingdom, NN1 5ED
Company No.: 15847699` 
  },
];

export default function RefundPage() {
  return (
    <PolicyPage 
      title="Refund & Cancellation Policy" 
      sections={sections}
      effectiveDate="21 Oct 2025"
      lastUpdated="21 Oct 2025"
      version="v1.0.0"
      showRegionToggle={false}
    />
  );
}
