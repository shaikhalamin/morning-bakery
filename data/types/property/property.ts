import { City } from "@/data/model/city";
import { Feature } from "@/data/model/feature";
import { PropertyType } from "@/data/model/property-type";

export type PropertyFormHelpers = {
  propertyTypes: PropertyType[];
  cities: City[];
  features: Feature[]
};

export const PROPERTY_PURPOSES = [
  {
    id: "SALE",
    name: "Sale",
  },
  {
    id: "RENT",
    name: "Rent",
  },
];


