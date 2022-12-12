import axios from "axios";
import { API_URLS } from "../utils/api.urls";

const CATEGORIES_URL = API_URLS.categories;

export const getCategories = (filters: string = "") => {
  const categoriesUrl = filters.length > 0 ? `${CATEGORIES_URL}${filters}` : CATEGORIES_URL;
  return axios.get(categoriesUrl);
};