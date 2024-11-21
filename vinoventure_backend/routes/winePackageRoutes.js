const express = require('express');
const winePackageController = require('../controllers/winePackageController')

const router = express.Router();

router.post('/add-package', winePackageController.addWinePackage);

router.get('/get-packages', winePackageController.getWinePackages);

router.get('/get-package-count', winePackageController.getPackageCount);

router.delete('/delete-package/:id',winePackageController.deleteWinePackage);

module.exports = router;
