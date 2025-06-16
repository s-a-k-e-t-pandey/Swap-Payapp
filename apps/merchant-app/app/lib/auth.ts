import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the built-in session types
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
}

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (!user?.email || !account) {
                console.error("Missing required sign-in information");
                return false;
            }

            try {
                const merchant = await db.merchant.upsert({
                    where: {
                        email: user.email
                    },
                    create: {
                        email: user.email,
                        name: user.name || user.email.split('@')[0],
                        auth_type: "Google"
                    },
                    update: {
                        name: user.name || undefined,
                        auth_type: "Google"
                    }
                });

                return true;
            } catch (error) {
                console.error("Error during merchant sign-in:", error);
                return false;
            }
        },
        async session({ session, token }) {
            if (session.user) {
                try {
                    const merchant = await db.merchant.findUnique({
                        where: { email: session.user.email || "" }
                    });
                    
                    if (merchant) {
                        session.user.id = merchant.id.toString();
                        session.user.name = merchant.name || session.user.name;
                    }
                } catch (error) {
                    console.error("Error fetching merchant session data:", error);
                }
            }
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.provider = account.provider;
            }
            return token;
        }
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: process.env.NODE_ENV === "development"
}