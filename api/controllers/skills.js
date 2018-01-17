const mongoose = require('mongoose');
const multiparty = require('multiparty');
const logger = require('../../logger');
const utils = require('../../utils');

module.exports.getSkills = function (req, res) {
  const Skills = mongoose.model('skill');

  Skills.find()
    .then(items => {
      items = items.map(elem => utils.toClient(elem));
      res.status(200).json({ skills: items });
    })
    .catch(e => {
      logger.error(e);
      res.status(400).json({ message: `Произошла ошибка ${err.message}` });
    })
}

module.exports.createSkill = function (req, res) {
  const Skills = mongoose.model('skill');
  const body = req.body;

  const item = new Skills({
    name: body.name,
    percents: body.percents,
    type: body.type
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

module.exports.updateSkills = function (req, res) {
  const receivedData = req.body;
  const Skills = mongoose.model('skill');
  let cash;

  Skills.find()
    .then((data) => cash = data)
    .then(() => Skills.remove(null, (err) => {
      if (err) {
        throw err;
      }
    }))
    .then(() => Skills.insertMany(receivedData, (err) => {
      if (err) {
        Skills.insertMany(cash, (err) => {
          if (err) {
            throw err;
          }
        });
        throw err;
      }
    }))
    .then(() => {
      res.status(201).json({ message: 'Данные успешно сохранены' });
    })
    .catch(err => {
      res.status(400).json({
        message: `При обновлении произошла ошибка: ' + ${err.message}`
      });
    });
}


module.exports.deleteSkill = function (req, res) {
  const id = req.params.id;
  const Skills = mongoose.model('skill');

  Skills.findByIdAndRemove(id)
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