import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { UserPayload } from '../utils/authUtils'

interface AuthenticatedRequest extends Request {
  userPayload?: UserPayload
}

const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, config.jwtSecret!) as UserPayload
    req.userPayload = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export default authenticate
