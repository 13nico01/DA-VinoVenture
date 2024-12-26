const express = require('express');
const router = express.Router();
const wineController = require('../controllers/imageController');


router.post('/update-image-paths', wineController.updateImagePaths);
router.get('/getWinesByPackageId', wineController.getWinesByPackageId);

module.exports = router;