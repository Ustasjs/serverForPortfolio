const express = require('express');
const router = express.Router();
const ctrlBlog = require('../controllers/blog');
const ctrlPortfolio = require('../controllers/portfolio');
const ctrlSkills = require('../controllers/skills');
const ctrlTemplate = require('../controllers/template');


// Blog
router.get('/blog', ctrlBlog.getArticles);
router.post('/blog', ctrlBlog.createArticle);
router.delete('/blog:id', ctrlBlog.deleteArticle);

// Portfolio
router.get('/portfolio', ctrlPortfolio.getWorks);
router.post('/portfolio', ctrlPortfolio.createWork);
router.delete('/portfolio:id', ctrlPortfolio.deleteWork);

// Skills
router.get('/skills', ctrlSkills.getSkills);
router.post('/skills', ctrlSkills.createSkill);
router.put('/skills', ctrlSkills.updateSkills);
router.delete('/skills:id', ctrlSkills.deleteSkill);

// Templates
router.get('/template/blog', ctrlTemplate.getBlogTemplate);
router.get('/template/skills', ctrlTemplate.getSkillsTemplate);

module.exports = router;