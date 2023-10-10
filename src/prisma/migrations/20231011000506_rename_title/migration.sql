/*
  Warnings:

  - You are about to drop the column `title` on the `News` table. All the data in the column will be lost.
  - Added the required column `titles` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" RENAME COLUMN "title" TO "titles"
