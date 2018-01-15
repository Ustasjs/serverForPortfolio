const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/config.json');
require('./api/models/db');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const index = require('./routes/index');
const indexApi = require('./api/routes/index');

const app = express();

const isAdmin = function (req, res, next) {
  if (req.session.isAdmin) {
    return next();
  } else {
    res.redirect('/');
  }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: config.session.secret,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(express.static(path.join(__dirname, 'public')));

// cors убрать на продакшене

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://92.53.104.80:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use('/', index);

app.use('/api', indexApi);


app.get('/portfolio', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', "portfolio.html"))
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', "about.html"))
});

app.get('/blog', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', "blog.html"))
});

app.get('/adminpanel', isAdmin, (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', "admin.html"))
});
app.get('/adminpanel/blog', isAdmin, (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', "admin.html"))
});
app.get('/adminpanel/works', isAdmin, (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', "admin.html"))
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
