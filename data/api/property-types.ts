import axios from "axios";
import { API_URLS } from "../utils/api.urls";

const PROPERTY_TYPES_URL = '';

export const getPropertyTypes = () => {
  return axios.get(PROPERTY_TYPES_URL);
};

// export const createCompany = async (formData: any) => {
//   return axios.post(COMPANIES_URL, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const getCompanyDetails = async (id: number) => {
//   return axios.get(`${COMPANIES_URL}/${id}`);
// };

// export const updateCompany = async (id: number, formData: any) => {
//   return axios.post(`${COMPANIES_URL}/${id}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const prepareFormData = (company: any, method = "POST") => {
//   const { files, name, from, to, daily_budget, total_budget } = company;

//   let formData = new FormData();
//   formData.append("name", name);
//   formData.append("from", new Date(from).toISOString().split("T")[0]);
//   formData.append("to", new Date(to).toISOString().split("T")[0]);
//   formData.append("daily_budget", daily_budget);
//   formData.append("total_budget", total_budget);

//   files &&
//     _.forEach(files, (file) => {
//       formData.append("images[]", file);
//     });

//   method === "PUT" && formData.append("_method", "PUT");

//   return formData;
// };
