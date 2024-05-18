import { check, ValidationChain } from 'express-validator'
import Service from '../models/userModel'

const baseUserValidationRules = (): ValidationChain[] => {
  return [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ]
}

export { baseUserValidationRules }
