var express = require("express");
const authentication = require("../../middleware/authentication");
const authorization = require("../../middleware/authorization");
var router = express.Router();

const adminRoutes = require("./admin");
const constants = require("../../utils/constants");
const authRoutes = require("./auth");
const userRoutes = require("./users");
const formsRoute = require("./forms");
const analyticsRoute = require("./analytics");
const userAgent = require("../../middleware/userAgent");
const submitFormRoute = require("../api/inbox");

// Public Routes
router.use("/auth", authRoutes);

router.use("/f", userAgent, submitFormRoute);

// Middleware to check token
router.use(authentication);

// Secure Routes
router.use("/user", userRoutes);

router.use("/form-analytics", analyticsRoute);

router.use("/forms", formsRoute);

// Admin Routes
router.use("/admin", authorization([constants.roles.admin]), adminRoutes);

module.exports = router;
