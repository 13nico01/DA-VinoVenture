const express = require("express");
const router = express.Router();
const path = require("path");


const orderRoutes = require("./orderRoutes");
const registerRoutes = require("./registerRoutes");
const adminAuthRoutes = require("./adminAuthRoutes");
const winePackageRoutes = require("./winePackageRoutes");
const userManagerRoutes = require("./userManagerRoutes");
const loginRoutes = require("./loginRoutes");
const shopRoutes = require("./shopRoutes");
const orderManagerRoutes = require("./orderManagerRoutes");
const cartRoutes = require("./cartRoutes");
const quizRoutes = require("./quizRoutes");
const wineRoutes = require("./wineRoutes");

router.use('/images', express.static(path.join(__dirname, 'images')));
router.use("/order", orderRoutes)
router.use("/users", registerRoutes);
router.use("/admin", adminAuthRoutes);
router.use("/wine-packages", winePackageRoutes);
router.use("/user-manager", userManagerRoutes);
router.use("/user-login", loginRoutes);
router.use("/shop", shopRoutes);
router.use("/cart", cartRoutes);
router.use("/quiz", quizRoutes);
router.use("/wine", wineRoutes);

module.exports = router;
