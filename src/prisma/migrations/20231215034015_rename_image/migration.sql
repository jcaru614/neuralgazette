/*
  Warnings:

  - You are about to drop the column `image` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "News" RENAME COLUMN "image" TO "photoPath";