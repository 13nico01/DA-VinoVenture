const express = require("express");
const router = express.Router();
const path = require("path");

router.use('/images', express.static(path.resolve(__dirname, '../images')));
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const adminAuthRoutes = require("./adminAuthRoutes");
const winePackageRoutes = require("./winePackageRoutes");
const userManagerRoutes = require("./userManagerRoutes");
const loginRoutes = require("./loginRoutes");
const shopRoutes = require("./shopRoutes");
const orderManagerRoutes = require("./orderManagerRoutes");
const cartRoutes = require("./cartRoutes");
const quizRoutes = require("./quizRoutes");
const wineRoutes = require("./wineRoutes");

router.use("/order", orderRoutes)
router.use("/users", authRoutes);
router.use("/admin", adminAuthRoutes);
router.use("/wine-packages", winePackageRoutes);
router.use("/user-manager", userManagerRoutes);
router.use("/user-login", loginRoutes);
router.use("/shop", shopRoutes);
router.use("/order-manager", orderManagerRoutes);
router.use("/cart", cartRoutes);
router.use("/quiz", quizRoutes);
router.use("/wine", wineRoutes);

module.exports = router;
