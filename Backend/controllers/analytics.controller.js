const FormsModel = require("../models/forms.model");
const UserModel = require("../models/user.model");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const { generateRandomString } = require("../utils/fn");
const moment = require("moment");
const InboxModel = require("../models/inbox");
const { format } = require("morgan");
const mongoose = require("mongoose");

const handleValidation = (err) => {
  let error = [];
  // validation errors

  // duplicate email error
  if (err.code === 11000) {
    error.push("This form key is already registered.Please try again");
    return error;
  }

  if (
    err.message
      .toLocaleLowerCase()
      .includes("Validation failed".toLocaleLowerCase())
  ) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      console.log("properties", properties);
      if (properties) error.push(properties.message);
    });
  }

  if (
    err.message
      .toLocaleLowerCase()
      .includes("buffering timed out after 10000ms".toLocaleLowerCase())
  ) {
    error.push("Internal Server Error");
  }

  console.log(
    err.message
      .toLocaleLowerCase()
      .includes("Unexpected token } in JSON".toLocaleLowerCase())
  );
  if (
    err.message
      .toLocaleLowerCase()
      .includes("Unexpected token } in JSON".toLocaleLowerCase())
  ) {
    error.push("JSON Parse Error");
  }
  return error;
};

//type base route
exports.routeBasedOnType = (req, res) => {
  switch (req.body.type) {
    case "submission":
      this.totalSubmissions(req, res);
      break;

    case "spam":
      this.totalSpam(req, res);
      break;

    case "week":
      this.submissionsByWeekday(req, res);
      break;

    case "day":
      this.submissionsByTimeOfDay(req, res);
      break;

    case "month":
      this.submissionsVSSpam(req, res);
      break;

    default:
      sendErrorResponse(res, "Please check type in body");
  }
};
//get total submission by filter -30,60,365 days
exports.totalSubmissions = async (req, res) => {
  try {
    const { formId, lastDays } = req.body;
    const date = moment()
      .subtract(parseInt(lastDays), "days")
      .format("YYYY MM DD");
    const status = "Inbox";
    const totalSubmission = await InboxModel.countDocuments({
      createdAt: {
        $gte: new Date(date),
        $lt: new Date(),
      },

      status: status,
      formId: formId,
    });

    console.log(totalSubmission);
    const msg = {
      totalSubmission: totalSubmission,
    };
    sendSuccessResponse(res, msg);
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};

//get total spam by filter -30,60,365 days
exports.totalSpam = async (req, res) => {
  try {
    const { formId, lastDays } = req.body;
    const date = moment()
      .subtract(parseInt(lastDays), "days")
      .format("YYYY MM DD");
    const status = "Spam";
    const totalSubmission = await InboxModel.countDocuments({
      createdAt: {
        $gte: new Date(date),
        $lt: new Date(),
      },
      status: status,
      formId: formId,
    });

    console.log(totalSubmission);
    const msg = {
      totalSubmission: totalSubmission,
    };
    sendSuccessResponse(res, msg);
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};

exports.submissionsByWeekday = async (req, res) => {
  try {
    const { formId, lastDays } = req.body;
    const date = moment()
      .subtract(parseInt(lastDays), "days")
      .format("YYYY MM DD");
    const status = "Inbox";

    const totalSubmission = await InboxModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(date),
            $lt: new Date(),
          },
          status: status,
          formId: new mongoose.Types.ObjectId(formId),
        },
      },
      {
        $group: {
          _id: {
            $dayOfWeek: {
              date: "$createdAt",
            },
          },
          totalCount: { $sum: 1 },
        },
      },
      {
        $project: {
          dayOfWeek: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Sunday" },
                { case: { $eq: ["$_id", 2] }, then: "Monday" },
                { case: { $eq: ["$_id", 3] }, then: "Tuesday" },
                { case: { $eq: ["$_id", 4] }, then: "Wednesday" },
                { case: { $eq: ["$_id", 5] }, then: "Thursday" },
                { case: { $eq: ["$_id", 6] }, then: "Friday" },
                { case: { $eq: ["$_id", 7] }, then: "Saturday" },
              ],
              default: "Unknown",
            },
          },
          totalCount: 1,
          _id: 0,
        },
      },
    ]);

    // var data = Array(7).fill({});

    // order = {
    //   Sunday: 1,
    //   Monday: 2,
    //   Tuesday: 3,
    //   Wednesday: 4,
    //   Thursday: 5,
    //   Friday: 6,
    //   Saturday: 7,
    // };

    // console.log(totalSubmission.length);

    // totalSubmission.forEach((element) => {
    //   ++data[moment(element.createdAt).format("d")].totalCount;
    // });

    const msg = {
      totalSubmission: totalSubmission,
    };
    sendSuccessResponse(res, msg);
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};

exports.submissionsByTimeOfDay = async (req, res) => {
  try {
    const { formId, lastDays } = req.body;
    const date = moment()
      .subtract(parseInt(lastDays), "days")
      .format("YYYY MM DD");
    const status = "Inbox";
    // var data = Array(24).fill(0);
    var data = [
      { timeOfDay: "12am", totalCount: 0 },
      { timeOfDay: "12am", totalCount: 0 },
      { timeOfDay: "2am", totalCount: 0 },
      { timeOfDay: "3am", totalCount: 0 },
      { timeOfDay: "4am", totalCount: 0 },
      { timeOfDay: "5am", totalCount: 0 },
      { timeOfDay: "6am", totalCount: 0 },
      { timeOfDay: "7am", totalCount: 0 },
      { timeOfDay: "8am", totalCount: 0 },
      { timeOfDay: "9am", totalCount: 0 },
      { timeOfDay: "10am", totalCount: 0 },
      { timeOfDay: "11am", totalCount: 0 },
      { timeOfDay: "12pm", totalCount: 0 },
      { timeOfDay: "1pm", totalCount: 0 },
      { timeOfDay: "2pm", totalCount: 0 },
      { timeOfDay: "3pm", totalCount: 0 },
      { timeOfDay: "4pm", totalCount: 0 },
      { timeOfDay: "5pm", totalCount: 0 },
      { timeOfDay: "6pm", totalCount: 0 },
      { timeOfDay: "7pm", totalCount: 0 },
      { timeOfDay: "8pm", totalCount: 0 },
      { timeOfDay: "9pm", totalCount: 0 },
      { timeOfDay: "10pm", totalCount: 0 },
      { timeOfDay: "11pm", totalCount: 0 },
    ];

    const totalSubmission = await InboxModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(date),
            $lt: new Date(),
          },
          status: status,
          formId: new mongoose.Types.ObjectId(formId),
        },
      },
      {
        $group: {
          _id: {
            $hour: {
              date: "$createdAt",
            },
          },
          totalCount: { $sum: 1 },
        },
      },
      {
        $project: {
          totalCount: 1,
          _id: 1,
        },
      },
    ]);

    const msg = {
      totalSubmission: totalSubmission,
    };
    sendSuccessResponse(res, msg);
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, err.message);
  }
};

exports.submissionsVSSpam = async (req, res) => {
  try {
    const { formId } = req.body;
    // const date = moment()
    //   .subtract(parseInt(lastDays), "days")
    //   .format("YYYY MM DD");
    // const totalSubmission = await InboxModel.find({
    //   status: "Inbox",
    //   formId: formId,
    // });

    const totalSubmission = await InboxModel.aggregate([
      {
        formId: new mongoose.Types.ObjectId(formId),
      },
      {
        $group: {
          _id: {
            $month: {
              date: "$createdAt",
            },
          },
          totalCount: { $sum: 1 },
        },
      },
      {
        $project: {
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Jan" },
                { case: { $eq: ["$_id", 2] }, then: "Feb" },
                { case: { $eq: ["$_id", 3] }, then: "Mar" },
                { case: { $eq: ["$_id", 4] }, then: "Apr" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "Jun" },
                { case: { $eq: ["$_id", 7] }, then: "Jul" },
                { case: { $eq: ["$_id", 8] }, then: "Aug" },
                { case: { $eq: ["$_id", 9] }, then: "Sep" },
                { case: { $eq: ["$_id", 10] }, then: "Oct" },
                { case: { $eq: ["$_id", 11] }, then: "Nov" },
                { case: { $eq: ["$_id", 12] }, then: "Dec" },
              ],
              default: "Unknown",
            },
          },
          totalCount: 1,
          _id: 0,
        },
      },
    ]);

    const totalSpam = await InboxModel.find({
      status: "Spam",
      formId: formId,
    });

    var submissionData = [
      { month: "Jan", totalCount: 0 },
      { month: "Feb", totalCount: 0 },
      { month: "Mar", totalCount: 0 },
      { month: "Apr", totalCount: 0 },
      { month: "May", totalCount: 0 },
      { month: "Jun", totalCount: 0 },
      { month: "Jul", totalCount: 0 },
      { month: "Aug", totalCount: 0 },
      { month: "Sep", totalCount: 0 },
      { month: "Oct", totalCount: 0 },
      { month: "Nov", totalCount: 0 },
      { month: "Dec", totalCount: 0 },
    ];

    var spamData = [
      { month: "Jan", totalCount: 0 },
      { month: "Feb", totalCount: 0 },
      { month: "Mar", totalCount: 0 },
      { month: "Apr", totalCount: 0 },
      { month: "May", totalCount: 0 },
      { month: "Jun", totalCount: 0 },
      { month: "Jul", totalCount: 0 },
      { month: "Aug", totalCount: 0 },
      { month: "Sep", totalCount: 0 },
      { month: "Oct", totalCount: 0 },
      { month: "Nov", totalCount: 0 },
      { month: "Dec", totalCount: 0 },
    ];

    totalSubmission.forEach((element) => {
      ++submissionData[moment(element.createdAt).format("M") - 1].totalCount;
    });
    totalSpam.forEach((element) => {
      ++spamData[moment(element.createdAt).format("M") - 1].totalCount;
    });

    const msg = {
      totalSubmission: submissionData,
      totalSpam: spamData,
    };
    sendSuccessResponse(res, msg);
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};
