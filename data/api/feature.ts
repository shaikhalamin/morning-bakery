import axios from "axios";
import { API_URLS } from "../utils/api.urls";

const FEATURES_URL = '';

export const getFeatures = () => {
  return axios.get(FEATURES_URL);
};