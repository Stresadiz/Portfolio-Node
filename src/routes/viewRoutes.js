const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', homeController.renderHome);

router.get('/login', authController.renderLogin);

module.exports = router;