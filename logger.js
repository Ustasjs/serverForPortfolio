const winston = require('winston');
const logDir = 'logs';
const path = require('path');
const fs = require('fs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: path.join(logDir, '/combined.txt'),
      level: 'info'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logDir, '/exceptions.txt') })
  ],
  exitOnError: false
});

module.exports = logger;