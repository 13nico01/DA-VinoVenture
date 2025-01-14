const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/get-Cart/:user_id", cartController.getCart);

router.post("/add-Cart/:user_id", cartController.addToCart);

router.put("/update-Cart/:user_id", cartController.updateCartItem);

router.delete("/delete-Cart/:user_id/:wine_package_id", cartController.removeFromCart);

router.delete("/clearCart/:user_id", cartController.clearCart);

module.exports = router;
