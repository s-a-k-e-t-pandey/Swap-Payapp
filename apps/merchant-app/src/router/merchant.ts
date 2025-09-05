import {Router} from "express";
import merchantValidation from "@repo/zod/merchantValidation";
import db from '@repo/db/client'
import jwt from 'jsonwebtoken'
import { JWT_PAS } from "src/config";

export const merchantRouter = Router();


merchantRouter.post("/signup", async(req, res)=> {
    const {email, phone, password} = merchantValidation.parse(req.body);
    try {
        const merchant = await db.$transaction(async (tx) => {
            const user = await db.merchant.create({
                data: {
                    email,
                    ...(phone ? { phone } : {}),
                    password
                }
            });
            await tx.merchantAccount.create({
                data: {
                    merchantId: user.id
                }
            })
            return user
        })
        res.status(200).json({msg: "Merchant created successfully"})
    }catch(e){
        return res.status(500).json({msg: "Error while signing up"})
    }
})


merchantRouter.post("/signin", async(req, res)=> {
    const {email, phone, password} = merchantValidation.parse(req.body);
    try {
        const merchant = await db.merchant.findFirst({
            where: {
                email,
                ...(phone ? { phone } : {}),
                password
            }
        })
        if(!merchant) {
            return res.status(403).json({msg: "Invalid Credentials"})
        }
        const token = jwt.sign({ id: merchant.id }, JWT_PAS)
        res.status(200).json({token})
    }catch(e){
        return res.status(500).json({msg: "Error while signing up"})
    }
})