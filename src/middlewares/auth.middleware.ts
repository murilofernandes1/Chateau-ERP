import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      userId?: string
      userRole?: string
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  try {
    const secret = process.env.JWT_SECRET || ''
    if (!secret) {
    throw new Error('JWT_SECRET não está definido nas variáveis de ambiente')
    }
    const token = auth.split(' ')[1]
    // @ts-ignore
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    req.userId = payload.id
    req.userRole = payload.role
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}