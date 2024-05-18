import jwt from 'jsonwebtoken'
import config from '../config'

export const generateToken = (payload: object): string => {
  if (!config.jwtSecret) {
    throw new Error('JWT secret is not defined')
  }
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' })
}

export const verifyToken = (token: string): any => {
  if (!config.jwtSecret) {
    throw new Error('JWT secret is not defined')
  }
  try {
    return jwt.verify(token, config.jwtSecret)
  } catch (error) {
    return null
  }
}
