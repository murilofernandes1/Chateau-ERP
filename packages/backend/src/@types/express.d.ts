declare global {
  namespace Express {
    interface Request {
     user?:{
        role: string | undefined,
        id: string | undefined
     },
     client:{
        document: int
     }
    }
  }
}
export {}