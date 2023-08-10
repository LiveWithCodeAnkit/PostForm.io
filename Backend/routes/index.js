var express = require("express");
const userAgent = require("../middleware/userAgent");
var router = express.Router();
const apiRoutes = require("./api");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("../views/index");
});
router.get("/ping", function (req, res) {
  res.send("pong");
});

router.use("/api", apiRoutes);

module.exports = router;
