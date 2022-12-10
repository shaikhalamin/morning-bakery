import { Cart } from "@/data/model/cart";
import { Product } from "@/data/model/products";
import { createContext, useContext } from "react";

export type bakeryContextType = {
  cartItems: Cart[];
  currentQuantity: number;
  setCurrentQuantity: (qty: number) => void;
  handleCartQuantity: (qty: number) => void;
  handleCartItem: (product: Product) => void;
  deleteCartItem: (product: Product) => void;
};

const bakeryContextDefaultValues: bakeryContextType = {
  cartItems: [],
  currentQuantity: 0,
  setCurrentQuantity: () => {},
  handleCartQuantity: () => {},
  handleCartItem: () => {},
  deleteCartItem: () => {},
};

export const BakeryContext = createContext<bakeryContextType>(
  bakeryContextDefaultValues
);

export function useBakeryContext() {
  return useContext(BakeryContext);
}
