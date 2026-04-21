import { type Request, type Response, type NextFunction, type Router  } from "express";
import { type HttpRequest, type HttpResponse, type ControllerFn } from "../types/https.types.js";
export const adaptRoute = (controller: ControllerFn) => {
  return async (req: Request, res: Response, next: NextFunction) => { 
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      // Usamos o optional chaining (?.) porque req.user pode estar indefinido 
      // no início do pipeline (antes do middleware de auth)
      userId: req.user?.id,
      userRole: req.user?.role,
    };

    try {
      const httpResponse = await controller(httpRequest);
      if(!httpResponse){
        return next()
      }

      // LÓGICA DE MIDDLEWARE: 
      // Se retornou sucesso (2xx) e o body é explicitamente null ou undefined.
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 && !httpResponse.body) {
        
        // Se o seu middleware retornou informações no campo 'locals' (como userId/Role)
        if (httpResponse.locals) {
          req.user = { 
            id: httpResponse.locals.user.id, 
            role: httpResponse.locals.user.role 
          };
        }
        
        // Se for um middleware de validação que alterou o body, repassamos o body limpo adiante
        if (httpRequest.body) {
          req.body = httpRequest.body;
        }

        return next(); // Chama o próximo da fila (outro middleware ou o controller)
      }

      // LÓGICA DE CONTROLLER:
      // Se chegou aqui, é um controller final. Ele envia a resposta e encerra o ciclo.
      return res.status(httpResponse.statusCode).json(httpResponse.body);

    } catch (error: any) {
      // Tratamento de erro padronizado para middlewares e controllers
      return res.status(error.statusCode || 500).json({
        error: error.message || "Internal Server Error"
      });
    }
  };
};