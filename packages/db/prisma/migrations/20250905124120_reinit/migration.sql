/*
  Warnings:

  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "Balance";

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "locked" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantAccount" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "locked" INTEGER NOT NULL DEFAULT 0,
    "merchantId" INTEGER NOT NULL,

    CONSTRAINT "MerchantAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_userId_key" ON "UserAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantAccount_merchantId_key" ON "MerchantAccount"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_phone_key" ON "Merchant"("phone");

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantAccount" ADD CONSTRAINT "MerchantAccount_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
