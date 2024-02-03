-- AlterTable
ALTER TABLE "News" ADD COLUMN     "outboundLinks" TEXT[] DEFAULT ARRAY[]::TEXT[];
