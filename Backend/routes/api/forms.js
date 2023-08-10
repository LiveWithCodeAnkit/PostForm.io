var express = require("express");
var router = express.Router();

const formCtrl = require("../../controllers/forms.controller");
const trialmiddleware = require("../../middleware/activePlan");
const {
  trialFormLimitMiddleware,
  trialTimeMiddleware,
} = require("../../middleware/activePlan");

//get list of forms by userId
router.get("/", formCtrl.getFormList);

//get one form data by formKey
router.get("/:formKey", formCtrl.getFormData);

//update form data
router.patch("/:formKey", formCtrl.updateForm);

//delete form data
router.delete("/:formKey", formCtrl.deleteForm);

router.use(trialFormLimitMiddleware);
//add new form data
router.post("/", formCtrl.createForm);

module.exports = router;
