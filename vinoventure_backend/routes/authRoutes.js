const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController.js');

// define auth routes
router.post('/signup', signup);

module.exports = router;