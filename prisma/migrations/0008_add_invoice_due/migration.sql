-- Add optional due date to Invoice
ALTER TABLE "Invoice" ADD COLUMN IF NOT EXISTS "due" TIMESTAMP WITH TIME ZONE;
