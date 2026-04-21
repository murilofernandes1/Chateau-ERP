import {z} from 'zod'

export const createClientSchema = z.object({
    name: z.string().min(2, "The name must contain at least two characters."),
    email: z.string().email("Invalid email.").optional(),
    document: z.number().optional(),
})

export const editClientSchema = z.object({
    name: z.string().min(2, "The name must contain at least two characters.").optional(),
    email: z.string().email("Invalid email.").optional(),
    document: z.number().optional(),
})