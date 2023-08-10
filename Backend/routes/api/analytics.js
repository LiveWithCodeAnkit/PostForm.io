var express = require("express");
var router = express.Router();

const analyticsCtrl = require("../../controllers/analytics.controller");

//get one form data by formKey
router.post("/", analyticsCtrl.routeBasedOnType);

module.exports = router;
