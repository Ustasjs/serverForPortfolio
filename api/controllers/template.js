const pug = require('pug');
const mongoose = require('mongoose');
const utils = require('../../utils');
const articles = './views/articles/articles.pug';
const contentList = './views/articles/contentList.pug';
const skills = './views/skills/skills.pug';


module.exports.getBlogTemplate = function (req, res) {
  let resultData = {};
  const Blog = mongoose.model('blog');

  Blog.find()
    .then(items => {
      items = items.map(elem => utils.toClient(elem));
      const locals = { articles: items };

      resultData.articles = pug.renderFile(articles, locals);
      resultData.contentList = pug.renderFile(contentList, locals);

      res.status(200).json(resultData);
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: `Произошла ошибка ${err.message}` });
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
      const locals = { skills: items, skillsTypes };

      resultData = pug.renderFile(skills, locals);

      res.status(200).json(resultData);
    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ message: `Произошла ошибка ${err.message}` });
    })
}
