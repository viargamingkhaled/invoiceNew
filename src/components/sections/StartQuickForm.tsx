'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { HOME_V2_DATA } from '@/lib/home-v2-data';

export default function StartQuickForm() {
  const router = useRouter();
  const { quickStart } = HOME_V2_DATA;
  const { placeholders, vatModes, ctaLabel } = quickStart;

  const [formData, setFormData] = useState({
    company: placeholders.company,
    email: placeholders.email,
    vatMode: vatModes[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Generate URL with query params
    const vatSlug = formData.vatMode
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const params = new URLSearchParams({
      from: formData.company,
      email: formData.email,
      vat: vatSlug,
    });

    // Navigate to generator with pre-filled data
    router.push(`/generator?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-[#F6F7F8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1221] mb-4">
            Start in 30 seconds
          </h2>
          <p className="text-lg text-[#6B7280]">
            Fill in your details and jump straight to creating your first invoice
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-black/5 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Field */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-[#0B1221] mb-2">
                From company
              </label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder={placeholders.company}
                className={`w-full ${errors.company ? 'border-red-500 focus:ring-red-500/30' : ''}`}
                aria-describedby={errors.company ? 'company-error' : undefined}
              />
              {errors.company && (
                <p id="company-error" className="mt-1 text-sm text-red-600">
                  {errors.company}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#0B1221] mb-2">
                Email to send PDF
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={placeholders.email}
                className={`w-full ${errors.email ? 'border-red-500 focus:ring-red-500/30' : ''}`}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* VAT Mode Field */}
            <div>
              <label htmlFor="vatMode" className="block text-sm font-medium text-[#0B1221] mb-2">
                VAT mode
              </label>
              <Select
                id="vatMode"
                value={formData.vatMode}
                onChange={(event) => handleInputChange('vatMode', event.target.value)}
                className="w-full"
              >
                {vatModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </Select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Opening generator...' : ctaLabel}
              </Button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-black/10">
            <p className="text-sm text-[#6B7280] text-center">
              Your data is secure and will only be used to pre-fill the invoice generator.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



