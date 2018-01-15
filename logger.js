const winston = require('winston');
const logDir = 'logs';
const fs = require('fs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: `${logDir}/combined.log`,
      level: 'info'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: `${logDir}/exceptions.log` })
  ],
  exitOnError: false
});

module.exports = logger;