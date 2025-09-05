"use server"
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import db from '@repo/db/client'

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await db.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await db.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "UserAccount" WHERE "userId"= ${from} FROM UPDATE`;
        const fromBalance = await tx.userAccount.findUnique({
            where: { userId: from },
          });
          if (!fromBalance || fromBalance.balance < amount) {
            throw new Error('Insufficient funds');
          }

          await new Promise(r => setTimeout(r, 1000));

          await tx.userAccount.update({
            where: { userId: from },
            data: { balance: { decrement: amount } },
          });

          await tx.userAccount.update({
            where: { userId: toUser.id },
            data: { balance: { increment: amount } },
          });

          await tx.p2PTransfer.create({
            data: {
                fromUser: session?.user?.email,
                toUser: toUser.number,
                amount,
                timeStamp: new Date()
            }
          })
    },{
        maxWait: 50000,
        timeout: 100000
    });
}