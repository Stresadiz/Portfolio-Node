const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, userController.getAll);

router.post('/', userController.create);
router.delete('/:id', verifyToken, userController.delete);
router.put('/:id', verifyToken, userController.edit);

module.exports = router;