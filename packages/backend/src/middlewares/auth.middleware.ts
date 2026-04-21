import { type HttpRequest, type HttpResponse } from "../types/https.types.js";
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const authMiddleware = async (req: HttpRequest): Promise<HttpResponse | void> => {
  const auth = req.headers.authorization as string;

  if (!auth?.startsWith('Bearer ')) {
    return { statusCode: 401, body: { error: 'Token not provided.' } };
  }

  try {
    const secret = process.env.JWT_SECRET || '';
    if(!secret){
      return{
        statusCode: 500,
        body:{error: 'An internal server error occurred.'}
      }
    }

    const token = auth.split(' ')[1];
    if(!token){
      return {
        statusCode: 401,
        body: {error: 'Malformed token.'}
      }
    }
    
    const payload = jwt.verify(token, secret) as JwtPayload

    return { 
      statusCode: 200, 
      body: null, 
      locals: { user:{ id: payload.id,  role: payload.role} } 
    };
  } catch {
    return { statusCode: 401, body: { error: 'Token inválido' } };
  }
};