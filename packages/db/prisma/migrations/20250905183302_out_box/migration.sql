-- CreateTable
CREATE TABLE "OnRampTransactionOutbox" (
    "id" SERIAL NOT NULL,
    "onRampTxnId" INTEGER NOT NULL,

    CONSTRAINT "OnRampTransactionOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransactionOutbox_onRampTxnId_key" ON "OnRampTransactionOutbox"("onRampTxnId");

-- AddForeignKey
ALTER TABLE "OnRampTransactionOutbox" ADD CONSTRAINT "OnRampTransactionOutbox_onRampTxnId_fkey" FOREIGN KEY ("onRampTxnId") REFERENCES "OnRampTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
