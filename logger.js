const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: `${__dirname}/logs/combined.log`, level: 'info' })
  ]
});

module.exports = logger;