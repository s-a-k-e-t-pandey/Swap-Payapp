/*
  Warnings:

  - The primary key for the `Merchant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MerchantAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OnRampTransaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OnRampTransactionOutbox` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `P2PTransfer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "MerchantAccount" DROP CONSTRAINT "MerchantAccount_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "OnRampTransactionOutbox" DROP CONSTRAINT "OnRampTransactionOutbox_onRampTxnId_fkey";

-- DropForeignKey
ALTER TABLE "UserAccount" DROP CONSTRAINT "UserAccount_userId_fkey";

-- AlterTable
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Merchant_id_seq";

-- AlterTable
ALTER TABLE "MerchantAccount" DROP CONSTRAINT "MerchantAccount_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "merchantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MerchantAccount_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MerchantAccount_id_seq";

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OnRampTransaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OnRampTransaction_id_seq";

-- AlterTable
ALTER TABLE "OnRampTransactionOutbox" DROP CONSTRAINT "OnRampTransactionOutbox_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "onRampTxnId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OnRampTransactionOutbox_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OnRampTransactionOutbox_id_seq";

-- AlterTable
ALTER TABLE "P2PTransfer" DROP CONSTRAINT "P2PTransfer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "P2PTransfer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "P2PTransfer_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserAccount" DROP CONSTRAINT "UserAccount_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserAccount_id_seq";

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantAccount" ADD CONSTRAINT "MerchantAccount_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnRampTransactionOutbox" ADD CONSTRAINT "OnRampTransactionOutbox_onRampTxnId_fkey" FOREIGN KEY ("onRampTxnId") REFERENCES "OnRampTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
