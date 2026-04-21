import { type HttpRequest, type HttpResponse } from "../types/https.types.js";
import { type z } from "zod";

export const validate = (schema: z.ZodTypeAny) => {
  return async (httpRequest: HttpRequest): Promise<HttpResponse | void> => {
    const result = schema.safeParse(httpRequest.body);

    if (!result.success) {
      return {
        statusCode: 400,
        body: {
          error: 'Invalid data.',
          details: result.error.flatten().fieldErrors
        }
      };
    }

    httpRequest.body = result.data;

    return { statusCode: 200, body: null };
  };
};