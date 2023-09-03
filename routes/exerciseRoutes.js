const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/:muscleGroup', exerciseController.getExercisesByMuscle);
router.post('/add', exerciseController.addExercise);
router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;
