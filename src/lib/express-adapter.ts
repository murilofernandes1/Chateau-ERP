import { type Request, type Response } from 'express';
import { type HttpRequest, type HttpResponse, type ControllerFn } from "../types/https.types.js";

export const adaptRoute = (controller: ControllerFn) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      userId: req.user?.id 
    };

    try {
      const httpResponse: HttpResponse = await controller(httpRequest);
      return res.status(httpResponse.statusCode).json(httpResponse.body);

    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        error: error.message || "Internal Server Error"
      });
    }
  };
};