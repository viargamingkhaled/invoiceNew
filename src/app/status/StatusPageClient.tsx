'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { THEME } from '@/lib/theme';
import { useState } from 'react';

export default function StatusPageClient() {
  const [incidentFilter, setIncidentFilter] = useState('all');

  // Mock data based on JSON fallbacks
  const statusData = {
    currentStatus: 'All systems operational',
    overallUptime: '99.96%',
    lastUpdated: '2025-10-08 12:00 UK',
    components: [
      { key: 'generator', label: 'Invoice Generator', status: 'operational' },
      { key: 'pdf', label: 'PDF Export', status: 'operational' },
      { key: 'email', label: 'Email & Share', status: 'operational' },
      { key: 'dashboard', label: 'Dashboard & Auth', status: 'operational' },
      { key: 'api', label: 'API & Webhooks', status: 'operational' },
      { key: 'payments', label: 'Payments', status: 'operational' }
    ],
    uptimeMetrics: [
      { label: 'Invoice Generator', value: '99.98%' },
      { label: 'PDF Export', value: '99.96%' },
      { label: 'Email & Share', value: '99.95%' },
      { label: 'Overall', value: '99.96%' }
    ],
    incidents: [
      {
        id: '2025-09-18-pdf',
        title: 'Partial outage — PDF Export',
        timeRange: '2025-09-18 10:12–11:03 UK',
        components: ['pdf'],
        impact: '~12% of PDF exports failed',
        status: 'resolved',
        rootCause: 'Autoscaling misconfiguration',
        timeline: [
          { t: '10:12', msg: 'Issue detected' },
          { t: '10:20', msg: 'Investigation underway' },
          { t: '10:41', msg: 'Scaling fix applied' },
          { t: '11:03', msg: 'Resolved' }
        ]
      }
    ],
    maintenance: [
      {
        id: '2025-10-20-db',
        title: 'Database maintenance',
        window: '2025-10-20 22:00–23:00 UK',
        impact: 'Possible brief read-only mode',
        status: 'scheduled'
      }
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
            Live availability, incidents, and maintenance.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Overall: Operational
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <span>90‑day uptime: {statusData.overallUptime}</span>
            </div>
            <div className="text-sm text-slate-500">
              Last updated: {statusData.lastUpdated}
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
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Components
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {statusData.components.map((component, index) => (
              <motion.div
                key={component.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">{component.label}</h3>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(component.status)}`}>
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
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Uptime (last 90 days)
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statusData.uptimeMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center">
                  <div className="text-2xl font-bold text-slate-900 mb-2">{metric.value}</div>
                  <div className="text-sm text-slate-600">{metric.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-blue-800 text-sm">
                  Targets: 99.9% monthly uptime for core features.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* Recent Incidents Section */}
      <Section className="py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Recent Incidents
          </h2>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {['all', 'generator', 'pdf', 'email', 'dashboard', 'api', 'payments'].map((filter) => (
              <button
                key={filter}
                onClick={() => setIncidentFilter(filter)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  incidentFilter === filter
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {statusData.incidents.length > 0 ? (
            <div className="space-y-4">
              {statusData.incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{incident.title}</h3>
                        <p className="text-sm text-slate-600">{incident.timeRange}</p>
                        <p className="text-sm text-slate-600 mt-1">Impact: {incident.impact}</p>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        <span className="capitalize">{incident.status}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-slate-900 mb-2">Root Cause</h4>
                      <p className="text-sm text-slate-600">{incident.rootCause}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Timeline</h4>
                      <div className="space-y-2">
                        {incident.timeline.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex items-center gap-3 text-sm">
                            <span className="font-mono text-slate-500 min-w-[40px]">{event.t}</span>
                            <span className="text-slate-600">{event.msg}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-slate-600">No incidents in the selected period.</p>
            </Card>
          )}
        </motion.div>
      </Section>

      {/* Scheduled Maintenance Section */}
      <Section className="py-16 bg-slate-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Scheduled Maintenance
          </h2>

          {statusData.maintenance.length > 0 ? (
            <div className="space-y-4">
              {statusData.maintenance.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-600 mb-1">{item.window}</p>
                        <p className="text-sm text-slate-600">Impact: {item.impact}</p>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        <span className="capitalize">{item.status}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-slate-600">No maintenance scheduled.</p>
            </Card>
          )}
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
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            Subscribe to updates
          </h2>

          <Card className="p-8">
            <div className="max-w-md mx-auto text-center">
              <p className="text-slate-600 mb-6">
                We'll email incident and maintenance updates. Unsubscribe anytime.
              </p>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="email"
                  placeholder="your@email"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button size="sm">
                  Subscribe
                </Button>
              </div>
              
              <div className="text-center">
                <Link href="/status/rss.xml" className="text-blue-600 hover:underline text-sm">
                  RSS/Atom feed →
                </Link>
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
          <h2 className={`text-3xl font-bold ${THEME.text} mb-8 text-center`}>
            SLA & Support
          </h2>

          <Card className="p-8">
            <p className="text-slate-600 mb-6 text-center">
              Availability target is 99.9% monthly for core features. If you're experiencing an issue, check open incidents above or contact support.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[120px]">Support email:</span>
                <a href="mailto:info@invoicerly.co.uk" className="text-blue-600 hover:underline">
                  info@invoicerly.co.uk
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-slate-900 min-w-[120px]">Hours (UK):</span>
                <span className="text-slate-600">09:00–18:00</span>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/security#incidents" className="text-blue-600 hover:underline text-sm">
                Security & Incident response →
              </Link>
            </div>
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
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Subscribe to updates</h3>
            <p className="text-slate-600 mb-6">
              Get incident and maintenance updates.
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium text-slate-900 min-w-[120px]">Email:</span>
                <a href="mailto:info@invoicerly.co.uk" className="text-blue-600 hover:underline">
                  info@invoicerly.co.uk
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium text-slate-900 min-w-[120px]">RSS/Atom feed:</span>
                <Link href="/status/rss.xml" className="text-blue-600 hover:underline">
                  /status/rss.xml
                </Link>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-4">
                <Link href="/security" className="text-blue-600 hover:underline text-sm">Security & Trust</Link>
                <Link href="/refund" className="text-blue-600 hover:underline text-sm">Refund Policy</Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>
    </main>
  );
}
