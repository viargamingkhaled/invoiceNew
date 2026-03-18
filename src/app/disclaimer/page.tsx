import PolicyPage from '@/components/policy/PolicyPage';
import { PolicySection } from '@/types/policy';

export const metadata = {
  title: 'Disclaimer - Ventira',
  description: 'Important disclaimers regarding Ventira invoice generation services operated by VIARGAMING LTD.',
};

const sections: PolicySection[] = [
  {
    id: 'general',
    title: 'General Disclaimer',
    body: `The information, tools, and services provided on ventira.co.uk are operated by VIARGAMING LTD (Company No. 15847699, registered in England and Wales, registered office: 43 Victoria Rd, Northampton, United Kingdom, NN1 5ED) solely to assist users in generating invoice documents.

While every effort is made to keep the platform accurate, reliable, and up to date, VIARGAMING LTD makes no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose.`,
  },
  {
    id: 'no-professional-advice',
    title: 'No Professional or Legal Advice',
    body: `Nothing on ventira.co.uk constitutes legal, financial, tax, or accounting advice. Invoice templates and calculated amounts are provided for informational and convenience purposes only. You are solely responsible for ensuring that invoices you issue comply with applicable laws, regulations, and contractual obligations in your jurisdiction.

We strongly recommend consulting a qualified accountant, tax adviser, or legal professional in relation to your specific circumstances before issuing invoices or relying on any figures produced by the Service.`,
  },
  {
    id: 'accuracy',
    title: 'Accuracy of Calculations',
    body: `Ventira uses publicly available VAT and tax rates as reference values. These rates may change without notice. The platform cannot guarantee that all rate tables are current at the time of use. You remain responsible for verifying the correct rates applicable to each transaction.

VIARGAMING LTD accepts no liability for errors, omissions, or outdated information in automated calculations, and shall not be held responsible for any financial loss, penalty, or regulatory action arising from incorrectly issued invoices.`,
  },
  {
    id: 'third-party',
    title: 'Third-Party Links and Services',
    body: `The platform may contain links to external websites or integrate third-party services (including payment processors). VIARGAMING LTD has no control over the nature, content, or availability of those sites or services. The inclusion of any links or integrations does not imply an endorsement or recommendation.

We are not responsible for the privacy practices, terms, or content of any third-party services accessed through ventira.co.uk.`,
  },
  {
    id: 'limitation',
    title: 'Limitation of Liability',
    body: `To the fullest extent permitted by applicable law, VIARGAMING LTD shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including but not limited to loss of profits, data, goodwill, or business interruption — arising from your use of or inability to use the Service.

Nothing in this Disclaimer limits or excludes liability that cannot be excluded under applicable law, including liability for death or personal injury caused by negligence, or for fraudulent misrepresentation.`,
  },
  {
    id: 'uptime',
    title: 'Service Availability',
    body: `We aim to maintain continuous availability of the Service but do not guarantee uninterrupted, error-free, or virus-free access. The platform may be suspended temporarily for maintenance, upgrades, or events beyond our reasonable control. VIARGAMING LTD accepts no liability for any loss or inconvenience caused by scheduled or unscheduled downtime.`,
  },
  {
    id: 'changes',
    title: 'Changes to This Disclaimer',
    body: `This Disclaimer may be updated from time to time to reflect changes in law, best practices, or the features of the Service. The date of the last revision is shown at the bottom of this page. Continued use of the Service after any update constitutes acceptance of the revised Disclaimer.`,
  },
  {
    id: 'contact',
    title: 'Contact',
    body: `If you have any questions about this Disclaimer, please contact us:

VIARGAMING LTD
43 Victoria Rd, Northampton, United Kingdom, NN1 5ED
Email: info@ventira.co.uk
Phone: +44 7861 902258`,
  },
];

export default function DisclaimerPage() {
  return (
    <PolicyPage
      title="Disclaimer"
      lastUpdated="18 March 2026"
      sections={sections}
    />
  );
}
