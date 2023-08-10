import * as Yup from "yup";

export const newFormSchema = Yup.object().shape({
  formName: Yup.string().required("Name Required !"),
  forwardTo: Yup.array().required("Emails Required !"),
});
