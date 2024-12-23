const express = require('express');
const wineController = require('../controllers/wineController')
const updateImagePaths = require('../controllers/imageController')

const router = express.Router();

router.get('/get-Wine', wineController.getWine);

router.get ('/get-WineById/:id', wineController.getWineById);

router.delete ('delete-Wine/:id', wineController.deleteWine());

router.post('/update-image-paths', updateImagePaths);

module.exports = router;