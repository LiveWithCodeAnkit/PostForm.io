const FormsModel = require("../models/forms.model");
const UserModel = require("../models/user.model");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const { generateRandomString } = require("../utils/fn");

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

//create form
exports.createForm = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const formKey = generateRandomString(6);

    const form = new FormsModel({
      userId,
      formKey,
      ...req.body,
    });

    const saveData = await form.save();

    const message = {
      message: "successfully form saved",
      data: saveData,
    };

    if (saveData) {
      sendSuccessResponse(res, message);
    } else {
      sendErrorResponse(
        res,
        "Error in add forms data. Please try again later."
      );
    }
  } catch (error) {
    const errorMsg = {
      message: "Form not created",
      error: handleValidation(error),
    };
    sendErrorResponse(res, errorMsg);
  }
};

//update form
exports.updateForm = async (req, res) => {
  try {
    const updateFormDate = req.body;
    const formKey = req.params.formKey;

    const filter = { formKey: formKey };

    const updatedData = await FormsModel.findOneAndUpdate(
      filter,
      updateFormDate,
      {}
    );

    const message = {
      message: "successfully form updated",
      data: updatedData,
    };

    return sendSuccessResponse(res, message);
  } catch (error) {
    console.log(error);
    const errorMsg = {
      message: "Form not updated",
      error: handleValidation(error),
    };
    sendErrorResponse(res, errorMsg);
  }
};

//get Form
exports.getFormData = async (req, res) => {
  try {
    const formKey = req.params.formKey;
    const filter = { formKey: formKey };

    const formData = await FormsModel.findOne(filter, {});

    const message = {
      message: "successfully form fetch",
      data: formData,
    };

    if (formData) {
      //formLink
      console.log(formData.formLink);
      return sendSuccessResponse(res, message);
    } else {
      sendErrorResponse(res, "No Data Found");
    }
  } catch (error) {
    console.log(error);
    const errorMsg = {
      error: error.message,
    };
    sendErrorResponse(res, errorMsg);
  }
};

//get Forms List
exports.getFormList = async (req, res) => {
  try {
    const userId = req.query.userId;
    const filter = { userId: userId };

    const formList = await FormsModel.find(filter, {});

    const message = {
      message: "successfully form fetch",
      data: formList,
    };

    if (formList) {
      //formLink
      return sendSuccessResponse(res, message);
    } else {
      sendErrorResponse(res, "No Data Found");
    }
  } catch (error) {
    console.log(error);
    const errorMsg = {
      error: error.message,
    };
    sendErrorResponse(res, errorMsg);
  }
};

//delete form
exports.deleteForm = async (req, res) => {
  try {
    const formKey = req.params.formKey;

    const deletedForm = await FormsModel.findOneAndDelete({
      formKey: { $eq: formKey },
    });

    const message = {
      message: "successfully form deleted",
      data: deletedForm,
    };

    if (deletedForm) {
      return sendSuccessResponse(res, message);
    } else {
      sendErrorResponse(res, "Form not found");
    }
  } catch (error) {
    console.log(error);
    const errorMsg = {
      error: error.message,
    };
    sendErrorResponse(res, errorMsg);
  }
};
