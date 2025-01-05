const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/getCart/:user_id", cartController.getCart);

router.post("/addCart/:user_id", cartController.addToCart);

router.put("/updateCart/:user_id", cartController.updateCartItem);

router.delete("/deleteCart/:user_id/:wine_package_id", cartController.removeFromCart);

module.exports = router;
