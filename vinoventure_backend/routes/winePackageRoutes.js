const express = require('express');
const winePackageController = require('../controllers/winePackageController')

const router = express.Router();

router.post('/addPackage', winePackageController.addWinePackage);

router.get('/getPackages', winePackageController.getWinePackages);

router.get('/getPackagebyId/:id', winePackageController.getWinePackageById);

router.get('/getPackageCount', winePackageController.getPackageCount);

router.delete('/deletePackage/:id',winePackageController.deleteWinePackage);

module.exports = router;
