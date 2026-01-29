'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/layout/Section';
import Card from '@/components/ui/Card';
import { HOME_V2_DATA } from '@/lib/home-v2-data';
import { Button } from '@/components/ui/Button';
import { PaperPatternBG } from '@/components/graphics/Patterns';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import NordicGridPreview from './NordicGridPreview';
import BoldHeaderPreview from './BoldHeaderPreview';
import MinimalMonoPreview from './MinimalMonoPreview';
import BusinessPortraitPreview from './BusinessPortraitPreview';
import CleanA4Preview from './CleanA4Preview';
import ProLedgerPreview from './ProLedgerPreview';
import CompactFitPreview from './CompactFitPreview';
import ModernStripePreview from './ModernStripePreview';
import TemplateModal from '@/components/ui/TemplateModal';
import { Invoice } from '@/types/invoice';

export default function TemplatesGallery() {
  const reduce = useReducedMotion();
  const { templates } = HOME_V2_DATA;
  const router = useRouter();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    name: string;
    component: React.ComponentType<any>;
    templateId: string;
  } | null>(null);

  // Mock invoice data for preview
  const mockInvoice: Invoice = {
    company: {
      name: "Ventira Ltd",
      address: "221B Baker Street\nLondon, UK",
      email: "hello@ventira.co.uk",
      phone: "+44 20 7123 4567",
      vatNumber: "GB123456789",
      registrationNumber: "12345678"
    },
    client: {
      name: "Client Company Ltd",
      address: "123 Business Street\nLondon, UK",
      email: "billing@client.com",
      phone: "+44 20 7654 3210",
      vatNumber: "GB987654321"
    },
    items: [
      {
        description: "Design workshop",
        quantity: 2,
        unitPrice: 600,
        vatRate: 20
      },
      {
        description: "UI template",
        quantity: 1,
        unitPrice: 250,
        vatRate: 0
      }
    ],
    invoiceNumber: "VI-2025-001",
    issueDate: "2025-01-15",
    dueDate: "2025-01-29",
    currency: "EUR",
    vatMode: "Domestic",
    notes: "Payment within 14 days"
  };

  // Get template props based on template type
  const getTemplateProps = (templateId: string) => {
    const baseProps = {
      currency: mockInvoice.currency,
      zeroNote: "Zero-rated supply",
      logoUrl: undefined,
      items: mockInvoice.items.map(item => ({
        desc: item.description,
        qty: item.quantity,
        rate: item.unitPrice,
        tax: item.vatRate ?? 0
      })),
      sender: {
        company: mockInvoice.company.name,
        vat: mockInvoice.company.vatNumber,
        address: mockInvoice.company.address,
        city: "London",
        country: "UK",
        email: mockInvoice.company.email,
        phone: mockInvoice.company.phone
      },
      client: {
        company: mockInvoice.client.name,
        vat: mockInvoice.client.vatNumber,
        address: mockInvoice.client.address,
        city: "London",
        country: "UK",
        email: mockInvoice.client.email,
        phone: mockInvoice.client.phone
      },
      invoiceNo: mockInvoice.invoiceNumber,
      invoiceDate: mockInvoice.issueDate,
      invoiceDue: mockInvoice.dueDate,
      notes: mockInvoice.notes
    };

    // Calculate totals for InvoicePaper
    const subtotal = mockInvoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxTotal = mockInvoice.items.reduce(
      (sum, item) => sum + (item.quantity * item.unitPrice * ((item.vatRate ?? 0) / 100)),
      0
    );
    const total = subtotal + taxTotal;

    switch (templateId) {
      case 'clean-a4':
        return {
          ...baseProps,
          subtotal,
          taxTotal,
          total
        };
      case 'nordic-grid':
      case 'bold-header':
      case 'minimal-mono':
      case 'business-portrait':
        return {
          invoice: mockInvoice
        };
      default:
        return baseProps;
    }
  };

  // Handle template preview
  const handlePreview = async (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
      let TemplateComponent: React.ComponentType<any>;
      
      try {
        switch (templateId) {
          case 'clean-a4':
            TemplateComponent = (await import('@/components/generator/InvoicePaper')).default;
            break;
          case 'pro-ledger':
            TemplateComponent = (await import('@/components/pdf/InvoiceConstructionA4')).default;
            break;
          case 'compact-fit':
            TemplateComponent = (await import('@/components/pdf/InvoiceITServicesA4')).default;
            break;
          case 'modern-stripe':
            TemplateComponent = (await import('@/components/pdf/InvoiceConsultingA4')).default;
            break;
          case 'nordic-grid':
            TemplateComponent = (await import('@/components/pdf/InvoiceNordicGridA4')).default;
            break;
          case 'bold-header':
            TemplateComponent = (await import('@/components/pdf/InvoiceBoldHeaderA4')).default;
            break;
          case 'minimal-mono':
            TemplateComponent = (await import('@/components/pdf/InvoiceMinimalMonoA4')).default;
            break;
          case 'business-portrait':
            TemplateComponent = (await import('@/components/pdf/InvoiceBusinessPortraitA4')).default;
            break;
          default:
            return;
        }
        
        setSelectedTemplate({
          name: template.name,
          component: TemplateComponent,
          templateId: templateId
        });
        setIsModalOpen(true);
      } catch (error) {
        console.error('Failed to load template component:', error);
      }
    }
  };

  // Handle template use
  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      router.push(`/generator?template=${encodeURIComponent(template.name)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1221] mb-4">
          Professional Templates
        </h2>
        <p className="text-lg text-[#6B7280]">
          Choose from 8 carefully designed templates that work for any business
        </p>
      </motion.div>

      {/* Templates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template, index) => (
          <TemplateCard
            key={template.id}
            template={template}
            index={index}
            reduce={reduce}
            onPreview={handlePreview}
            onUse={handleUseTemplate}
          />
        ))}
      </div>

      {/* Template Modal */}
      {selectedTemplate && (
        <TemplateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          templateName={selectedTemplate.name}
          templateComponent={selectedTemplate.component}
          templateId={selectedTemplate.templateId}
          getTemplateProps={getTemplateProps}
        />
      )}
    </div>
  );
}

function TemplateCard({ template, index, reduce, onPreview, onUse }: { 
  template: { id: string; name: string; subtitle: string; previewLabel: string; status: string }, 
  index: number, 
  reduce: boolean | null,
  onPreview: (templateId: string) => void,
  onUse: (templateId: string) => void
}) {
  const [hovered, setHovered] = useState(false);

  const handleUseTemplate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUse(template.id);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPreview(template.id);
  };

  return (
    <motion.div
      className="group relative rounded-2xl border border-black/10 p-6 bg-white hover:shadow-lg cursor-pointer transition-all duration-200 focus-within:ring-2 focus-within:ring-[#0F766E]/30 focus-visible:ring-2 focus-visible:ring-[#0F766E]/30 outline-none"
      initial={!!reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={!!reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={!!reduce ? undefined : { y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="group"
      aria-label={`${template.name} template - ${template.subtitle}`}
      onClick={handleUseTemplate}
    >
      {/* Preview Placeholder */}
      <div className="relative h-32 rounded-xl bg-gradient-to-br from-[#F6F7F8] to-[#FFFFFF] border border-black/5 mb-4 overflow-hidden">
        {template.id === 'clean-a4' ? (
          <CleanA4Preview className="h-full" />
        ) : template.id === 'pro-ledger' ? (
          <ProLedgerPreview className="h-full" />
        ) : template.id === 'compact-fit' ? (
          <CompactFitPreview className="h-full" />
        ) : template.id === 'modern-stripe' ? (
          <ModernStripePreview className="h-full" />
        ) : template.id === 'nordic-grid' ? (
          <NordicGridPreview className="h-full" />
        ) : template.id === 'bold-header' ? (
          <BoldHeaderPreview className="h-full" />
        ) : template.id === 'minimal-mono' ? (
          <MinimalMonoPreview className="h-full" />
        ) : template.id === 'business-portrait' ? (
          <BusinessPortraitPreview className="h-full" />
        ) : (
          <>
            <PaperPatternBG className="text-[#0F766E]" />
            
            {/* Template Preview */}
            <div className="absolute inset-2 bg-white rounded-lg border border-black/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-[#0F766E] rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A4</span>
                </div>
                <p className="text-xs text-[#6B7280] font-medium">
                  {template.previewLabel}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Template Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-[#0B1221] group-hover:text-[#0F766E] transition-colors duration-200">
          {template.name}
        </h3>
        <p className="text-sm text-[#6B7280]">
          {template.subtitle}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="mt-4 flex gap-2">
        <Button 
          size="sm" 
          variant="outline"
          onClick={handlePreview}
          className="flex-1"
        >
          Preview
        </Button>
        <Button 
          size="sm" 
          onClick={handleUseTemplate}
          className="flex-1"
        >
          Use
        </Button>
      </div>
    </motion.div>
  );
}


