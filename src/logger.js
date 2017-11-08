import winston from 'winston'

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ]
})

export default logger