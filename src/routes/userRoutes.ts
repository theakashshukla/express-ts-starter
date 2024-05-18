import { Router } from 'express'
import userControllers from '../controllers/userController'
import validate from '../middlewares/validationMiddleware'
import {
  baseFindIdValidationRules,
  loginValidationRules,
  registerValidationRules,
} from '../validators/userValidator'

const router = Router()

router.post(
  '/register',
  validate(registerValidationRules()),
  userControllers.register
)
router.post('/login', validate(loginValidationRules()), userControllers.login)
router.get(
  '/:id',
  validate(baseFindIdValidationRules()),
  userControllers.fetchUserById
)

export default router
