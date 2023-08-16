import winston from 'winston';

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set the log level
  format: winston.format.combine(
    winston.format.colorize(), // Colorize log output
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`) // Format log message
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: './logs/logs.log' }) // Log to a file
  ]
});

// Export the logger
export { logger };