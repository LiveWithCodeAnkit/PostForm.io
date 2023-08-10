const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const environment = require("../utils/environment");
const mail_helper = require("../helpers/mail_helper");
const PlanModel = require("../models/plan.model");

exports.signup = async (req, res) => {
  try {
    const { email, password, role, firstName, lastName } = req.body;

    const plan = new PlanModel({});
    const planData = await plan.save();
    const user = new UserModel({
      email,
      password,
      role,
      firstName,
      lastName,
      plan: {
        selected: planData._id,
        isActive: false,
      },
    });
    UserModel.findOne({ email }, (err, existingUser) => {
      if (err) {
        return sendErrorResponse(
          res,
          "Error in Register. Please try again later."
        );
      }
      if (existingUser) {
        return sendErrorResponse(
          res,
          "Account with that email address already exists.",
          403
        );
      }
      user.save((err, data) => {
        if (err) {
          return sendErrorResponse(
            res,
            "Error in register user data. Please try again later."
          );
        }

        let refreshToken = jwt.sign(
          { id: data?._id },
          environment.jwt.secret,
          {}
        );
        const base64data = Buffer.from(refreshToken).toString("base64");

        // mail_helper
        //   .send(
        //     "email_confirmation",
        //     {
        //       to: email,
        //       subject: "Email Verification - " + environment.app.name,
        //     },
        //     {
        //       url: environment.app.url + "/verify/email/" + base64data,
        //     }
        //   )
        //   .then((resp) => {
        //     console.log(resp);
        //     return sendSuccessResponse(res, {
        //       message: "Please check inbox and verify your account.",
        //     });
        //   })
        //   .catch((err) => {
        //     console.log("EMAIL ERROR:", err);
        //     return sendErrorResponse(res, "Something went wrong");
        //   });

        return sendSuccessResponse(res, "user register successfully");
      });
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    res.clearCookie("token");
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return sendErrorResponse(res, "We are not aware of this user.", 404);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return sendErrorResponse(res, "Invalid email or password", 401);
      }
      if (isMatch) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          environment.jwt.secret,
          { expiresIn: environment.jwt.expiredIn }
        );

        const { password: hash, ...data } = user.toJSON();
        res.cookie("token", token);
        return sendSuccessResponse(res, {
          message: "Success! You are logged in.",
          token,
          data,
        });
      }
      return sendErrorResponse(res, "Invalid email or password.", 401);
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    sendSuccessResponse(res, "User Logged out successfully!");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
