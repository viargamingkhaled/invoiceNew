-- Alter rate to decimal(12,2) on invoice items
ALTER TABLE "InvoiceItem" ALTER COLUMN "rate" TYPE NUMERIC(12,2) USING "rate"::numeric(12,2);

-- Alter invoice totals to decimal(12,2)
ALTER TABLE "Invoice" ALTER COLUMN "subtotal" TYPE NUMERIC(12,2) USING "subtotal"::numeric(12,2);
ALTER TABLE "Invoice" ALTER COLUMN "tax" TYPE NUMERIC(12,2) USING "tax"::numeric(12,2);
ALTER TABLE "Invoice" ALTER COLUMN "total" TYPE NUMERIC(12,2) USING "total"::numeric(12,2);
