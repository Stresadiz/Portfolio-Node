const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');

const { verifyToken } = require('../middlewares/auth');

router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', homeController.renderHome);

router.get('/login', authController.renderLogin);

router.get('/dashboard', verifyToken, dashboardController.renderPage);

module.exports = router;