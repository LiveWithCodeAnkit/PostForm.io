var express = require("express");
var router = express.Router();

const userCtrl = require("../../controllers/user.controller");

router.get("/me", userCtrl.me);
router.get("/plan-details", userCtrl.myPlanDetails);
router.get("/token", userCtrl.myToken);

router.put("/profile", userCtrl.updateMyProfile);
router.put("/password", userCtrl.changePassword);

module.exports = router;
