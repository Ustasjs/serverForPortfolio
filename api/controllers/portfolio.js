const mongoose = require('mongoose');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const utils = require('../../utils');
const logger = require('../../logger');


module.exports.getWorks = function (req, res) {
  const Portfolio = mongoose.model('work');

  Portfolio.find().then(items => {

    items = items.map(elem => utils.toClient(elem));
    res.status(200).json({ works: items });
  }).catch(e => {
    logger.error(e);
    res.status(400).json({ message: `Произошла ошибка ${err.message}` });
  })
}

module.exports.createWork = function (req, res) {
  const Portfolio = mongoose.model('work');
  const data = new multiparty.Form();
  let upload = 'public/upload';
  let fileName;

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  data.parse(req, function (err, fields, files) {
    if (err) {
      res.status(400).json({ message: `При парсинге данных произошла ошибка ${err.message}` });
    }

    const filePath = files.picture[0].path;
    const fileOriginalName = files.picture[0].originalFilename;

    fileName = path.join(upload, fileOriginalName);

    // Read the file
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.status(400).json({ message: `При чтении файла произошла ошибка ${err.message}` });
      }

      // Write the file
      fs.writeFile(fileName, data, function (err) {
        if (err) {
          res.status(400).json({ message: `При записи файла произошла ошибка ${err.message}` });
        }
      });

      // Delete the file
      fs.unlink(filePath, function (err) {
        if (err) {
          res.status(400).json({ message: `При удалении файла произошла ошибка ${err.message}` });
        }
      });

      const parsedFilePath = path.parse(fileName);

      const filePathForBD = path.join('upload', parsedFilePath.base)
      let link = fields.link.toString();
      if (link.indexOf('://') === -1) {
        link = 'http://' + link
      }

      const item = new Portfolio({
        name: fields.name,
        stack: fields.stack,
        link: link,
        description: fields.description,
        path: filePathForBD
      });

      item
        .save()
        .then(item => {
          res.status(201).json({ message: 'Запись успешно добавлена' });
        })
        .catch(err => {
          res.status(400).json({ message: `При добавлении записи произошла ошибка ${err.message}` });
        });
    });

  })
}

module.exports.deleteWork = function (req, res) {
  const id = req.params.id;
  const Portfolio = mongoose.model('work');

  Portfolio.findByIdAndRemove(id)
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