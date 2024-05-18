import mongoose from 'mongoose'
import config from '.'

const MAX_RETRIES = 5
const RETRY_DELAY = 2000

const connectToDatabase = async () => {
  // Check for existing connection
  if (mongoose.connection.readyState === 1) {
    // 1 indicates 'connected'
    console.log('MongoDB already connected.')
    return // Exit if already connected
  }

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      if (!config.dbUri) {
        throw new Error('Missing DATABASE_URI in config')
      }

      await mongoose.connect(config.dbUri)
      await mongoose.connection.db.admin().ping()

      const dbName = mongoose.connection.db.databaseName
      console.log(`🗄️ [database]: Database Connected to ${dbName}`)

      return
    } catch (error) {
      console.error(`Database connection error (attempt ${i + 1}):`, error)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
    }
  }

  throw new Error('Failed to connect to database after multiple retries.')
}

export default connectToDatabase
