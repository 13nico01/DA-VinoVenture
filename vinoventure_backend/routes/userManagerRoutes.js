const express = require('express');
const userManagerController = require("../controllers/userManagerController");

const router = express.Router();

router.get('/getUsers', userManagerController.getUsers);

router.get('/getUserCount', userManagerController.getUserCount);

router.delete('/deleteUser', userManagerController.deleteUser);

module.exports = router;
