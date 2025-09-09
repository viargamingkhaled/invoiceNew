-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "due" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
