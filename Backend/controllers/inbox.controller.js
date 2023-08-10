const FormsModel = require("../models/forms.model");
const UserModel = require("../models/user.model");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const { generateRandomString } = require("../utils/fn");
const InboxModel = require("../models/inbox");
const LogsModel = require("../models/logs.model");

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
      .includes("Cast to ObjectId failed for value".toLocaleLowerCase())
  ) {
    error.push("Form doesn't exist");
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
  return error;
};

//add submitForm form
exports.addSubmitForm = async (req, res) => {
  try {
    const formKey = req.params.formKey;
    const filter = { formKey: formKey };
    const formsData = await FormsModel.findOne(filter);
    console.log(formsData);
    const userAgent = req.userAgent.source;
    const clientIp = req.clientIp;
    const referer = req.hostname;
    const submitForm = new InboxModel({
      formId: formsData._id,
      clientIp,
      userAgent,
      referer,
      data: { ...req.body },
    });

    const addedForm = await submitForm.save();

    const message = {
      message: "successfully form added",
      data: addedForm,
    };

    if (addedForm) {
      sendSuccessResponse(res, message);
      const logs = new LogsModel({
        formId: formsData._id,
        inboxId: addedForm._id,
        msg: "Submission was accepted and processed.",
        status: "success",
      });

      const log = await logs.save();
    } else {
      sendErrorResponse(
        res,
        "Error in add forms data. Please try again later."
      );
    }
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "Form not added",
      error: handleValidation(error),
    };
    sendErrorResponse(res, errorMsg);
  }
};

//update store value in form like [inbox,archive,spam]
exports.storeChange = async (req, res) => {
  try {
    const { _id, store } = req.body;
    const formsData = await InboxModel.findByIdAndUpdate(
      _id,
      {
        store: store,
      },
      { runValidators: true }
    );

    const message = {
      message: "successfully form store updated",
      data: formsData,
    };

    if (formsData) {
      sendSuccessResponse(res, message);
    } else {
      sendErrorResponse(res, "Form not exists");
    }
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "Form store not updated",
      error: handleValidation(error),
    };
    sendErrorResponse(res, errorMsg);
  }
};

//get all Inboxes
exports.allInboxForm = async (req, res) => {
  try {
    const { formKey, status } = req.body;

    const filter = { formKey: formKey };

    const { _id } = await FormsModel.findOne(filter, {});

    const query = { formId: _id, status: status };
    console.log(query);

    const listOfInboxesData = await InboxModel.find(query, {});

    const message = {
      message: "successfully fetch all inboxes form",
      data: listOfInboxesData,
    };

    if (listOfInboxesData) {
      sendSuccessResponse(res, message);
    } else {
      sendErrorResponse(res, "Form Id not exists");
    }
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "Error in fetch all inboxes",
      error: handleValidation(error),
    };
    sendErrorResponse(res, errorMsg);
  }
};
