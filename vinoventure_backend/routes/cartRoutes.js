const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/get-cart/:user_id", cartController.getCart);

router.post("/add-cart/:user_id", cartController.addToCart);

router.put("/update-cart/:user_id", cartController.updateCartItem);

router.delete("/delete-cart/:user_id/:wine_package_id", cartController.removeFromCart);

module.exports = router;
