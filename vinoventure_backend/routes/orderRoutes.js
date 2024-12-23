const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/addOrder', orderController.addOrder);

router.get('/getAllOrders', orderController.getAllOrders);

router.get('/getUsersOrders/:user_id', orderController.getUserOrders);

module.exports = router;
