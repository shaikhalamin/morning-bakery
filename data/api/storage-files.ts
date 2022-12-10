import axios from "axios";
import { API_URLS } from "../utils/api.urls";

const FILES_URL = API_URLS.storageFiles;

export const getStorageFiles = (filters: string = "") => {
  const filesUrl = filters.length > 0 ? `${FILES_URL}${filters}` : FILES_URL;
  return axios.get(filesUrl);
};

export const uploadImage = (formData: FormData) => {
  return axios.post(FILES_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteImage = async (id: number) => {
  return axios.delete(`${FILES_URL}/${id}`);
};
