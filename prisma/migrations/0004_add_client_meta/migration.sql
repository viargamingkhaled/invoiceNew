-- Add clientMeta JSONB column to Invoice
ALTER TABLE "Invoice" ADD COLUMN IF NOT EXISTS "clientMeta" JSONB;
