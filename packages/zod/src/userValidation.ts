import z from "zod"

const userValidation = z.object({
    // phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    phone: z
        .string()
        .min(10, { message: 'Must be valid mobile number' })
        .max(14, { message: 'Must be valid mobile number'}),
    // Contains at least one lowercase letter ((?=.*[a-z]))
    // Contains at least one uppercase letter ((?=.*[A-Z]))
    // Contains at least one digit ((?=.*\d))
    // Has a minimum length of 8 characters (.{8,})
    password: z.string().min(3, "Password must be at least 3 characters long")
})

export type userCredential = z.infer<typeof userValidation>

export default userValidation;


