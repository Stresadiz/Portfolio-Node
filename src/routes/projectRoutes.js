const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAll);
router.post('/', projectController.create);
router.delete('/:id', projectController.delete);

module.exports = router;