'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { THEME } from '@/lib/theme';

export default function SecurityPageClient() {
  const pillCards = [
    { icon: 'lock', title: 'Encryption', text: 'TLS 1.2+ in transit, AES-256 encryption at rest for all data.' },
    { icon: 'shield-check', title: 'Access Control', text: 'Role-based access, MFA for admin, full audit logging.' },
    { icon: 'file-check', title: 'Compliance', text: 'GDPR & UK GDPR compliant, SOC 2 Type II controls.' },
    { icon: 'database', title: 'Backups', text: 'Automated encrypted backups, tested recovery procedures.' },
    { icon: 'activity', title: 'Monitoring', text: 'Real-time threat detection, 24/7 uptime monitoring.' }
  ];

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      lock: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      'shield-check': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      'file-check': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      database: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      activity: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    };
    return icons[iconName] || icons.lock;
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <Section className="pt-10 pb-16">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-white/70 backdrop-blur border-black/10 shadow-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span>Security & Trust</span>
          </motion.div>

          <motion.h1
            className={`text-4xl sm:text-5xl font-bold leading-[1.1] ${THEME.text} mb-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Enterprise-grade security.<br />Built for trust.
          </motion.h1>

          <motion.p
            className={`text-lg ${THEME.muted} mb-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Bank-level encryption, rigorous access controls, continuous monitoring, and transparent processes. Your data security is our foundation.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              All Systems Operational
            </div>
            <div className="text-sm text-slate-500">
              Last reviewed: 21 Oct 2025
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Overview Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Overview
          </h2>
          
          <div className="text-center mb-12">
            <p className={`text-lg ${THEME.muted} mb-8`}>
              Ventira encrypts all data in transit and at rest, enforces strict role-based access controls, and continuously monitors for security threats. Payment card data is never stored on our servers — all transactions are processed through PCI DSS Level 1 certified payment providers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                      {getIcon(card.icon)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
                      <p className="text-slate-600 text-sm">{card.text}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Data Protection Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Data Protection & Privacy
          </h2>

          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[140px]">Data Controller:</span>
                <span className="text-slate-600">VIARGAMING LTD (Company No. 15847699), United Kingdom</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[140px]">Registered Office:</span>
                <span className="text-slate-600">43 Victoria Rd, Northampton, NN1 5ED, UK</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[140px]">Data Regions:</span>
                <span className="text-slate-600">UK & EU/EEA; Standard Contractual Clauses (SCCs) + UK IDTA for international transfers</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-[140px]">Legal Policies:</span>
                <div className="flex flex-wrap gap-2">
                  <Link href="/privacy" className="text-blue-600 hover:underline text-sm">Privacy Policy</Link>
                  <span className="text-slate-400">·</span>
                  <Link href="/cookies" className="text-blue-600 hover:underline text-sm">Cookie Policy</Link>
                  <span className="text-slate-400">·</span>
                  <Link href="/terms" className="text-blue-600 hover:underline text-sm">Terms & Conditions</Link>
                  <span className="text-slate-400">·</span>
                  <Link href="/refund" className="text-blue-600 hover:underline text-sm">Refund Policy</Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Encryption Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Encryption
          </h2>

          <Card className="p-8">
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-medium text-slate-900">TLS 1.2+ in Transit</span>
                  <p className="text-sm mt-1">All data is encrypted in transit using TLS 1.2 or higher. HTTP Strict Transport Security (HSTS) is enforced on all public endpoints to prevent downgrade attacks.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-medium text-slate-900">AES-256 Encryption at Rest</span>
                  <p className="text-sm mt-1">All stored data — including databases, uploaded files (PDFs, logos), and backups — is encrypted at rest using industry-standard AES-256 encryption.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-medium text-slate-900">Key Management & Rotation</span>
                  <p className="text-sm mt-1">Encryption keys are managed using secure cloud key management services with automatic rotation policies. Access to cryptographic keys is strictly controlled and audited.</p>
                </div>
              </li>
            </ul>
          </Card>
        </motion.div>
      </Section>

      {/* Access Control Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Access Control
          </h2>

          <Card className="p-8">
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-medium text-slate-900">Role-Based Access & Least Privilege</span>
                  <p className="text-sm mt-1">Access to systems and data is strictly role-based. All admin and privileged accounts require multi-factor authentication (MFA). Employees are granted only the minimum access necessary for their job function.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-medium text-slate-900">Comprehensive Audit Logging</span>
                  <p className="text-sm mt-1">All access to production systems is logged with tamper-proof audit trails. Production access is time-bounded, ticketed, and requires explicit approval. Logs are retained and regularly reviewed for anomalies.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-medium text-slate-900">Customer Data Protection</span>
                  <p className="text-sm mt-1">Support team access to customer data is strictly limited to legitimate support requests. All customer data access is logged, monitored, and subject to periodic review to ensure compliance with our security policies.</p>
                </div>
              </li>
            </ul>
          </Card>
        </motion.div>
      </Section>

      {/* Application Security Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Application Security
          </h2>

          <Card className="p-8">
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Secure SDLC: code reviews, dependency scanning, build integrity checks.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Vulnerability management: regular scans/patching; severity-based SLAs.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Protections: rate limiting, abuse detection, CSRF protection on auth flows.</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </Section>

      {/* Infrastructure & Monitoring Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Infrastructure & Monitoring
          </h2>

          <Card className="p-8">
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Environment isolation for dev/staging/production.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Observability: logs, metrics, tracing; alerting on error rates and latency.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Backups: encrypted automatic backups with periodic restore tests.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Disaster recovery: documented runbooks; RTO/RPO targets below.</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </Section>

      {/* Availability Targets Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Availability Targets
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2">99.9%</div>
              <div className="text-sm text-slate-600">Target uptime</div>
              <div className="text-xs text-slate-500 mt-1">monthly, core features</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2">≤ 4h</div>
              <div className="text-sm text-slate-600">RTO</div>
              <div className="text-xs text-slate-500 mt-1">Recovery Time Objective</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2">≤ 15m</div>
              <div className="text-sm text-slate-600">RPO</div>
              <div className="text-xs text-slate-500 mt-1">Recovery Point Objective</div>
            </Card>
          </div>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-blue-800 text-sm">
                  Live availability is published on the Status page.
                </p>
                <Link href="/status" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  View Status →
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Data Retention Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Data Retention
          </h2>

          <Card className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Data</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Retention</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4">Account & company settings</td>
                    <td className="py-3 px-4">For the lifetime of the account</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4">Customer Content (invoices, clients)</td>
                    <td className="py-3 px-4">Until deleted or account closure</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4">Billing & token ledger</td>
                    <td className="py-3 px-4">Per tax/accounting law (UK typically 6 years)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Backups</td>
                    <td className="py-3 px-4">Time-limited, encrypted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Incident Response Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Incident Response
          </h2>

          <Card className="p-8">
            <p className="text-slate-600 mb-6">
              We maintain 24/7 incident response capabilities for production systems. Critical incidents are triaged within 1 hour, and we proactively communicate with affected users via our Status page and email notifications.
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Our Incident Response Process:</h3>
              <ol className="space-y-4 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <span className="font-medium text-slate-900">Detect & Triage</span>
                    <p className="text-sm mt-1">Automated monitoring detects anomalies. On-call engineers assess severity and impact within 15 minutes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <span className="font-medium text-slate-900">Communicate</span>
                    <p className="text-sm mt-1">Status page updated within 15 minutes for major incidents. Email notifications sent to affected users.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <span className="font-medium text-slate-900">Resolve & Update</span>
                    <p className="text-sm mt-1">Hourly progress updates provided until full resolution. Service restoration prioritized over root cause analysis.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <span className="font-medium text-slate-900">Post-Incident Review</span>
                    <p className="text-sm mt-1">Detailed post-mortem published within 5 business days for major events, including root cause, timeline, and remediation steps.</p>
                  </div>
                </li>
              </ol>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Responsible Disclosure Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Responsible Disclosure
          </h2>

          <Card className="p-8">
            <p className="text-slate-600 mb-6">
              We welcome responsible disclosure of security vulnerabilities from security researchers and the broader community. We are committed to working with researchers to verify, reproduce, and respond to legitimate reported vulnerabilities.
            </p>
            
            <Card className="p-6 bg-slate-100 border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">How to Report a Security Vulnerability</h3>
              <p className="text-slate-600 text-sm mb-4">
                Please send a detailed report to <a href="mailto:info@ventira.co.uk" className="text-blue-600 hover:underline font-medium">info@ventira.co.uk</a> including:
              </p>
              <ul className="text-slate-600 text-sm space-y-2 mb-4 ml-4 list-disc">
                <li>Steps to reproduce the vulnerability</li>
                <li>Potential impact and severity assessment</li>
                <li>Any supporting proof-of-concept code or screenshots</li>
                <li>Your contact information for follow-up</li>
              </ul>
              <p className="text-slate-600 text-sm mb-4">
                <strong>Response timeline:</strong> We acknowledge all reports within 2 business days and provide regular updates throughout the remediation process. We aim to resolve critical vulnerabilities within 30 days.
              </p>
              <p className="text-slate-600 text-sm mb-4">
                <strong>Coordinated disclosure:</strong> Please allow us reasonable time to address the issue before any public disclosure. We commit to transparent communication and will coordinate disclosure timing with you.
              </p>
              <Button href="mailto:info@ventira.co.uk" size="sm">
                Report Security Issue
              </Button>
            </Card>
          </Card>
        </motion.div>
      </Section>

      {/* Compliance & Legal Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Compliance & Legal
          </h2>

          <Card className="p-8">
            <ul className="space-y-4 text-slate-600 mb-6">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>GDPR / UK GDPR principles observed (lawful basis, minimisation, rights).</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Data Processing Addendum (DPA) available on request.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Subprocessors list kept up-to-date.</span>
              </li>
            </ul>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-blue-600 hover:underline text-sm">Privacy Policy</Link>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Subprocessors Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Subprocessors (summary)
          </h2>

          <Card className="p-8">
            <p className="text-slate-600 mb-6">
              We use third-party providers for hosting, email, analytics, and payments. Each provider signs data protection terms and meets our security requirements.
            </p>
          </Card>
        </motion.div>
      </Section>

      {/* Help Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Need help?</h3>
            <p className="text-slate-600 mb-6">
              Questions about security, data protection, or privacy? Our team is here to help. We typically respond within one business day.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[160px]">Security inquiries:</span>
                <a href="mailto:info@ventira.co.uk" className="text-blue-600 hover:underline font-medium">
                  info@ventira.co.uk
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[160px]">Data protection:</span>
                <a href="mailto:info@ventira.co.uk" className="text-blue-600 hover:underline font-medium">
                  info@ventira.co.uk
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[160px]">Phone:</span>
                <a href="tel:+447457423147" className="text-blue-600 hover:underline font-medium">
                  +44 7457 423147
                </a>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-4">Quick links:</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/status" className="text-blue-600 hover:underline text-sm font-medium">System Status</Link>
                <span className="text-slate-300">·</span>
                <Link href="/privacy" className="text-blue-600 hover:underline text-sm font-medium">Privacy Policy</Link>
                <span className="text-slate-300">·</span>
                <Link href="/cookies" className="text-blue-600 hover:underline text-sm font-medium">Cookie Policy</Link>
                <span className="text-slate-300">·</span>
                <Link href="/terms" className="text-blue-600 hover:underline text-sm font-medium">Terms & Conditions</Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>
    </main>
  );
}
