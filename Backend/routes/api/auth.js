var express = require('express');
var router = express.Router();
const authCtrl = require("../../controllers/auth.controller");
// const authentication = require('../../middleware/authentication');

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);

router.get("/logout", authCtrl.logout);

module.exports = router;