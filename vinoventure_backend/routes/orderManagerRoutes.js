const express = require("express");
const router = express.Router();
const orderManagerController = require("../controllers/orderManagerController");

router.get("/get-orders", orderManagerController.getOrders);

module.exports = router;
