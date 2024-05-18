import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'

interface RateLimiterConfig extends Partial<RateLimitRequestHandler> {
  windowMs: number
  max: number
  keyGenerator?: (req: any) => string
}

const rateLimiterConfig: Record<string, RateLimiterConfig> = {
  api: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  login: {
    windowMs: 60 * 1000,
    max: 5,
  },
  userRateLimit: {
    windowMs: 60 * 60 * 1000,
    max: 500,
    keyGenerator: (req) => req.user?.id || req.ip,
  },
}

const createRateLimiter = (limiterConfig: RateLimiterConfig) => {
  return rateLimit(limiterConfig)
}

const apiLimiter = createRateLimiter(rateLimiterConfig.api)
const loginLimiter = createRateLimiter(rateLimiterConfig.login)
const userRateLimiter = createRateLimiter(rateLimiterConfig.userRateLimit)

export { apiLimiter, loginLimiter, userRateLimiter }
