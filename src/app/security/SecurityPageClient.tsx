'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { THEME } from '@/lib/theme';

export default function SecurityPageClient() {
  const pillCards = [
    { icon: 'lock', title: 'Encryption', text: 'TLS in transit, encrypted storage at rest.' },
    { icon: 'shield-check', title: 'Access control', text: 'Least privilege, strong auth, audited access.' },
    { icon: 'file-check', title: 'Compliance', text: 'GDPR / UK GDPR principles observed.' },
    { icon: 'database', title: 'Backups', text: 'Encrypted, tested restores.' },
    { icon: 'activity', title: 'Monitoring', text: 'Alerting on errors and latency.' }
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
            We protect your data by design
          </motion.h1>

          <motion.p
            className={`text-lg ${THEME.muted} mb-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Encryption, access controls, monitoring, and clear processes. UK-first · EU-ready.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Uptime: 99.96%
            </div>
            <div className="text-sm text-slate-500">
              Last updated: 2025-10-08
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
              Invoicerly encrypts data in transit and at rest, limits access on a need-to-know basis, and monitors for threats. We do not store card numbers on our servers.
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
                <span className="font-semibold text-slate-900 min-w-[120px]">Controller:</span>
                <span className="text-slate-600">GET STUFFED LTD (Reg. 15673179), UK</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[120px]">Regions:</span>
                <span className="text-slate-600">UK & EU/EEA; SCCs + UK Addendum for transfers where required</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="font-semibold text-slate-900 min-w-[120px]">Policies:</span>
                <div className="flex flex-wrap gap-2">
                  <Link href="/privacy" className="text-blue-600 hover:underline text-sm">Privacy</Link>
                  <span className="text-slate-400">·</span>
                  <Link href="/cookies" className="text-blue-600 hover:underline text-sm">Cookie</Link>
                  <span className="text-slate-400">·</span>
                  <Link href="/refund" className="text-blue-600 hover:underline text-sm">Refund</Link>
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
                <span>TLS 1.2+ for all traffic; HSTS on public endpoints.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Encrypted storage for primary databases and assets (PDFs, logos).</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Keys managed centrally with rotation; strict access to secrets.</span>
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
                <span>Role-based access with least privilege; strong authentication for admin.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>All access is logged and reviewed; production access is time-bounded and ticketed.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Customer data access for support is limited and audited.</span>
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
              We run 24/7 on-call for production incidents, triage priority issues within 1 hour, and communicate via the Status page and email if you are impacted.
            </p>
            
            <ol className="space-y-4 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">1</span>
                <span>Detect and triage the incident.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">2</span>
                <span>Update the Status page within 15 minutes for major incidents.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</span>
                <span>Provide hourly updates until resolved.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">4</span>
                <span>Publish a post-incident report for major events within 5 business days.</span>
              </li>
            </ol>
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
              We welcome vulnerability reports. Please avoid public disclosure until remediation is complete.
            </p>
            
            <Card className="p-6 bg-slate-100 border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">Report a security issue</h3>
              <p className="text-slate-600 text-sm mb-4">
                Email info@invoicerly.co.uk with steps to reproduce, impact, and your contact. We acknowledge within 2 business days and provide an ETA for remediation.
              </p>
              <Button href="mailto:info@invoicerly.co.uk" size="sm">
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
              <Link href="/legal/dpa" className="text-blue-600 hover:underline text-sm">DPA</Link>
              <Link href="/legal/subprocessors" className="text-blue-600 hover:underline text-sm">Subprocessors</Link>
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
            
            <Link href="/legal/subprocessors" className="text-blue-600 hover:underline text-sm">
              See current list →
            </Link>
          </Card>
        </motion.div>
      </Section>

      {/* Contact Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Contact
          </h2>

          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[140px]">Security:</span>
                <a href="mailto:info@invoicerly.co.uk" className="text-blue-600 hover:underline">
                  info@invoicerly.co.uk
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[140px]">Data protection:</span>
                <a href="mailto:info@invoicerly.co.uk" className="text-blue-600 hover:underline">
                  info@invoicerly.co.uk
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Help Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Need help?</h3>
            <p className="text-slate-600 mb-6">
              Questions about security, data protection, or privacy? We reply within one business day.
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium text-slate-900 min-w-[120px]">Security:</span>
                <a href="mailto:info@invoicerly.co.uk" className="text-blue-600 hover:underline">
                  info@invoicerly.co.uk
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium text-slate-900 min-w-[120px]">Data protection:</span>
                <a href="mailto:info@invoicerly.co.uk" className="text-blue-600 hover:underline">
                  info@invoicerly.co.uk
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-4">
                <Link href="/status" className="text-blue-600 hover:underline text-sm">Status</Link>
                <Link href="/privacy" className="text-blue-600 hover:underline text-sm">Privacy Policy</Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>
    </main>
  );
}
