const UserModel = require("../models/user.model");
const { getPagination, getCount, getPaginationData } = require("../utils/fn");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

exports.me = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const user = await UserModel.findById(userId).lean();
    sendSuccessResponse(res, { data: user });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

exports.myToken = async (req, res) => {
  try {
    sendSuccessResponse(res, { data: req.cookies });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

exports.findAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const count = await getCount(UserModel);
    const users = await UserModel.find({}).skip(offset).limit(limit).lean();

    sendSuccessResponse(
      res,
      getPaginationData({ count, docs: users }, page, limit)
    );
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, firstName, lastName } = req.body;
    const request = {
      ...(email ? { email } : {}),
      ...(role ? { role } : {}),
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
    };
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        ...request,
      },
      { new: true }
    ).lean();
    sendSuccessResponse(res, { data: user });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    let { email, firstName, lastName } = req.body;
    email = `${email || ""}`.trim().toLowerCase();
    let request = {
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
    };
    const existingUser = await UserModel.findById(userId).lean();
    console.log(email, existingUser?.email);
    if (email && existingUser?.email !== email) {
      request["email"] = email;
      request["isEmailVerified"] = false;
      sendVerificationEmail(userId, email);
    }
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...request,
      },
      { new: true }
    ).lean();
    sendSuccessResponse(res, { data: user });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const sendVerificationEmail = (userId, email) => {
  try {
    let refreshToken = jwt.sign(
      { id: userId },
      environment.jwt.refreshToken,
      {}
    );
    const base64data = Buffer.from(refreshToken).toString("base64");

    mail_helper
      .send(
        "email_confirmation",
        {
          to: email,
          subject: "Email Confirmation",
        },
        {
          url: environment.app.url + "/verify/email/" + base64data,
        }
      )
      .then((resp) => {
        console.log("EMAIL", resp);
      })
      .catch((err) => {
        console.log("EMAIL ERROR:", err);
      });
  } catch (error) {
    console.log("sendVerificationEmail: ERR", error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { password, newPassword } = req.body;
    const user = await UserModel.findById(userId).select("+password");
    if (!user) {
      return sendErrorResponse(res, "We are not aware of this user.", 401);
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return sendErrorResponse(res, "Something wrong", 403);
      }
      if (isMatch) {
        user.password = newPassword;
        user.save((err) => {
          if (err) {
            return sendErrorResponse(res, "Something wrong", 403);
          }
          const { password: hash, ...data } = user.toJSON();
          return sendSuccessResponse(res, {
            message: "Success! Password changed.",
            data,
          });
        });
      } else {
        return sendErrorResponse(res, "Password does not matched", 403);
      }
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

exports.myPlanDetails = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const user = await UserModel.findById(userId).lean();
    const selectedPlan = await PlanModel.findById(user.plan?.selected).lean();

    sendSuccessResponse(res, {
      data: {
        selectedPlan: { ...selectedPlan, isActive: user.plan?.isActive },
      },
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
