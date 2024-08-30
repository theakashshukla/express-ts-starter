import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = createLogger({
  level: 'info', 
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
    format.json() 
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple() // Simple format for console output
      ),
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug' // Higher level for production
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // Compress older logs
      maxSize: '20m', // Maximum log file size
      maxFiles: '10d', // Retain logs for 10 days
      level: 'error', // Log only errors
    }),
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // Compress older logs
      maxSize: '20m', // Maximum log file size
      maxFiles: '10d', // Retain logs for 10 days
      level: 'info', // Log info and above
    }),
  ],
});

export default logger;
