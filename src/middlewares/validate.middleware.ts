import { type Request, type Response, type NextFunction } from "express";
import {type z} from "zod"

export const validate = (schema: z.ZodTypeAny) =>
(req: Request, res: Response, next: NextFunction) =>{
    const result = schema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
            error: 'Dados inválidos.',
            details: result.error.flatten().fieldErrors
        })
    }
    req.body = result.data
    next()
}