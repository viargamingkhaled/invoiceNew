-- Alter enum InvoiceStatus to add Ready and Error
DO $$ BEGIN
  ALTER TYPE "InvoiceStatus" ADD VALUE IF NOT EXISTS 'Ready';
  ALTER TYPE "InvoiceStatus" ADD VALUE IF NOT EXISTS 'Error';
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
