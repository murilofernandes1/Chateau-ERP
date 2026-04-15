import {Router} from 'express'
import { userController } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createUserSchema, loginSchema } from '../validators/user.validator.js'

const router = Router()

router.post('/register', validate(createUserSchema), userController.create)
router.post('/login', validate(loginSchema), userController.login)

router.get('/', authMiddleware, userController.findAll)
router.get('/:id', authMiddleware, userController.findById)
router.delete('/:id', authMiddleware, userController.delete)

export default router