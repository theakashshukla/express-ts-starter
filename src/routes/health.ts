import { Router } from 'express'
import mongoose from 'mongoose'
import connectToDatabase from '../config/dbConfig'
import redisClient from '../config/redisConfig'

const router = Router()

router.get('/', async (req, res) => {
  try {
    await connectToDatabase()

    const redisStatus = redisClient
      ? await redisClient.ping()
      : 'Redis not connected'

    res.status(200).json({ status: 'OK', database: 'OK', redis: redisStatus })
  } catch (error) {
    if (error instanceof Error) {
      res.status(503).json({ status: 'ERROR', database: error.message })
    } else {
      console.error('Unexpected error type:', error)
      res.status(500).json({ status: 'ERROR', message: 'Unknown error' })
    }
  } finally {
    await mongoose.disconnect()
  }
})

export default router
