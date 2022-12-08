import { Property } from "@/data/model/property";
import { PropertyFormHelpers } from "@/data/types/property/property";
import * as yup from "yup";
import _ from "lodash";

export const propertySchema = yup
  .object({
    name: yup.string().required("Name is required"),
    purpose: yup.mixed().oneOf(["SALE", "RENT"]), //yup.string().required("Purpose is required").typeError("Please select a purpose"),
    descriptions: yup.string().required("Description is required"),
    address: yup.string().required("Address is required"),
    accommodations: yup.string().required("Accommodations is required"),
    garage: yup.boolean().required("Garage is required"),
    additionalSpec: yup.string().nullable().optional(),
    electricityCost: yup.string().required("Electricity cost is required"),
    lat: yup.number().required().typeError("Please add a valid lat"),
    long: yup.number().required().typeError("Please add a valid long"),
    parking: yup.string().required("Parking cost is required"),
    heating: yup.string().required("Heating cost is required"),

    price: yup.number().required().typeError("Please add a valid price"),
    noOfBedRoom: yup
      .number()
      .required()
      .typeError("Please add a valid noOfBedRoom"),
    noOfBathRoom: yup
      .number()
      .required()
      .typeError("Please add a valid noOfBathRoom"),
    propertySize: yup
      .number()
      .required()
      .typeError("Please add a valid propertySize"),
    yearBuild: yup
      .number()
      .required()
      .typeError("Please add a valid yearBuild"),
    totalFloors: yup
      .number()
      .required()
      .typeError("Please add a valid totalFloors"),
    ceilingHeight: yup
      .number()
      .required()
      .typeError("Please add a valid ceilingHeight"),
    distanceFromCenter: yup
      .number()
      .required()
      .typeError("Please add a valid distanceFromCenter"),
    utilityCost: yup
      .number()
      .required()
      .typeError("Please add a valid utilityCost"),
    cableTvCost: yup
      .number()
      .required()
      .typeError("Please add a valid cableTvCost"),
    areaSize: yup.number().required().typeError("Please add a valid areaSize"),
    propertyType: yup
      .number()
      .required("Property type is required")
      .typeError("Please select a property type"),
    city: yup
      .number()
      .required("City is required")
      .typeError("Please select a city"),
    features: yup.array().of(yup.string()).nullable(),
    // propertyImages: yup.array().required(),
  })
  .required();

export const propertyPurpose = [
  {
    id: "SALE",
    name: "Sale",
  },
  {
    id: "RENT",
    name: "Rent",
  },
];

export type PropertyFormData = {
  data: PropertyFormHelpers;
};

export type PropertyFormFields = {
  name: string;
  purpose: string;
  descriptions: string;
  address: string;
  accommodations: string;
  garage: string;
  additionalSpec: string;
  electricityCost: string;
  lat: string;
  long: string;
  parking: string;
  heating: string;
  price: number;
  noOfBedRoom: number;
  noOfBathRoom: number;
  propertySize: number;
  yearBuild: number;
  totalFloors: number;
  ceilingHeight: number;
  distanceFromCenter: number;
  utilityCost: number;
  cableTvCost: number;
  areaSize: number;
  propertyType: number;
  city: number;
  features: string[];
};

export const setPropertyEditForm = (
  property: Property,
  setValue: CallableFunction
) => {
  setValue("name", property.name);
  setValue("purpose", property.purpose);
  setValue("descriptions", property.descriptions);
  setValue("address", property.address);
  setValue("accommodations", property.accommodations);
  setValue("garage", property.garage);
  setValue("additionalSpec", property.additionalSpec);
  setValue("electricityCost", property.electricityCost);
  setValue("lat", property.lat);
  setValue("long", property.long);
  setValue("parking", property.parking);
  setValue("heating", property.heating);
  setValue("price", property.price);
  setValue("noOfBedRoom", property.noOfBedRoom);
  setValue("noOfBathRoom", property.noOfBathRoom);
  setValue("propertySize", property.propertySize);
  setValue("yearBuild", property.yearBuild);
  setValue("totalFloors", property.totalFloors);
  setValue("ceilingHeight", property.ceilingHeight);
  setValue("distanceFromCenter", property.distanceFromCenter);
  setValue("utilityCost", property.utilityCost);
  setValue("cableTvCost", property.cableTvCost);
  setValue("areaSize", property.areaSize);
  setValue("propertyType", property.propertyType.id);
  setValue("city", property.city.id);
  setValue(
    "features",
    property.propertyFeatures.map((feature) => feature.featureId.toString())
  );
};

export const propertyFeatureMerge = (
  property: Property,
  features: string[]
): {
  itemToBeAdded: number[];
  itemToBeDeleted: number[];
} => {
  const existingFeature = property.propertyFeatures.map((ft) => ft.featureId);
  const featureAdded = features.map((ft) => +ft);
  const itemToBeDeleted = _.difference(existingFeature, featureAdded);
  const mergeNew = [...featureAdded, ...itemToBeDeleted];
  const itemToBeAdded = _.difference(mergeNew, existingFeature);

  return {
    itemToBeAdded,
    itemToBeDeleted,
  };
};
