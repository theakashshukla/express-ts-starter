import { Request, Response, NextFunction } from 'express'
import User, { UserDocument } from '../models/userModel'
import { UserPayload } from '../utils/authUtils'

interface AuthenticatedRequest extends Request {
  userPayload?: UserPayload
  user?: UserDocument
}

const authorize = (allowedRoles: string[], checkDb = false) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.userPayload) {
      return res.sendStatus(401)
    }

    if (!allowedRoles.some((role) => req.userPayload!.roles.includes(role))) {
      return res.sendStatus(403)
    }

    if (checkDb) {
      try {
        const user = await User.findById(req.userPayload.id)
        if (!user || user.status !== 'active') {
          return res.sendStatus(403)
        }
        req.user = user
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }

    next()
  }
}

export default authorize
