import { check, ValidationChain } from 'express-validator'
import User from '../models/userModel'

const baseUserValidationRules = (): ValidationChain[] => {
  return [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ]
}

const baseFindIdValidationRules = (): ValidationChain[] => {
  return [check('id').isMongoId().withMessage('Invalid ID')]
}

const registerValidationRules = (): ValidationChain[] => {
  return [
    ...baseUserValidationRules(),
    check('name').notEmpty().withMessage('Name is required'),
    check('email').custom(async (value) => {
      const existingUser = await User.findOne({ email: value })
      if (existingUser) {
        throw new Error('Email already in use')
      }
    }),
    check('phoneNumber')
      .optional()
      .isMobilePhone('en-IN')
      .withMessage('Invalid phone number'),
    check('type')
      .isIn(['sales', 'support', 'manager', 'finance', 'marketing', 'user'])
      .withMessage('Invalid user type'),
  ]
}

const loginValidationRules = (): ValidationChain[] => {
  return baseUserValidationRules()
}

const updateUserValidationRules = (): ValidationChain[] => {
  return [
    check('id').isMongoId().withMessage('Invalid user ID'),
    check('name').optional().isString().withMessage('Name must be a string'),
    check('email')
      .optional()
      .isEmail()
      .withMessage('Invalid email format')
      .custom(async (value, { req }) => {
        if (!req || !req.params || !req.params.id) {
          throw new Error('Invalid request')
        }
        const existingUser = await User.findOne({
          email: value,
          _id: { $ne: req.params.id },
        }) // Check uniqueness excluding the current user
        if (existingUser) {
          throw new Error('Email already in use')
        }
      }),
    check('phoneNumber')
      .optional()
      .isMobilePhone('en-IN')
      .withMessage('Invalid phone number'),
    check('type')
      .optional()
      .isIn([
        'admin',
        'sales',
        'support',
        'manager',
        'finance',
        'marketing',
        'user',
      ])
      .withMessage('Invalid user type'),
    check('status')
      .optional()
      .isIn(['active', 'inactive'])
      .withMessage('Invalid status'),
  ]
}

const deleteUserValidationRules = (): ValidationChain[] => {
  return baseFindIdValidationRules()
}

export {
  registerValidationRules,
  loginValidationRules,
  updateUserValidationRules,
  deleteUserValidationRules,
  baseFindIdValidationRules,
}
