import { type ControllerFn } from "../types/https.types.js";
import { ClientService } from "../services/client.service.js";

export const ClientController = {
  
  create: (async (req) => {
    const user = await ClientService.createClient(req.body);
    return {
      statusCode: 201,
      body: user
    };
  }) as ControllerFn,

  update: (async (req) => {
    const result = await ClientService.updateClient(req.params.id, req.body);
    return {
      statusCode: 200, 
      body: result
    };
  }) as ControllerFn,

  getAll: (async () => {
    const users = await ClientService.findAllClients();
    return {
      statusCode: 200,
      body: users
    };
  }) as ControllerFn,

  get: (async (req) => {
    const user = await ClientService.findClient(req.params.document);
    return {
      statusCode: 200,
      body: user
    };
  }) as ControllerFn,

  

  delete: (async (req) => {
    await ClientService.deleteClient(req.params.id);
    return {
      statusCode: 204, 
      body: null
    };
  }) as ControllerFn
};