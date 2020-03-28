const winston = require('winston')

const LOG_DIR = process.env.LOG_DIR || '/var/logs/microservice/app.log'

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
})

if (process.env.NODE_ENV === 'production') {
  const customJsonFormat = winston.format.printf((info, opts) => {
    const msg = {
      message: info.message,
      level: info.level,
      timestamp: (new Date()).toISOString()
    }

    if ($ && $.namespace && $.namespace.get('reqId')) {
      msg['correlation-id'] = $.namespace.get('reqId')
    }
    return JSON.stringify(msg)
  })

  logger.add(new winston.transports.File({
    format: customJsonFormat,
    filename: LOG_DIR,
    maxsize: 10000000, // 10MB
    maxFiles: 5
  }))
}

module.exports = logger
