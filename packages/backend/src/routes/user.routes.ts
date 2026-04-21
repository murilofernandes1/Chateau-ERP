import { UserController } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createUserSchema, loginSchema } from '../validators/user.validator.js'
import { adaptRoute } from '../lib/express-adapter.js'
import {type Router} from "../types/router.types.js"

export const UserRoutes = (router: Router) => {
  router.post('/register', adaptRoute(validate(createUserSchema)), adaptRoute(UserController.create));
  router.post('/login', adaptRoute(validate(loginSchema)), adaptRoute(UserController.login));

  router.get('/', adaptRoute(authMiddleware), adaptRoute(UserController.findAll));
  router.get('/:id', adaptRoute(authMiddleware), adaptRoute(UserController.findById));
  router.delete('/:id', adaptRoute(authMiddleware), adaptRoute(UserController.delete));
};