const pug = require('pug');
const mongoose = require('mongoose');
const utils = require('../../utils');
const logger = require('../../logger');
const articles = './views/articles/articles.pug';
const contentList = './views/articles/contentList.pug';
const skills = './views/skills/skills.pug';
const slider = './views/slider/slider.pug';
const emptyDbMessage = './views/emptyDbMessage/emptyDbMessage.pug';


module.exports.getBlogTemplate = function (req, res) {
  let resultData = {};
  const Blog = mongoose.model('blog');

  Blog.find()
    .then(items => {
      items = items.map(elem => utils.dateForBlog(elem));
      const locals = { articles: items };

      if (locals.articles < 1) {
        const message = { type: 'Empty' };
        res.status(200).json(message);
        return;
      }

      resultData.articles = pug.renderFile(articles, locals);
      resultData.contentList = pug.renderFile(contentList, locals);

      res.status(200).json(resultData);
    })
    .catch(e => {
      logger.error(e);
      res.status(400).json({ message: `Произошла ошибка ${e.message}` });
    })
}

module.exports.getSkillsTemplate = function (req, res) {
  let resultData = {};
  const Skills = mongoose.model('skill');

  Skills.find()
    .then(items => {
      items = items.map(elem => utils.toClient(elem));
      const skillsTypes = items.reduce((prevValue, currentValue) => {
        if (prevValue.indexOf(currentValue.type) === -1) {
          prevValue.push(currentValue.type);
        }
        return prevValue;
      }, []);
      let locals = { skills: items, skillsTypes };

      if (locals.skills < 1) {
        const message = { type: 'Empty' };
        res.status(200).json(message);
        return;
      }

      resultData = pug.renderFile(skills, locals);

      res.status(200).json(resultData);
    })
    .catch(e => {
      logger.error(e);
      res.status(400).json({ message: `Произошла ошибка ${e.message}` });
    })
}


module.exports.getPortfolioTemplate = function (req, res) {
  let resultData = {};
  const Portfolio = mongoose.model('work');

  Portfolio.find()
    .then(items => {
      items = items.map(elem => utils.toClient(elem));
      let locals = { works: items };

      if (locals.works < 1) {
        const message = { type: 'Empty' };
        res.status(200).json(message);
        return;
      }

      resultData.html = pug.renderFile(slider, locals);
      resultData.data = items;

      res.status(200).json(resultData);
    })
    .catch(e => {
      logger.error(e);
      res.status(400).json({ message: `Произошла ошибка ${e.message}` });
    })
}
