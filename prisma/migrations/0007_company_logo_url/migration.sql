-- Add optional logoUrl to Company
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "logoUrl" TEXT;
