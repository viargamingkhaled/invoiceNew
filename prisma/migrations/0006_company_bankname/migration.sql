-- Add optional bankName to Company
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "bankName" TEXT;
