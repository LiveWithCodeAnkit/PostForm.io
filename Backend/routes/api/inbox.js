var express = require("express");
var router = express.Router();

const inboxCtrl = require("../../controllers/inbox.controller");
const userAgent = require("../../middleware/userAgent");
const inboxMiddleware = require("../../middleware/inbox");
const { trialTimeMiddleware } = require("../../middleware/activePlan");
const trialmiddleware = require("../../middleware/activePlan");

//update form store
router.patch("/", inboxCtrl.storeChange);

//all inboxes form using formId
router.post("/", inboxCtrl.allInboxForm);

//get one form data by formKey
router.post("/:formKey", trialTimeMiddleware, inboxCtrl.addSubmitForm);
module.exports = router;
