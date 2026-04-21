export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  userId?: string | undefined; 
  userRole: string | undefined;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
  locals?:{
    user:{
      id?: string,
      role?: string
    }
  }
}

export type ControllerFn = (request: HttpRequest) => Promise<HttpResponse | void> ;