import { Request, Response, NextFunction } from 'express'

interface HttpError extends Error {
  status?: number
}

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  console.error(`Error: ${message} | Status Code: ${status}`)
  res.status(status).json({
    error: {
      message,
      status,
    },
  })
}

export default errorHandler
