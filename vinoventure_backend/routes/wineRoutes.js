const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const wineController = require('../controllers/wineController');


router.post('/update-image-paths', imageController.updateImagePaths);
router.get('/get-wines-by-id/:packageId', imageController.getWinesByPackageId);
router.get('/get-images-by-id/:packageId', imageController.getImagesByPackageId);
router.post('/upload-image', imageController.uploadImage);
router.get('/get-wine', wineController.getWine)
router.get('/get-wine-by-id/:id', wineController.getWineById);
router.delete('/delete-wine/:id', wineController.deleteWine);


module.exports = router;