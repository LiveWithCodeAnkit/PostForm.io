var mail_helper = {};
const sgMail = require("@sendgrid/mail");
const environment = require("../utils/environment");

sgMail.setApiKey(environment.sendgrid.apiKey);
const templates = [
  {
    id: "d-<template-id>",
    name: "email_confirmation",
  },
];

mail_helper.send = async (template_name, options, data) => {
  return new Promise((resolve, reject) => {
    try {
      const template = templates.find((t) => t.name === template_name);
      if (template) {
        const msg = {
          to: options.to,
          from: {
            email: environment.sendgrid.senderEmail,
            name: environment.sendgrid.senderName,
          },
          subject: options.subject,
          templateId: template.id,
          dynamicTemplateData: data,
          ...(options.attachments ? { attachments: options.attachments } : {}),
        };
        sgMail[options.multiple ? "sendMultiple" : "send"](msg).then(
          () => {
            resolve({ status: 1 });
          },
          (error) => {
            console.error(error);

            if (error.response) {
              console.error(error.response.body);
              reject({
                status: 0,
                error: error.response.body,
              });
            } else {
              reject({
                status: 0,
                error,
              });
            }
          }
        );
      } else {
        console.log({
          status: 0,
          error: "SG Email template not found",
        });

        reject({
          status: 0,
          error: "SG Email template not found",
        });
      }
    } catch (err) {
      console.log("Catch Error: ", { err });
      reject({
        status: 0,
        error: err,
      });
    }
  });
};

mail_helper.templates = templates;

module.exports = mail_helper;
