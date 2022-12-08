import { Feature } from "./feature";

export type PropertyFeature = {
  id: number;
  created_at: string;
  updated_at: string;
  propertyId: number;
  featureId: number;
  feature: Feature;
};
