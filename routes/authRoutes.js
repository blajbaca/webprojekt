const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController);
router.post('/register', authController);

module.exports = router;