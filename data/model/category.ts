import { StorageFile } from "./storage-file";

export type Category = {
  id: number;
  name: string;
  alias: string;
  created_at: string;
  updated_at: string;
  storage_file: StorageFile
};
