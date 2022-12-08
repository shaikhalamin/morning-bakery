import axios from "axios";
import { API_URLS } from "../utils/api.urls";

const PRODUCTS_URL = API_URLS.products;

export const getProducts = (filters: string = "") => {
  const productsUrl =
    filters.length > 0 ? `${PRODUCTS_URL}${filters}` : PRODUCTS_URL;
  return axios.get(productsUrl);
};
