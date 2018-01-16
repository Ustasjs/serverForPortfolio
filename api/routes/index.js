const express = require('express');
const router = express.Router();
const ctrlBlog = require('../controllers/blog');
const ctrlPortfolio = require('../controllers/portfolio');
const ctrlSkills = require('../controllers/skills');
const ctrlTemplate = require('../controllers/template');
const ctrlUser = require('../controllers/user');
const logger = require('../../logger');

let isAdmin = function (req, res, next) {
  return next();
};

logger.info('----', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  isAdmin = function (req, res, next) {
    if (req.session.isAdmin) {
      return next();
    } else {
      return res.status(400).json({ message: 'Необходима авторизация' });;
    }
  };
}



// Blog
router.get('/blog', ctrlBlog.getArticles);
router.post('/blog', isAdmin, ctrlBlog.createArticle);
router.delete('/blog:id', isAdmin, ctrlBlog.deleteArticle);

// Portfolio
router.get('/portfolio', ctrlPortfolio.getWorks);
router.post('/portfolio', isAdmin, ctrlPortfolio.createWork);
router.delete('/portfolio:id', isAdmin, ctrlPortfolio.deleteWork);

// Skills
router.get('/skills', ctrlSkills.getSkills);
router.post('/skills', isAdmin, ctrlSkills.createSkill);
router.put('/skills', isAdmin, ctrlSkills.updateSkills);
router.delete('/skills:id', isAdmin, ctrlSkills.deleteSkill);

// Templates
router.get('/template/blog', ctrlTemplate.getBlogTemplate);
router.get('/template/skills', ctrlTemplate.getSkillsTemplate);
router.get('/template/portfolio', ctrlTemplate.getPortfolioTemplate);

// Auth
router.post('/user', ctrlUser.isAuth);

module.exports = router;