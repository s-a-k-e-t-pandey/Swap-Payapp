import {Request, Response, NextFunction} from "express"
import jwt from 'jsonwebtoken'
import { JWT_PAS } from "./config"

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"] as unknown as string;

    const verified = jwt.verify(token, JWT_PAS)

    if(verified){
        // @ts-ignore
        req.id = verified.id
        next()
    }else{
        return res.status(403).json({msg: "Invalid Credentials"})
    }
}