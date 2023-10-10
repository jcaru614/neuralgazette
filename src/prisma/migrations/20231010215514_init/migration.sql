-- CreateEnum
CREATE TYPE "Category" AS ENUM ('POLITICS', 'SPORTS', 'TECHNOLOGY', 'ENTERTAINMENT', 'HEALTH', 'SCIENCE', 'BUSINESS', 'WORLD', 'ECONOMY', 'LIFESTYLE');

-- CreateEnum
CREATE TYPE "OriginalBias" AS ENUM ('LEFT', 'CENTER', 'RIGHT');

-- CreateTable
CREATE TABLE "News" (
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "image" TEXT,
    "photoCredit" TEXT,
    "category" "Category" DEFAULT 'POLITICS',
    "originalUrl" TEXT,
    "originalBias" "OriginalBias" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
