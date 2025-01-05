const express = require("express");
const router = express.Router();
const orderManagerController = require("../controllers/orderManagerController");

router.get("/getOrders", orderManagerController.getOrders);

module.exports = router;
