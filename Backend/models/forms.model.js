const mongoose = require("mongoose");
const environment = require("../utils/environment");
const Schema = mongoose.Schema;

const BrandSchema = new Schema(
  {
    textColor: {
      type: String,
      default: "#235D8C",
      validate: function (value) {
        return value != null && value != "";
      },
    },
    textMutedColor: {
      type: String,
      default: "#92AFD0",
      validate: function (value) {
        return value != null && value != "";
      },
    },
    textInvertedColor: {
      type: String,
      default: "#FDD835",
      validate: function (value) {
        return value != null && value != "";
      },
    },
    fillColor: {
      type: String,
      default: "#235D8C",
      validate: function (value) {
        return value != null && value != "";
      },
    },
  },
  { _id: false, timestamps: false }
);

const SuccessPageSchema = new Schema(
  {
    pageType: {
      type: String,
      enum: ["default", "custom", "branded"],
      default: "default",
    },
    defaultLink: { type: String, default: "" },
    customLink: {
      type: String,
      default: "",
      required: function () {
        return this.pageType == "custom";
      },
      validator: function (value, callback) {
        // Complete async task
        const result = this.pageType == "custom" && value != null;
        callback(result);
      },
    },
    brand: { type: BrandSchema, default: {} },
  },
  { _id: false, timestamps: false }
);

const FailPageSchema = new Schema(
  {
    pageType: {
      type: String,
      enum: ["default", "custom"],
      default: "default",
    },
    defaultLink: { type: String, default: "default_page_link" },
    customLink: {
      type: String,
      default: null,
      required: function () {
        return this.pageType == "custom";
      },

      validator: function (value, callback) {
        // Complete async task
        const result = this.pageType == "custom" && value != null;
        callback(result);
      },
    },
  },
  { _id: false, timestamps: false }
);

const AllowDomainSchema = new Schema(
  {
    enableAllowDomain: { type: Boolean, default: false },
    allowDomainValue: {
      type: [String],
      default: [],
      require: function () {
        return this.enableAllowDomain;
      },
      validate: function (value) {
        // Complete async task
        if (this.enableAllowDomain) {
          return value.length != 0;
        } else {
          return true;
        }
      },
    },
  },
  { _id: false, timestamps: false }
);

const ReCaptchaSchema = new Schema(
  {
    enablereCaptcha: { type: Boolean, default: false },
    reCaptchaSecretValue: {
      type: String,
      default: null,
      required: function () {
        return this.enablereCaptcha;
      },
      validator: function (value, callback) {
        // Complete async task
        const result = this.enablereCaptcha && value != null;
        callback(result);
      },
    },
  },
  { _id: false, timestamps: false }
);

const FileUploadSchema = new Schema(
  {
    enableFileUpload: { type: Boolean, default: false },
    accessKeyID: {
      type: String,
      default: null,
      required: function () {
        return this.enableFileUpload;
      },
      validator: function (value, callback) {
        // Complete async task
        const result = this.enableFileUpload && value != null;
        callback(result);
      },
    },
    secretAccessKey: {
      type: String,
      default: null,
      required: function () {
        return this.enableFileUpload;
      },
      validator: function (value, callback) {
        // Complete async task
        const result = this.enableFileUpload && value != null;
        callback(result);
      },
    },
    region: {
      type: String,
      default: null,
      required: function () {
        return this.enableFileUpload;
      },
      validator: function (value, callback) {
        // Complete async task
        const result = this.enableFileUpload && value != null;
        callback(result);
      },
    },
    bucket: {
      type: String,
      default: null,
      required: function () {
        return this.enableFileUpload;
      },
      validator: function (value, callback) {
        // Complete async task
        const result = this.enableFileUpload && value != null;
        callback(result);
      },
    },
    directory: {
      type: String,
      default: "root dir",
      validate: function (value) {
        return value != null && value != "";
      },
    },
    allowedMimes: {
      type: [String],
      default: [],
    },
    uploadFileSize: {
      type: String,
      default: "25000KB",
      validate: function (value) {
        return value != null && value != "";
      },
    },
  },
  { _id: false, timestamps: false }
);

const FormsSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    formKey: { type: String, required: true, unique: true },
    formName: { type: String, required: [true, "Form Name is required"] },
    forwardTo: {
      type: [String],
      required: [true, "Forward To is required"],
      default: null,
      validate: function (value) {
        // Complete async task
        return value.length != 0;
      },
    },
    submissionEmailTheme: {
      type: String,
      enum: ["default", "minmal"],
      default: "default",
    },
    succeessPage: {
      type: SuccessPageSchema,
      default: {},
    },
    failPage: {
      type: FailPageSchema,
      default: {},
    },
    logo: { type: String },
    allowDomain: { type: AllowDomainSchema, default: {} },
    honeypot: { type: String, default: null },
    reCaptcha: { type: ReCaptchaSchema, default: {} },
    fileUpload: { type: FileUploadSchema, default: {} },
    blockedMail: { type: [String] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

FormsSchema.virtual("formLink").get(function () {
  return `<form action="${environment.server.url}/f/${this.formKey}" method="POST">`;
});

// Pre hook for `findOneAndUpdate`
FormsSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
});

const FormsModel = mongoose.model("forms", FormsSchema);

module.exports = FormsModel;
