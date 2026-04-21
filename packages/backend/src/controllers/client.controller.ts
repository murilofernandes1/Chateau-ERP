import { type ControllerFn } from "../types/https.types.js";
import { ClientService } from "../services/client.service.js";

export const ClientController = {
  
  create: (async (req) => {
    const client = await ClientService.createClient(req.body);
    return {
      statusCode: 201,
      body: client
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
    const clients = await ClientService.findAllClients();
    return {
      statusCode: 200,
      body: clients
    };
  }) as ControllerFn,

  getByDocument: (async (req) => {
    const client = await ClientService.findClientByDocument(req.body);
    return {
      statusCode: 200,
      body: client
    };
  }) as ControllerFn,

  getById:(async (req) => {
    const client = await ClientService.findClientById(req.params.id)
    return{
      statusCode:200,
      body: client
    }
  }) as ControllerFn,

  delete: (async (req) => {
    await ClientService.deleteClient(req.params.id);
    return {
      statusCode: 204, 
      body: null
    };
  }) as ControllerFn
};