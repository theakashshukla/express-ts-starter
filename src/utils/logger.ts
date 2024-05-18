import morgan, { StreamOptions } from 'morgan'
import fs from 'fs'
import path from 'path'
import config from '../config'

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../../logs/access.log'),
  { flags: 'a' }
)

const stream: StreamOptions = {
  write: (message) => accessLogStream.write(message),
}

const skip = () => {
  const env = config.nodeEnv || 'development'
  return env === 'test'
}

// Create a logger middleware based on the environment
const morganMiddleware = () => {
  const env = process.env.NODE_ENV || 'development'
  if (env === 'production') {
    return morgan('combined', { stream, skip })
  } else {
    return morgan('dev', { skip })
  }
}

export default morganMiddleware
