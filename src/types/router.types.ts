type RequestHandler = (req: any, res: any, next: any) => Promise<any>;

export interface Router {
  post: (path: string, ...handlers: RequestHandler[]) => void;
  get: (path: string, ...handlers: RequestHandler[]) => void;
  delete: (path: string, ...handlers: RequestHandler[]) => void;
  put: (path: string, ...handlers: RequestHandler[]) => void;
}