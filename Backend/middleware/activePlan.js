const FormsModel = require("../models/forms.model");
const UserModel = require("../models/user.model");
const { sendErrorResponse } = require("../utils/response");
const moment = require("moment");

exports.trialTimeMiddleware = async (req, res, next) => {
  try {
    const formKey = req.params.formKey;
    const filter = { formKey: formKey };
    const formsData = await FormsModel.findOne(filter);
    const userData = await UserModel.findById(formsData.userId);
    console.log(userData.createdAt);
    const today = new Date();
    const freeTrialDate = new Date(moment(userData.createdAt).add(7, "days"));
    if (userData.plan.isActive) {
      next();
    } else {
      if (freeTrialDate > today) {
        next();
      } else {
        sendErrorResponse(res, "Your free trial is finished");
      }
    }
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, err);
  }
};

exports.trialFormLimitMiddleware = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(req.user);
    const userData = await UserModel.findById(_id);
    const forms = await FormsModel.find({ userId: userData._id });
    const today = new Date();
    const freeTrialDate = new Date(moment(userData.createdAt).add(7, "days"));
    if (userData.plan.isActive) {
      next();
    } else {
      if (freeTrialDate > today) {
        if (forms.length > 500) {
          sendErrorResponse(
            res,
            "You can't create more than 1 form in free trial"
          );
        } else {
          next();
        }
      } else {
        sendErrorResponse(res, "Your free trial is finished");
      }
    }
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, err);
  }
};
