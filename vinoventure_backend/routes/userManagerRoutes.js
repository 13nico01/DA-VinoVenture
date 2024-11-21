const express = require('express');
const userManagerController = require("../controllers/userManagerController");

const router = express.Router();

router.get('/get-users', userManagerController.getUsers);

router.get('/get-user-count', userManagerController.getUserCount);

router.delete('/delete-user', userManagerController.deleteUser);

module.exports = router;
