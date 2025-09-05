import {Router} from "express";
import db from '@repo/db/client'
import { authMiddleware } from "src/middleware";

export const userRouter = Router();




userRouter.post("/transfer", authMiddleware, async(req, res)=> {
    const {merchant, amount} = req.body;
    // @ts-ignore
    const userId = req.id;

    const paymentdone = await db.$transaction(async tx=> {
        await tx.$queryRaw`SELECT * FROM "UserAccount" WHERE "userId"= ${userId} FROM UPDATE`;
        const userAccount = await tx.userAccount.findUnique({
            where: userId
        });

        if(!userAccount || (userAccount?.balance || 0) < amount) {
            return false;
        }

        await new Promise(r => setTimeout(r, 1000));

        await tx.userAccount.update({
            where: {userId},
            data: {
                balance: {
                    decrement: amount
                }
            }
        });

        await tx.merchantAccount.update({
            where: {merchantId: merchant},
            data: {
                balance: {
                    increment: amount
                }
            }
        });
        console.log("transaction done");
        return true;
    }, {
        maxWait: 50000,
        timeout: 100000
    });
    if(paymentdone) {
        return {
            message: "Success"
        }
    }
    else {
        return res.status(411).json({
            message: "Error while sending"
        })
    }
})




// useRouter.post("/signup", async(req, res)=> {

// })

// useRouter.post("/signin", async(req, res)=> {

// })