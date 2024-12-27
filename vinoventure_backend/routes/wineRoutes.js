const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const wineController = require('../controllers/wineController');


router.post('/update-image-paths', imageController.updateImagePaths);
router.get('/get-wines-by-id/:packageId', imageController.getWinesByPackageId);
router.get('/getImagesByPackageId/:packageId', imageController.getImagesByPackageId);
router.post('/upload-image', imageController.uploadImage);
router.get('/get-Wine', wineController.getWine)
router.get('/getWineById/:id', wineController.getWineById);
router.delete('/deleteWine/:id', wineController.deleteWine);


module.exports = router;