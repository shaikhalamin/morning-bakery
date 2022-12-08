import { StorageFile } from "./storage-file";

export type Product = {
  id: number;
  name: string;
  descriptions: string;
  quantity: number;
  weight: number;
  price: number;
  sku: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  storage_files: StorageFile[];
};
