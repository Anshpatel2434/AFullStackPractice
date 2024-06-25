import {z} from "zod"

const Signup = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export type SingupInput = z.infer<typeof Signup>