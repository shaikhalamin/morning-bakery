import axios from "axios";
import { API_URLS } from "../utils/api.urls";

const FILES_URL = API_URLS.storageFiles;

export const getStorageFiles = (filters: string = "") => {
  const filesUrl = filters.length > 0 ? `${FILES_URL}${filters}` : FILES_URL;
  return axios.get(filesUrl);
};
