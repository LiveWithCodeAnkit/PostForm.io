import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { APIKEY } from "@/components/constant/heroSection";
import { newFormSchema } from "@/components/form/schema/newFormSchema";

export const useConfiguration = () => {
  const param = useParams();

  const [listForms, setListForm] = useState([]);

  const handleSubmit = async () => {
    const authorization = getCookie("token");
    try {
      const response = await fetch(`${APIKEY}/forms/${param.sidebar}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      setListForm(responseData.data);
    } catch (error) {
      Warn(error.message || "Something went wrong :(");
    }
  };

  const initialValues = {
    formName: listForms.formName,
    forwardTo: listForms.forwardTo,
    submissionEmailTheme: listForms.submissionEmailTheme,
    enableAllowDomain: listForms.allowDomain?.enableAllowDomain,
    allowDomainValue: listForms.allowDomain?.allowDomainValue,
    honeypot: listForms.honeypot,
    enablereCaptcha: listForms.reCaptcha?.enablereCaptcha,
    reCaptchaSecretValue: listForms.reCaptcha?.reCaptchaSecretValue,
    accessKeyID: listForms.fileUpload?.accessKeyID,
    allowedMimes: listForms.fileUpload?.allowedMimes,
    bucket: listForms.fileUpload?.bucket,
    directory: listForms.fileUpload?.directory,
    enableFileUpload: listForms.fileUpload?.enableFileUpload,
    region: listForms.fileUpload?.region,
    secretAccessKey: listForms.fileUpload?.secretAccessKey,
    uploadFileSize: listForms.fileUpload?.uploadFileSize,
    blockedMails: "",
  };

  const handleForm = async (values, { resetForm }) => {
    const { formName, forwardTo, submissionEmailTheme } = values;

    const authorization = getCookie("token");

    try {
      const response = await fetch(`${APIKEY}/forms/${param.sidebar}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ formName, forwardTo, submissionEmailTheme }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };

  const handleDomain = async (values, { resetForm }) => {
    const { enableAllowDomain, allowDomainValue } = values;

    const allowDomain = {
      enableAllowDomain: "true",
      allowDomainValue: allowDomainValue,
    };
    const authorization = getCookie("token");

    try {
      const response = await fetch(`${APIKEY}/forms/${param.sidebar}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ allowDomain }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();
      console.log("handledomain:=", responseData);
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };

  const handleHoneyPot = async (values, { resetForm }) => {
    const { honeypot } = values;

    const authorization = getCookie("token");

    try {
      const response = await fetch(`${APIKEY}/forms/${param.sidebar}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ honeypot }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();
      console.log("handledomain:=", responseData);
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };

  const handleRecaptcha = async (values, { resetForm }) => {
    const { enablereCaptcha, reCaptchaSecretValue } = values;

    const reCaptcha = {
      enablereCaptcha: "true",
      reCaptchaSecretValue: reCaptchaSecretValue,
    };

    const authorization = getCookie("token");

    try {
      const response = await fetch(`${APIKEY}/forms/${param.sidebar}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ reCaptcha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();
      console.log("handleRecaptcha:=", responseData);
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };
  //////////////form fill up

  const handleFormFill = async (values, { resetForm }) => {
    const {
      accessKeyID,
      allowedMimes,
      bucket,
      directory,
      region,
      secretAccessKey,
      uploadFileSize,
    } = values;

    const fileUpload = {
      accessKeyID,
      allowedMimes,
      bucket,
      directory,
      enableFileUpload: true,
      region,
      secretAccessKey,
      uploadFileSize,
    };

    const authorization = getCookie("token");

    try {
      const response = await fetch(`${APIKEY}/forms/${param.sidebar}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ fileUpload }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();
      console.log("fileUpload:=", responseData);
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };

  const handleBlockMail = async (values, { resetForm }) => {
    handleSubmit();
    console.log(values);
    const blockMails = [];
    blockMails.push(listForms.blockedMail);

    const { blockedMails } = values;

    blockMails.push(blockedMails);
    const authorization = getCookie("token");

    const blockedMail = blockMails;


    console.log("i...:=",blockedMail);

    try {
      const response = await fetch(`${APIKEY}/forms/${param.sidebar}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({ blockedMail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong :(");
      }

      const responseData = await response.json();
      console.log("blockMail:=", responseData);
    } catch (error) {
      // Warn(error.message || "Something went wrong :(");
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return {
    listForms,
    initialValues,
    newFormSchema,
    handleForm,
    handleDomain,
    handleHoneyPot,
    handleRecaptcha,
    handleFormFill,
    handleBlockMail,
  };
};
