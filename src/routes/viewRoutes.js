const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', homeController.renderHome);

module.exports = router;