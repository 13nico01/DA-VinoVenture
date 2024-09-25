const express = require('express');
const router = express.Router();

const orderRoutes = require('./orderRoutes');
const authRoutes = require('./authRoutes');

// Verwende die Order-Routen
router.use('/', orderRoutes);
router.use('/users', authRoutes);

module.exports = router;
