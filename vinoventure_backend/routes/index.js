const express = require('express');
const router = express.Router();

const orderRoutes = require('./orderRoutes');

// Verwende die Order-Routen
router.use('/', orderRoutes);

module.exports = router;
