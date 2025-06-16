import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt' 
import userValidation from "@repo/zod/userValidation"
import db from '@repo/db/client'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: 'Phone number', type: 'text', placeholder: 'phone' },
                password: { label: 'Password', type: 'password', placeholder: 'password' }
            },
            authorize: async (credentials) => {
                console.log(credentials)
                const validation = userValidation.safeParse(credentials)
                if(!validation.success) {
                    console.log('invalid credentials')
                    return null
                } 

                const hashedPassword = await bcrypt.hash(credentials!.password, 10)
                const userExists = await db.user.findFirst({
                    where: {
                        number: credentials!.phone
                    }
                })

                if(userExists) {
                    console.log('Existing User')
                    const passwordValidation = await bcrypt.compare(credentials!.password, userExists.password)
                    if(passwordValidation) {
                        console.log("Correct password")
                        return {
                            id: userExists.id.toString(),
                            name: userExists.name,
                            email: userExists.number
                        }
                    }
                    return null
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials!.phone,
                            password: hashedPassword
                        }
                    })
                    console.log('new user created')
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                } catch(e) {
                    console.log(e)
                }

                return null
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        session: ({session, token}: any) => {
            if(session && session.user) {
                session.user.id = token.sub
                console.log(session)    
            }
            return session
        }
    }
}

export default authOptions