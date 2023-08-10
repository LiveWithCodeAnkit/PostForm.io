const LogsModel = require("../models/logs.model");
const { sendErrorResponse } = require("../utils/response");
const FormsModel = require("../models/forms.model");
const fetch = require("isomorphic-fetch");

const allowDomainMiddleware = async (req, res, next) => {
  try {
    const formKey = req.params.formKey;
    const filter = { formKey: formKey };
    const host = req.hostname;
    const formsData = await FormsModel.findOne(filter);

    if (formsData) {
      const enableAllowDomain = await formsData.allowDomain.enableAllowDomain;
      const allowDomainValue = await formsData.allowDomain.allowDomainValue;

      if (enableAllowDomain) {
        const allowDomainValidation = await allowDomainValue.includes(host);

        if (allowDomainValidation) {
          next();
        } else {
          const logs = new LogsModel({
            formId: formsData._id,
            msg: "Submission rejected because this domain doesn't allow.",
            status: "failed by domain",
          });

          const log = await logs.save();
          sendErrorResponse(
            res,
            "Submission rejected because this domain doesn't allow."
          );
        }
      } else {
        next();
      }
    } else {
      const msg = {
        error: "Form dosen't exist",
      };
      sendErrorResponse(res, msg);
    }
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, err);
  }
};

const honeypotMiddleware = async (req, res, next) => {
  try {
    const formKey = req.params.formKey;
    const filter = { formKey: formKey };
    const formsData = await FormsModel.findOne(filter);

    if (formsData) {
      const honeypot = await formsData.honeypot;

      if (honeypot) {
        const honeypotIncludeInReq = req.body[honeypot];
        if (honeypotIncludeInReq == "") {
          next();
        } else {
          const logs = new LogsModel({
            formId: formsData._id,
            msg: "Submission rejected because request contain honeypot field.",
            status: "failed by honeypot",
          });

          const log = await logs.save();
          sendErrorResponse(
            res,
            "Submission rejected because request contain honeypot field."
          );
        }
      } else {
        next();
      }
    } else {
      const msg = {
        error: "Form dosen't exist",
      };
      sendErrorResponse(res, msg);
    }
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, err);
  }
};

const reCAPTCHAMiddleware = (req, res, next) => {
  // getting site key from client side
  const response_key = req.body["g-recaptcha-response"];
  // Put secret key here, which we get from google console
  const secret_key = "6Ld-MGwnAAAAAA04M4J6fiOaDyFQYstatvByUmHj";

  console.log(req.body);

  // Hitting POST request to the URL, Google will
  // respond with success or error scenario.
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

  // Making POST request to verify captcha
  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => {
      // google_response is the object return by
      // google as a response
      if (google_response.success == true) {
        //   if captcha is verified
        return res.send({ response: "Successful" });
      } else {
        // if captcha is not verified
        return res.send({ response: "Failed" });
      }
    })
    .catch((error) => {
      // Some error while verify captcha
      return res.json({ error });
    });
};

const blockedEmailsMiddleware = async (req, res, next) => {
  try {
    const formKey = req.params.formKey;
    const filter = { formKey: formKey };
    const formsData = await FormsModel.findOne(filter);

    if (FormData) {
      const blockMailValidation = await formsData.blockedMail.includes(
        req.body.email
      );

      if (blockMailValidation) {
        const logs = new LogsModel({
          formId: formsData._id,
          msg: "Submission rejected because it contained a blocked email.",
          status: "failed by blocked email",
        });

        const log = await logs.save();
        sendErrorResponse(
          res,
          "Submission rejected because it contained a blocked email."
        );
      } else {
        next();
      }
    } else {
      const msg = {
        error: "Form dosen't exist",
      };
      sendErrorResponse(res, msg);
    }
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, err);
  }
};

const emptyDataMiddleware = async (req, res, next) => {
  try {
    const formData = req.body;
    if (formData != {}) {
      next();
    } else {
      const logs = new LogsModel({
        formId: formsData._id,
        msg: "Submission rejected because it's doesn't contained any data",
        status: "failed by empty data entry",
      });

      const log = await logs.save();
      sendErrorResponse(
        res,
        "Submission rejected because it's doesn't contained any data"
      );
    }
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, err);
  }
};

const submitFormMiddleware = [];

submitFormMiddleware.push(emptyDataMiddleware);
submitFormMiddleware.push(allowDomainMiddleware);
submitFormMiddleware.push(honeypotMiddleware);
// submitFormMiddleware.push(reCAPTCHAMiddleware);
submitFormMiddleware.push(blockedEmailsMiddleware);

module.exports = submitFormMiddleware;
