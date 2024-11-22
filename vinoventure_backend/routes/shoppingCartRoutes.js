const express = require('express');

const shoppingCartController = require('../controllers/shoppingCartController')

const router = express.Router();

router.get('/get-shoppingCartsByID', shoppingCartController.getShoppingCartById);