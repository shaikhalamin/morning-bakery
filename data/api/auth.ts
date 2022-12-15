
import { SignUpFormFields } from "@/components/auth/helpers";
import axios from "axios";
import { API_URLS } from "../utils/api.urls";
const AUTH_URL = API_URLS.auth;
const USER_URL = API_URLS.users;

type LoginCredentials =  {
    email: string
    password: string
}

export const login = async (formData: LoginCredentials) => {
  return axios.post(`${AUTH_URL}/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const signUp = async (formData: SignUpFormFields) => {
  return axios.post(`${USER_URL}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};