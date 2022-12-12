import * as yup from "yup";

export const contactUsSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    email: yup.string().email().required("Email is required").typeError("Please insert valid email address"),
    message: yup.string().required("Message is required"),
  })
  .required();

export type ContactUsFormFields = {
    name: string;
    phone: string;
    email: string;
    message: string;
};
