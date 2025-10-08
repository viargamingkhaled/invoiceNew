export type TaxMode = "domestic" | "intraEU_rc" | "uk_eu_cross" | "export";

export interface Item {
  desc: string;
  qty: number;
  rate: number;
  tax: number;
}

export interface InvoiceData {
  region: string;
  country: string;
  currency: string;
  taxMode: TaxMode;
  lineTaxRate: number;
  items: Item[];
  sender: {
    companyName: string;
    vatReg: string;
    address: string;
    city: string;
    country: string;
    iban: string;
  };
  client: {
    companyName: string;
    vatReg: string;
    address: string;
    city: string;
    country: string;
    email?: string;
  };
  invoice: {
    number: string;
    date: string;
    due: string;
  };
  notes: string;
}

export interface CurrencyData {
  [country: string]: string;
}

export interface CountryCode {
  [country: string]: string;
}

export interface VatRates {
  [countryCode: string]: number[];
}

export interface InvoiceParty {
  name: string;
  vatNumber?: string;
  registrationNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  email?: string;
  phone?: string;
  iban?: string;
  bankName?: string;
  bic?: string;
  logoUrl?: string;
}

export interface InvoiceClient {
  name: string;
  vatNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  email?: string;
  phone?: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate?: number;
}

export interface Invoice {
  company: InvoiceParty;
  client: InvoiceClient;
  items: InvoiceLineItem[];
  invoiceNumber: string;
  issueDate: string;
  dueDate?: string;
  currency: string;
  vatMode?: string;
  notes?: string;
}



