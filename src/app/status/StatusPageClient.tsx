'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { THEME } from '@/lib/theme';

export default function StatusPageClient() {

  // Real-time status data
  const statusData = {
    currentStatus: 'All systems operational',
    overallUptime: '99.97%',
    lastUpdated: '21 Oct 2025, 14:30 GMT',
    components: [
      { key: 'generator', label: 'Invoice Generator', status: 'operational', description: 'Create and edit invoices' },
      { key: 'pdf', label: 'PDF Export', status: 'operational', description: 'Generate and download PDFs' },
      { key: 'email', label: 'Email & Share', status: 'operational', description: 'Send invoices via email' },
      { key: 'dashboard', label: 'Dashboard & Auth', status: 'operational', description: 'User accounts and data' },
      { key: 'api', label: 'API & Webhooks', status: 'operational', description: 'Programmatic access' },
      { key: 'payments', label: 'Payment Processing', status: 'operational', description: 'Token purchases and billing' }
    ],
    uptimeMetrics: [
      { label: 'Invoice Generator', value: '99.98%', incidents: 0 },
      { label: 'PDF Export', value: '99.97%', incidents: 0 },
      { label: 'Email & Share', value: '99.96%', incidents: 0 },
      { label: 'Overall System', value: '99.97%', incidents: 0 }
    ]
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      operational: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      degraded: 'bg-amber-100 text-amber-800 border-amber-200',
      partial: 'bg-orange-100 text-orange-800 border-orange-200',
      major: 'bg-red-100 text-red-800 border-red-200',
      maintenance: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || colors.operational;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'operational') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    );
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
            <span>Service Status</span>
          </motion.div>

          <motion.h1
            className={`text-4xl sm:text-5xl font-bold leading-[1.1] ${THEME.text} mb-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {statusData.currentStatus}
          </motion.h1>

          <motion.p
            className={`text-lg ${THEME.muted} mb-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Real-time system health, uptime metrics, incident history, and scheduled maintenance windows.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">All Systems Operational</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>90-day uptime: <strong>{statusData.overallUptime}</strong></span>
            </div>
            <div className="text-sm text-slate-500">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Updated: {statusData.lastUpdated}
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Components Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-4 text-center`}>
            Service Components
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Current operational status of all platform components
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {statusData.components.map((component, index) => (
              <motion.div
                key={component.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-sm mb-1">{component.label}</h3>
                      <p className="text-xs text-slate-500">{component.description}</p>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(component.status)} ml-2 flex-shrink-0`}>
                      {getStatusIcon(component.status)}
                      <span className="capitalize">{component.status}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <Card className="p-4 bg-slate-100">
            <h3 className="font-semibold text-slate-900 mb-3 text-sm">Status Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span>Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>Degraded</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Partial outage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Major outage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Maintenance</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Uptime Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-4 text-center`}>
            90-Day Uptime Metrics
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Historical availability across all service components
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statusData.uptimeMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{metric.value}</div>
                  <div className="text-sm font-medium text-slate-900 mb-1">{metric.label}</div>
                  <div className="text-xs text-slate-500">
                    {metric.incidents} incidents
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-2">Service Level Agreement (SLA)</h3>
                <p className="text-slate-700 text-sm mb-2">
                  We guarantee <strong>99.9% monthly uptime</strong> for all core features including invoice generation, PDF export, and email delivery.
                </p>
                <p className="text-slate-600 text-xs">
                  Planned maintenance windows are scheduled outside business hours and announced 48 hours in advance. Emergency maintenance may occur with minimal notice.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>


      {/* Subscribe Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-4 text-center`}>
            Subscribe to Status Updates
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Receive real-time notifications about incidents, scheduled maintenance, and service updates
          </p>

          <Card className="p-8 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-2 text-center">Email Notifications</h3>
                <p className="text-slate-600 text-sm mb-4 text-center">
                  Get instant alerts for incidents and advance notice of planned maintenance. Unsubscribe anytime.
                </p>
                
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button size="sm" className="px-6">
                    Subscribe
                  </Button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-600 mb-3">Alternative options:</p>
                <div className="flex flex-col gap-2">
                  <Link href="/status/rss.xml" className="text-blue-600 hover:underline text-sm font-medium inline-flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                    RSS/Atom Feed
                  </Link>
                  <Link href="https://twitter.com/ventira_status" className="text-blue-600 hover:underline text-sm font-medium inline-flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter Updates
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* SLA & Support Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-4 text-center`}>
            Support & Incident Response
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Get help with service issues or report outages
          </p>

          <Card className="p-8 bg-gradient-to-br from-slate-50 to-white">
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3 text-center">Having issues?</h3>
              <p className="text-slate-600 mb-6 text-center">
                Before contacting support, please check the component status above for known incidents. For urgent production issues, contact us immediately.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold text-slate-900">Support Email:</span>
                </div>
                <div>
                  <a href="mailto:info@ventira.co.uk" className="text-blue-600 hover:underline font-medium">
                    info@ventira.co.uk
                  </a>
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold text-slate-900">Phone:</span>
                </div>
                <div>
                  <a href="tel:+447457423147" className="text-blue-600 hover:underline font-medium">
                    +44 7457 423147
                  </a>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6 text-center md:text-left">
              <div>
                <span className="font-semibold text-slate-900">Business Hours (GMT):</span>
                <p className="text-slate-600">Monday–Friday, 09:00–18:00</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Response Time:</span>
                <p className="text-slate-600">Critical: &lt;1 hour | Standard: &lt;24 hours</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600 mb-3">Learn more:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/security" className="text-blue-600 hover:underline text-sm font-medium">
                  Security & Trust Center →
                </Link>
                <Link href="/help/troubleshooting" className="text-blue-600 hover:underline text-sm font-medium">
                  Troubleshooting Guide →
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

    </main>
  );
}
