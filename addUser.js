const mongoose = require('mongoose');
const readline = require('readline');
const logger = require('./logger');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const config = require('./config/config.json');
require('./api/models/user');
let login = '';
let password = '';

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
    useMongoClient: true
  })
  .catch(e => {
    console.error(e);
    logger.error(e.message);
    throw e;
  });

rl.question('Логин: ', answer => {
  login = answer;

  rl.question('Пароль: ', amswer => {
    password = answer;

    rl.close();
  })
});

rl.on('close', () => {
  const User = mongoose.model('user');
  const adminUser = new User({ login })

  adminUser.setPassword(password);

  User
    .findOne({ login })
    .then(user => {
      if (user) {
        throw new Error('Такой пользователь уже существует!');
      }

      return adminUser.save();
    })
    .then(user => {
      console.log('Ок!');
      logger.info('Ок!');
    },
    error => {
      console.error(error.message);
      logger.error(error.message);
    })
    .then(() => {
      mongoose.connection.close(() => process.exit(0));
    })
});