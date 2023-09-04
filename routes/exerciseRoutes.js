const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/:muscleGroup', exerciseController);
router.post('/add', exerciseController);
router.delete('/:id', exerciseController);

module.exports = router;
