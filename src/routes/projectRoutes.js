const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', projectController.getAll);

router.post('/', verifyToken, projectController.create);
router.delete('/:id', verifyToken,  projectController.delete);
router.put('/:id', verifyToken, projectController.edit);

module.exports = router;