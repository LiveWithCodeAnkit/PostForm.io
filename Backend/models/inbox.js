const mongoose = require("mongoose");
const environment = require("../utils/environment");
const Schema = mongoose.Schema;

const InboxSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["Inbox", "Archive", "Spam"],
      default: "Inbox",
    },
    formId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Form Id is required"],
      ref: "forms",
    },
    clientIp: {
      type: String,
      required: [true, "Client Ip Address fot found"],
    },
    userAgent: {
      type: String,
      required: [true, "User agent not found"],
    },
    referer: {
      type: String,
      required: [true, "Referer not found"],
    },
    data: {
      type: Object,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

InboxSchema.index({ "data.email": "text" });

const InboxModel = mongoose.model("inbox", InboxSchema);

module.exports = InboxModel;
