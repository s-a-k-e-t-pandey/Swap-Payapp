import z from "zod";

const userValidation = z.object({
  phone: z
    .string()
    .min(10, { message: "Must be valid mobile number" })
    .max(14, { message: "Must be valid mobile number" })
    .optional(),
  email: z
    .string()
    .email({ message: "Must be a valid email" }),
  password: z.string().min(3, "Password must be at least 3 characters long"),
})

export default userValidation;


