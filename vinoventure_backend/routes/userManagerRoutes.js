const express = require('express');
const userManagerController = require("../controllers/userManagerController");

const router = express.Router();

router.get('/getUsers', userManagerController.getUsers);

router.get('/getUserByID/:user_id', userManagerController.getUserById);

router.get('/getUserCount', userManagerController.getUserCount);

router.delete('/deleteUser', userManagerController.deleteUser);

router.patch('/updateUser', userManagerController.updateUser);

module.exports = router;
