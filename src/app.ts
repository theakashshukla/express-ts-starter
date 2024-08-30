import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes/index'
import health from './routes/health'
import connectToDatabase from './config/dbConfig'
import errorHandler from './middlewares/errorHandler'
import config from './config'
import logger from './utils/logger';
const app: Express = express()

app.use(cors())
app.use(helmet())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)
app.use('/health', health)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API')
})


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  logger.info(`Original URL: ${req.originalUrl}`);

  if (err.name === 'ValidationError') {
    res.status(400).json({ message: 'Validation error', errors: (err as any).errors });
  } else {
    res.status(500).send('Something went wrong!');
  }
});

app.use(errorHandler)

const startServer = async () => {
  try {
    await connectToDatabase()

    app.listen(config.port, () => {
      // console.log(
      //   `⚡️[server]: Server is running at http://localhost:${config.port}`
      // )
      logger.info(`⚡️[server]: Server is running at http://localhost:${config.port}`);
    })
  } catch (error) {
    logger.error('Fatal Error during server startup:', error);
    process.exit(1)
  }
}


startServer()
