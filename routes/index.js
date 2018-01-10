const express = require('express');
const router = express.Router();
const ctrlHome = require('../controllers/homePage');
const ctrlPortfolio = require('../controllers/portfolio');




/* GET home page. */
router.get('/', ctrlHome.getIndex);

// post message
router.post('/contact', ctrlPortfolio.sendEmail);


module.exports = router;
