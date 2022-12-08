import { EditUserFormFields } from "@/components/auth/helpers";
import axios from "axios";
import { API_PROXY_BASE, API_URLS } from "../utils/api.urls";

const USER_URL = API_URLS.users;

export const getUsers = (accessToken?: string) => {
  return axios.get(`${USER_URL}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getUser = (id: number, accessToken: string) => {
  return axios.get(`${USER_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateUser = (id: number, userPayload: EditUserFormFields) => {
  return axios.patch(`${API_PROXY_BASE}/user/${id}`, userPayload);
};

// export const createProperty = (propertyPayload: any) => {
//     return axios.post(`${API_PROXY_BASE}/property`, propertyPayload);
// };
