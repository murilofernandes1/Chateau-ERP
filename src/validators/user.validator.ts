import {z} from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'MANAGER', 'SALES' ]).optional()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
})