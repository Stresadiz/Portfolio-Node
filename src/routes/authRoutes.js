const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth');

router.post('/login', authController.login);

router.get('/dashboard', verifyToken, (req, res) => {
    if (req.user.username == process.env.ADMIN_USER) {
        res.json({ message: `Bienvenido al Dashboard, ${req.user.username}` });
    } else {
        res.status(401).json({ message: `Acceso denegado` });
    }
});

module.exports = router;
