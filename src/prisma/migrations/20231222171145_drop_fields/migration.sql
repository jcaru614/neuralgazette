/*
  Warnings:

  - You are about to drop the column `originalBias` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `originalUrl` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "originalBias",
DROP COLUMN "originalUrl";

-- DropEnum
DROP TYPE "OriginalBias";
