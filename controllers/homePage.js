const request = require('request');
const apiOptions = {
  server: "http://localhost:3000"
};

module.exports.getIndex = function (req, res, next) {
  res.render('index');
}

module.exports.autorization = function (req, res, next) {

  if (!req.body.login || !req.body.password) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
  }

  const pathApi = '/api/user';
  const requestOptions = {
    url: apiOptions.server + pathApi,
    method: "POST",
    json: {
      login: req.body.login,
      password: req.body.password
    }
  };

  request(requestOptions, function (error, response, body) {
    if (body.status === 'error') {
      return res.status(430).json({ message: `${body.message}` });
    }

    req.session.isAdmin = true;
    res.status(200).json({ adress: "/adminpanel" });
  });

}
