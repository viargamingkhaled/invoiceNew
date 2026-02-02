/**
 * Spoynt Payment Gateway Integration
 * Documentation: https://docs.spoynt.com
 */

import crypto from 'crypto';
import type { Currency } from './currency';

// Spoynt API Configuration
const SPOYNT_API_URL = process.env.SPOYNT_API_URL || 'https://api.spoynt.com';
const SPOYNT_ACCOUNT_ID = process.env.SPOYNT_ACCOUNT_ID || '';
const SPOYNT_API_KEY = process.env.SPOYNT_API_KEY || '';
const SPOYNT_PUBLIC_KEY = process.env.SPOYNT_PUBLIC_KEY || '';
const SPOYNT_PRIVATE_KEY = process.env.SPOYNT_PRIVATE_KEY || '';

// Map currency to Spoynt payment service
export const CURRENCY_TO_SERVICE: Record<Currency, string> = {
  EUR: 'payment_card_eur_hpp',
  AUD: 'payment_card_aud_hpp',
  CAD: 'payment_card_cad_hpp',
  NZD: 'payment_card_nzd_hpp',
  NOK: 'payment_card_nok_hpp',
};
// Amount limits per currency (from Spoynt)
export const CURRENCY_LIMITS: Record<string, { min: number; max: number }> = {
  EUR: { min: 5, max: 100000 },
  AUD: { min: 5, max: 100000 },
  CAD: { min: 5, max: 100000 },
  NZD: { min: 5, max: 100000 },
  NOK: { min: 5, max: 1000000 },
};

// Default limits if currency not found
export const DEFAULT_LIMITS = { min: 5, max: 100000 };
// Get Basic Auth header
function getBasicAuthHeader(): string {
  const credentials = Buffer.from(`${SPOYNT_ACCOUNT_ID}:${SPOYNT_API_KEY}`).toString('base64');
  return `Basic ${credentials}`;
}

// Verify callback signature
export function verifyCallbackSignature(rawBody: string, signature: string, isTestMode: boolean = false): boolean {
  const secretKey = isTestMode 
    ? process.env.SPOYNT_TEST_PRIVATE_KEY || SPOYNT_PRIVATE_KEY
    : SPOYNT_PRIVATE_KEY;
  
  // Signature algorithm: base64(sha1(secret + body + secret))
  const expectedSignature = crypto
    .createHash('sha1')
    .update(secretKey + rawBody + secretKey)
    .digest('base64');
  
  return signature === expectedSignature;
}

export interface CreatePaymentParams {
  referenceId: string;
  amount: number;
  currency: Currency;
  description?: string;
  customerEmail: string;
  customerName?: string;
  returnUrl: string;
  callbackUrl: string;
  metadata?: Record<string, string>;
  testMode?: boolean;
}

export interface SpoyntPaymentResponse {
  success: boolean;
  paymentId?: string;
  hppUrl?: string;
  status?: string;
  error?: string;
}

/**
 * Create a payment invoice via Spoynt HPP (Hosted Payment Page)
 */
export async function createPaymentInvoice(params: CreatePaymentParams): Promise<SpoyntPaymentResponse> {
  const service = CURRENCY_TO_SERVICE[params.currency];
  
  if (!service) {
    return { success: false, error: `Unsupported currency: ${params.currency}` };
  }

  const requestBody = {
    data: {
      type: 'payment-invoices',
      attributes: {
        test_mode: params.testMode ?? false,
        reference_id: params.referenceId,
        amount: params.amount,
        currency: params.currency,
        service: service,
        description: params.description || 'Token top-up',
        descriptor: 'Ventira',
        customer: {
          reference_id: `customer_${params.referenceId}`,
          email: params.customerEmail,
          name: params.customerName || params.customerEmail.split('@')[0],
        },
        return_url: params.returnUrl,
        return_urls: {
          success: `${params.returnUrl}?status=success`,
          pending: `${params.returnUrl}?status=pending`,
          fail: `${params.returnUrl}?status=fail`,
        },
        callback_url: params.callbackUrl,
        metadata: {
          ...params.metadata,
          source: 'ventira_app',
        },
        gateway_options: {
          cardgate: {
            theme: 'spoynt',
            theme_options: {
              merchant_name: 'Ventira',
              powered_by: false,
              card_holder: true,
            },
            bypass_status_page: false,
            retry_limit: 3,
          },
        },
      },
    },
  };

  try {
    console.log('🔵 [SPOYNT LIB] Calling Spoynt API...');
    console.log('🔵 Request URL:', `${SPOYNT_API_URL}/payment-invoices`);
    console.log('🔵 Request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(`${SPOYNT_API_URL}/payment-invoices`, {
      method: 'POST',
      headers: {
        'Authorization': getBasicAuthHeader(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('🔵 [SPOYNT LIB] Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ [SPOYNT LIB] API Error:', response.status, JSON.stringify(errorData, null, 2));
      return {
        success: false,
        error: errorData.errors?.[0]?.detail || `API error: ${response.status}`,
      };
    }

    const data = await response.json();
    console.log('✅ [SPOYNT LIB] API Success. Full response:', JSON.stringify(data, null, 2));
    
    const attributes = data.data?.attributes;

    if (!attributes) {
      console.error('❌ [SPOYNT LIB] No attributes in response');
      return { success: false, error: 'Invalid API response' };
    }
    
    console.log('✅ [SPOYNT LIB] HPP URL:', attributes.hpp_url || attributes.flow_data?.action);

    return {
      success: true,
      paymentId: data.data.id,
      hppUrl: attributes.hpp_url || attributes.flow_data?.action,
      status: attributes.status,
    };
  } catch (error) {
    console.error('Spoynt API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get payment invoice status
 */
export async function getPaymentStatus(paymentId: string): Promise<{
  success: boolean;
  status?: string;
  resolution?: string;
  amount?: number;
  currency?: string;
  testMode?: boolean;
  error?: string;
}> {
  try {
    const response = await fetch(`${SPOYNT_API_URL}/payment-invoices/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': getBasicAuthHeader(),
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.errors?.[0]?.detail || `API error: ${response.status}`,
      };
    }

    const data = await response.json();
    const attributes = data.data?.attributes;

    return {
      success: true,
      status: attributes.status,
      resolution: attributes.resolution,
      amount: attributes.amount,
      currency: attributes.currency,
      testMode: attributes.test_mode,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Payment status constants
export const PaymentStatus = {
  PROCESS_PENDING: 'process_pending',
  PROCESSED: 'processed',
  PROCESS_FAILED: 'process_failed',
  CREATED: 'created',
} as const;

export type PaymentStatusType = typeof PaymentStatus[keyof typeof PaymentStatus];

// Check if payment is successful
export function isPaymentSuccessful(status: string): boolean {
  return status === PaymentStatus.PROCESSED;
}

// Check if payment is pending
export function isPaymentPending(status: string): boolean {
  return status === PaymentStatus.PROCESS_PENDING || status === PaymentStatus.CREATED;
}

// Check if payment failed
export function isPaymentFailed(status: string): boolean {
  return status === PaymentStatus.PROCESS_FAILED;
}
