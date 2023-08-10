const mongoose = require("mongoose");
const environment = require("../utils/environment");
const Schema = mongoose.Schema;

const LogsSchema = new Schema(
  {
    msg: {
      type: String,
      required: "true",
      default: "",
    },
    formId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "forms",
    },
    inboxId: {
      type: mongoose.Types.ObjectId,
      ref: "inboxes",
    },
    status: {
      type: String,
      enum: [
        "success",
        "failed by honeypot",
        "failed by domain",
        "failed by reCaptcha",
        "failed by blocked email",
      ],
      default: "success",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LogsModel = mongoose.model("logs", LogsSchema);

module.exports = LogsModel;
