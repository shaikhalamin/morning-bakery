import { Product } from "./products";

export type Cart = {
  item: Product;
  quantity: number;
  price: number;
};
