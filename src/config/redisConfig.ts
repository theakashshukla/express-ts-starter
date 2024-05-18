import { createClient, RedisClientType } from 'redis'
import config from '.'

let redisClient: RedisClientType | undefined

async function connectToRedis() {
  try {
    if (!config.redisUrl) {
      console.warn('Warning: Redis URL not configured. Redis will not be used.')
      return
    }

    redisClient = createClient({
      url: config.redisUrl,
      socket: {
        connectTimeout: 5000, // Use socket.connectTimeout
      },
    })

    redisClient.on('error', (err: Error) => {
      if (err.name === 'ConnectionTimeoutError') {
        console.error(
          'Redis connection timeout. Check your Redis URL and network connectivity.'
        )
      } else {
        console.error('Redis connection error:', err)
      }
    })

    redisClient.on('connect', () => {
      console.log('Connected to Redis!')
    })

    await redisClient.connect()
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'InvalidURIError') {
        console.error('Invalid Redis URL:', error.message)
      } else {
        console.error('Error connecting to Redis:', error.message)
      }
    } else {
      console.error('Unexpected error connecting to Redis:', error)
    }
  }
}

connectToRedis().catch((err) => {
  console.error('Failed to establish Redis connection:', err)
})

export default redisClient
