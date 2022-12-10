import { Cart } from "@/data/model/cart";
import { Product } from "@/data/model/products";
import { createContext, useContext } from "react";

export type BakeryContextType = {
  cartItems: Cart[];
  currentQuantity: number;
  cartShow:boolean;
  setCartShow: (show: boolean) => void;
  setCurrentQuantity: (qty: number) => void;
  handleCartQuantity: (qty: number) => void;
  handleCartItem: (product: Product,qty:number) => void;
  deleteCartItem: (product: Product) => void;
};

const bakeryContextDefaultValues: BakeryContextType = {
  cartItems: [],
  currentQuantity: 0,
  cartShow:false,
  setCartShow: () => {},
  setCurrentQuantity: () => {},
  handleCartQuantity: () => {},
  handleCartItem: () => {},
  deleteCartItem: () => {},
};

export const BakeryContext = createContext<BakeryContextType>(
  bakeryContextDefaultValues
);

export function useBakeryContext() {
  return useContext(BakeryContext);
}
