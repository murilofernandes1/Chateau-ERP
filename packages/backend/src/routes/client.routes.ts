import { ClientController } from "../controllers/client.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createClientSchema, editClientSchema } from "../validators/client.validator.js";
import {type Router} from "../types/router.types.js"
import { adaptRoute } from "../lib/express-adapter.js";

export const ClientRoutes = (router: Router) => {
    router.post(
        '/create', 
        adaptRoute(authMiddleware), 
        adaptRoute(validate(createClientSchema)), 
        adaptRoute(ClientController.create)
    );

    router.put(
        '/:id/edit', 
        adaptRoute(authMiddleware), 
        adaptRoute(validate(editClientSchema)),  
        adaptRoute(ClientController.update)
    );

    router.get('/', adaptRoute(authMiddleware), adaptRoute(ClientController.getAll));
    router.get('/:id', adaptRoute(authMiddleware), adaptRoute(ClientController.get));
}