import PolicyPage from '@/components/policy/PolicyPage';
import { PolicySection } from '@/types/policy';

export const metadata = {
  title: 'Cookies Policy - Ventira',
  description: 'How Ventira uses cookies and similar technologies on ventira.co.uk.',
};

const sections: PolicySection[] = [
  { 
    id: 'overview', 
    title: 'Overview', 
    body: `This Cookies Policy explains how ventira.co.uk, operated by VIARGAMING LTD (Company No. 15847699, registered office: 43 Victoria Rd, Northampton, United Kingdom, NN1 5ED), uses cookies and similar technologies (including localStorage, sessionStorage, pixels and other identifiers) across our website and services.

This Policy complements our Privacy Policy. By interacting with the cookie banner or continuing to browse, you can manage or provide consent to non-essential cookies as outlined below.` 
  },
  { 
    id: 'what-are-cookies', 
    title: 'What Are Cookies?', 
    body: `Cookies are small text files or browser-based entries placed on your device when you visit a website. They enable essential functionality (e.g., login sessions), remember your preferences, improve performance and reliability, and — with your consent — activate analytics and marketing features.

Similar technologies (localStorage, sessionStorage, pixels, device identifiers) serve comparable purposes.` 
  },
  { 
    id: 'categories', 
    title: 'Categories of Cookies We Use', 
    body: `We use cookies only for limited, clearly defined purposes:

• Essential / Necessary — required for core platform features (authentication, security, session management, CSRF protection, load balancing). These are strictly necessary and do not require consent.

• Functional — store user preferences (language, interface layout, invoice editor autosave and UI state).

• Performance / Analytics — collect aggregated information about site usage (page views, load times, error diagnostics) to improve reliability and user experience. Depending on the tool and configuration, these may rely on legitimate interests or consent.

• Marketing / Advertising — activated only with your consent; used for campaign attribution, remarketing and personalised offers.

• Security / Anti-abuse — help detect suspicious activity, fraud, bots or misuse of the platform (e.g., rate-limiting, anomaly detection).` 
  },
  { 
    id: 'examples', 
    title: 'Examples of Typical Cookies and Storage Keys', 
    body: `Names, lifetimes and providers can change. The most current list is available in the on-site cookie settings panel.

Name / Key | Purpose | Category | Typical lifetime
-----------|---------|----------|------------------
session_id | Keeps you logged in / session continuity | Essential | Session
csrf_token | CSRF protection for secure requests | Essential | Session
cookie_consent | Stores your cookie choices and timestamp/version | Functional | 6–12 months
ui_prefs | Saves UI/language/theme settings | Functional | ~6 months
draft_autosave (localStorage) | Autosave of invoice drafts/editor state | Functional | Until cleared
_ga, _gid | Basic analytics (e.g., page views) | Performance/Analytics | 1–24 months
campaign_src | Marketing attribution / UTM tracking | Marketing | 30–90 days
security_flags | Bot/fraud detection and rate-limits | Security | Session / up to 30 days` 
  },
  { 
    id: 'consent', 
    title: 'Consent and Lawful Basis', 
    body: `• Essential cookies are set without consent as they are necessary to provide the Service (performance of a contract and our legitimate interests in security and reliability).

• Non-essential cookies (functional, analytics, marketing) are activated after your consent via the banner or settings panel, unless we rely on legitimate interests for limited analytics or security consistent with PECR and UK GDPR.

• Our legal bases include contract performance, consent, and legitimate interests (e.g., fraud prevention, service improvement, dispute defence).` 
  },
  { 
    id: 'consent-retention', 
    title: 'How We Record and Retain Consent', 
    body: `When you make a cookie choice, we log the banner/version shown, timestamp, IP address and basic browser details as proof of consent or refusal.

Consent records are retained for at least 24 months, and up to 6 years where required for enterprise, compliance or dispute-resolution purposes, in line with our Privacy Policy.` 
  },
  { 
    id: 'third-parties', 
    title: 'Third Parties and International Transfers', 
    body: `We use trusted third-party providers (for example: payment processing, hosting/cloud, email delivery, analytics, marketing and customer support tools) that may place cookies or similar identifiers.

Some may be located outside the UK/EEA. Where applicable, we rely on safeguards such as UK adequacy regulations, Standard Contractual Clauses (SCCs) and/or the UK International Data Transfer Addendum (IDTA), together with appropriate supplementary measures.

A current list of active providers is available in the cookie settings panel.` 
  },
  { 
    id: 'manage-cookies', 
    title: 'How to Manage or Withdraw Cookie Consent', 
    body: `• Use the cookie banner or cookie settings panel on our website to accept, decline or customise non-essential cookies.

• You can adjust or withdraw consent at any time via the cookie settings link in the footer.

• You may also manage cookies via your browser settings or use private/incognito mode. Disabling certain cookies may reduce functionality (e.g., automatic login, saved preferences, or editor autosave).` 
  },
  { 
    id: 'updates', 
    title: 'Updates to this Policy', 
    body: `We may update this Cookies Policy from time to time (for example, when new tools or technologies are introduced).

Significant changes will be communicated by notice on the website or, where appropriate, by email to registered users. The effective date will be updated accordingly.` 
  },
  { 
    id: 'contact', 
    title: 'Contact', 
    body: `If you have questions about this Cookies Policy or our use of cookies, please contact us:

Email: info@ventira.co.uk
Phone: +44 7457 423147

Company: VIARGAMING LTD
Registered office: 43 Victoria Rd, Northampton, United Kingdom, NN1 5ED
Company No.: 15847699` 
  },
];

export default function CookiesPage() {
  return (
    <PolicyPage 
      title="Cookies Policy" 
      sections={sections}
      effectiveDate="21 Oct 2025"
      lastUpdated="21 Oct 2025"
      version="v1.0.0"
      showRegionToggle={false}
    />
  );
}
