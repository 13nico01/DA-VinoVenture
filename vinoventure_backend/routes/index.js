const express = require("express");
const router = express.Router();

const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const adminAuthRoutes = require("./adminAuthRoutes");
const winePackageRoutes = require("./winePackageRoutes");
const userManagerRoutes = require("./userManagerRoutes");

// Verwende die Order-Routen
router.use("/", orderRoutes);
router.use("/users", authRoutes);
router.use("/admin", adminAuthRoutes);
router.use("/wine-packages", winePackageRoutes);
router.use("/user-manager", userManagerRoutes);

module.exports = router;
