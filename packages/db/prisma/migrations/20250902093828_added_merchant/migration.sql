/*
  Warnings:

  - You are about to drop the column `auth_type` on the `Merchant` table. All the data in the column will be lost.
  - Added the required column `password` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "auth_type",
ADD COLUMN     "password" TEXT NOT NULL;
