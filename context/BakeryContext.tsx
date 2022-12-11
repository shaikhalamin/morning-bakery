import { Cart } from "@/data/model/cart";
import { Product } from "@/data/model/products";
import { createContext, useContext } from "react";

export type BakeryContextType = {
  cartItems: Cart[];
  cartShow: boolean;
  setCartShow: (show: boolean) => void;
  handleCartItem: (product: Product, qty: number) => void;
  deleteCartItem: (product: Product) => void;
};

const bakeryContextDefaultValues: BakeryContextType = {
  cartItems: [],
  cartShow: false,
  setCartShow: () => {},
  handleCartItem: () => {},
  deleteCartItem: () => {},
};

export const BakeryContext = createContext<BakeryContextType>(
  bakeryContextDefaultValues
);

export function useBakeryContext() {
  return useContext(BakeryContext);
}
