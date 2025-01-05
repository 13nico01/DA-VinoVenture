const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const wineController = require('../controllers/wineController');


router.post('/updateImagePaths', imageController.updateImagePaths);
router.get('/getWinesByID/:packageId', imageController.getWinesByPackageId);
router.get('/getImagesByID/:packageId', imageController.getImagesByPackageId);
router.post('/uploadImage', imageController.uploadImage);
router.get('/getWine', wineController.getWine)
router.get('/getWineByID/:id', wineController.getWineById);
router.delete('/deleteWine/:id', wineController.deleteWine);
router.get('/testImage', imageController.getTestImageRoute)

module.exports = router;