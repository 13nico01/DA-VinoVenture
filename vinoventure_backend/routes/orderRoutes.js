const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Neue Bestellung erstellen
router.post('/createOrder', orderController.createOrder);

// Bestellung verschicken
router.post('/ship-order/:orderId', orderController.shipOrder);

module.exports = router;
