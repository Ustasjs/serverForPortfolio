const mongoose = require('mongoose');
const logger = require('../../logger');
const utils = require('../../utils');

module.exports.getArticles = function (req, res) {
  const Blog = mongoose.model('blog');

  Blog.find()
    .then(items => {
      items = items.map(elem => utils.toClient(elem));
      res.status(200).json({ articles: items });
    })
    .catch(e => {
      logger.error(e);
      res.status(400).json({ message: `Произошла ошибка ${err.message}` });
    })
}

module.exports.createArticle = function (req, res) {
  const Blog = mongoose.model('blog');
  const body = req.body;

  const item = new Blog({
    name: body.name,
    date: new Date(body.date),
    content: body.content
  });

  item
    .save()
    .then(item => {
      res.status(201).json({ message: 'Запись успешно добавлена' });
    })
    .catch(err => {
      res.status(400).json({ message: `При добавлении записи произошла ошибка ${err.message}` });
    });

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