const mongoose = require('mongoose');
const multiparty = require('multiparty');
const utils = require('../../utils');

module.exports.getArticles = function (req, res) {
  const Blog = mongoose.model('blog');

  Blog.find()
    .then(items => {
      items = items.map(elem => utils.toClient(elem));
      res.status(200).json({ articles: items });
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: `Произошла ошибка ${err.message}` });
    })
}

module.exports.createArticle = function (req, res) {
  const Blog = mongoose.model('blog');
  const data = new multiparty.Form();

  data.parse(req, function (err, fields) {
    if (err) {
      res.status(400).json({ message: `При парсинге данных произошла ошибка ${err.message}` });
    }

    const item = new Blog({
      name: fields.name,
      date: new Date(fields.date),
      content: fields.content
    });

    item
      .save()
      .then(item => {
        res.status(201).json({ message: 'Запись успешно добавлена' });
      })
      .catch(err => {
        res.status(400).json({ message: `При добавлении записи произошла ошибка ${err.message}` });
      });
  })
}

module.exports.deleteArticle = function (req, res) {
  const id = req.params.id;
  const Blog = mongoose.model('blog');

  Blog.findByIdAndRemove(id)
    .then(item => {
      if (!!item) {
        res.status(200).json({ message: 'Запись успешно удалена' });
      } else {
        res.status(404).json({ message: 'Запись в БД не обнаружена' });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: `При удалении записи произошла ошибка: ' + ${err.message}`
      });
    });
}