const mongoose = require('mongoose');
const config = require('../../config/config');
const logger = require('../../logger');
require('./blog');
require('./portfolio');
require('./skills');
require('./user');

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
    useMongoClient: true
  })
  .catch(e => {
    logger.error(e);
    throw e;
  });

mongoose.connection.on('connected', function () {
  console.log(
    `Mongoose default connection open mongodb://${config.db.host}:${
    config.db.port
    }/${config.db.name}`
  );
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
  logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});