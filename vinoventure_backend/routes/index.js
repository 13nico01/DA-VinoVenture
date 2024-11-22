const express = require("express");
const router = express.Router();

const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const adminAuthRoutes = require("./adminAuthRoutes");
const winePackageRoutes = require("./winePackageRoutes");
const userManagerRoutes = require("./userManagerRoutes");
const loginRoutes = require("./loginRoutes");
const shopRoutes = require("./shopRoutes");
const orderManagerRoutes = require("./orderManagerRoutes");

router.use("/", orderRoutes);
router.use("/users", authRoutes);
router.use("/admin", adminAuthRoutes);
router.use("/wine-packages", winePackageRoutes);
router.use("/user-manager", userManagerRoutes);
router.use("/user-login", loginRoutes);
router.use("/shop", shopRoutes)
router.use("/order-manager", orderManagerRoutes);

module.exports = router;
