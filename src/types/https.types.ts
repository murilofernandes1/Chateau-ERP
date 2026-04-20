export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  userId?: string | undefined; // Adicione o undefined explicitamente aqui
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}

export type ControllerFn = (request: HttpRequest) => Promise<HttpResponse>;