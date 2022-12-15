import * as yup from "yup";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export type SignUpFormFields = {
  first_name:string;
  last_name:string;
  email: string;
  phone: string;
  password: string;
  role?: string;
};

export type SignInFormFields = {
  email: string;
  password: string;
};

export type EditUserFormFields = {
  first_name:string;
  last_name:string;
  email: string;
  phone: string;
  password: string;
};

export const signUpSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required").typeError("The email field must be a valid email address"),
    phone: yup.string().required("Phone is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const signInSchema = yup
  .object({
    email: yup.string().email().required("Email is required").typeError("The email field must be a valid email address"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const userEditSchema = yup
  .object({
    first_name: yup.string().optional().nullable(),
    last_name: yup.string().optional().nullable(),
    email: yup.string().email().optional().nullable(),
    phone: yup.string().optional().required(),
    password: yup.string().optional().nullable(),
  })
  .required();
