import { Agent } from "./agent";
import { City } from "./city";
import { FloorPlan } from "./floor-plan";
import { Image } from "./image-file";
import { PropertyFeature } from "./property-feature";
import { PropertyType } from "./property-type";

export type Property = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  descriptions: string;
  slug: string;
  purpose: string;
  address: string;
  price: number;
  noOfBedRoom: number;
  noOfBathRoom: number;
  propertySize: number;
  yearBuild: number;
  publishedDate?: string;
  heating: string;
  totalFloors: number;
  accommodations: string;
  ceilingHeight: number;
  distanceFromCenter: number;
  parking: string;
  areaSize: number;
  garage: boolean;
  garageSize?: number;
  additionalSpec: string;
  utilityCost: number;
  cableTvCost: number;
  electricityCost: string;
  lat: number;
  long: number;
  videoTourLink?: string;
  deposit: number;
  petAllowed: boolean;
  paymentPeriod: string;
  habitable: string;
  minimumStayDuration: number;
  propertyType: PropertyType;
  city: City;
  propertyImages: Image[];
  propertyFeatures: PropertyFeature[];
  floorPlans: FloorPlan[];
  agent: Agent
};

export type PropertyResponse = {
  success: boolean;
  data: Property | null;
};
