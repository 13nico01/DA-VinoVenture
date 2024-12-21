const express = require('express');
const wineController = require('../controllers/wineController')

const router = express.Router();

router.get('/get-Wine', wineController.getWine);

router.get ('/get-WineById/:id', wineController.getWineById);

router.get ('delete-Wine/:id')

module.exports = router;