import * as yup from "yup";

export enum Role {
  AGENT = "agent",
  ADMIN = "admin",
  USER = "user",
}

export type SignUpFormFields = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role?: Role;
};

export type SignInFormFields = {
  username: string;
  password: string;
};

export type EditUserFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};

export const signUpSchema = yup
  .object({
    firstName: yup.string().required("FirstName is required"),
    lastName: yup.string().required("LastName is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone is required"),
    password: yup.string().required("Password is required"),
    role: yup.string().required("Role is required"),
  })
  .required();

export const signInSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const userEditSchema = yup
  .object({
    firstName: yup.string().optional().required(),
    lastName: yup.string().optional().required(),
    email: yup.string().email().required(),
    phone: yup.string().optional().required(),
    password: yup.string().optional().nullable(),
    role: yup.string().optional().nullable(),
  })
  .required();
