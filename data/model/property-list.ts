import { Property } from "./property";

export type PropertyList = {
  success: boolean;
  data: Property[];
  meta: {
    all_total: number;
    total: number;
    per_page: number;
    page: number;
  };
};
