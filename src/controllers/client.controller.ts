import { type ControllerFn } from "../types/https.types.js";
import { UserService } from "../services/user.service.js";

export const userController = {
  
  create: (async (req) => {
    const user = await UserService.create(req.body);
    return {
      statusCode: 201,
      body: user
    };
  }) as ControllerFn,

  login: (async (req) => {
    const result = await UserService.login(req.body);
    return {
      statusCode: 200, 
      body: result
    };
  }) as ControllerFn,

  findAll: (async (_req) => {
    const users = await UserService.findAll();
    return {
      statusCode: 200,
      body: users
    };
  }) as ControllerFn,

  findById: (async (req) => {
    const user = await UserService.findById(req.params.id);
    return {
      statusCode: 200,
      body: user
    };
  }) as ControllerFn,

  delete: (async (req) => {
    await UserService.delete(req.params.id);
    return {
      statusCode: 204, 
      body: null
    };
  }) as ControllerFn
};