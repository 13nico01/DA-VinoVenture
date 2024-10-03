const express = require('express');
const winePackageController = require('../controllers/winePackageController')

const router = express.Router();

router.post('/add-package', winePackageController.addWinePackage);

router.get('/get-packages', winePackageController.getWinePackages);

module.exports = router;
