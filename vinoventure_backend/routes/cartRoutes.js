const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/cart/:user_id", cartController.getCart);

router.post("/cart/:user_id", cartController.addToCart);

router.put("/cart/:user_id", cartController.updateCartItem);

router.delete("/cart/:user_id", cartController.removeFromCart);

module.exports = router;
