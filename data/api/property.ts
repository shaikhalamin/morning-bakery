import axios from "axios";
import _ from "lodash";
import qs from "qs";
import { API_PROXY_BASE, API_URLS } from "../utils/api.urls";
import { removeFalsy } from "../utils/lib";

const PROPERTY_URL = '';

export const getProperties = (filters: string = "") => {
  const propertyUrl = filters.length > 0 ? `${PROPERTY_URL}${filters}` : PROPERTY_URL;
  return axios.get(propertyUrl);
};

export type BasicType = {
  page: number;
  perPage: number;
};

export type KeyValueObject = {
  [key: string]: string | number;
};

export type PropertyQueryFilters = {
  propertyType?: string;
  propertyFeatures?: string;
  purpose?: string;
  cityId?: number | string;
  userId?: number | string;
  price?: number;
  noOfBedRoom?: number;
}

export type FilterType = {
  basic: BasicType;
  order?: KeyValueObject;
  filters?: PropertyQueryFilters;
};

export type PropertiesFilter = FilterType

const createFilterUrl = (filterObject: PropertiesFilter) => {
  const query = qs.stringify(
    {
      ...filterObject.basic,
      order: {
        ...filterObject.order,
      },
      filters: {
        ...removeFalsy(filterObject.filters as KeyValueObject),
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  return query;
};

export const getPropertyDetails = async (id: number) => {
  return axios.get(`${PROPERTY_URL}/${id}`);
};

export const getPropertiesByFilter = async (filterObject: PropertiesFilter) => {
  const query = createFilterUrl(filterObject);
  return axios.get(`${PROPERTY_URL}?${query}`);
};

export const createProperty = (propertyPayload: any) => {
  return axios.post(`${API_PROXY_BASE}/property`, propertyPayload);
};

export const editProperty = (propertyId: number, propertyPayload: any) => {
  return axios.patch(
    `${API_PROXY_BASE}/property/${propertyId}`,
    propertyPayload
  );
};
