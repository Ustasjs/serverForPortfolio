const mongoose = require('mongoose');

module.exports.isAuth = function isAyth(req, res) {
  const User = mongoose.model('user');

  User
    .findOne({ login: req.body.login })
    .then(user => {
      if (!user) {
        return res.status(400).json({ status: 'error', message: 'Логин или пароль введены неверно' });
      }

      if (!user.validPassword(req.body.password)) {
        return res.status(400).json({ status: 'error', message: 'Логин или пароль введены неверно' });
      } else {
        res.status(200).json({ status: 'ok', message: 'Авторизация прошла успешно' });
      }
    })
    .catch(e => {
      res.status(400).json({ status: 'error', message: `Произошла ошибка: ${e.message}` })
    })
}