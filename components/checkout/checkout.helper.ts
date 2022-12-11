import * as yup from "yup";

export const checkoutSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    streetAddress: yup.string().required("Street address is required"),
    townCity: yup.string().required("Town/City is required"),
    district: yup.string().required("District is required"),
    phone: yup.string().required("Phone is required"),
    zipCode: yup.string().required("Zip code is required"),
    email: yup.string().email().required("Email is required").typeError("Please insert valid email address"),
    message: yup.string().required("Message is required"),
  })
  .required();

export type CheckoutFormFields = {
  firstName: string;
  lastName: string;
  streetAddress: string;
  townCity: string;
  district: string;
  phone: string;
  zipCode: string;
  email: string;
  message: string;
};
