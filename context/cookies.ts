import { Cart } from "@/data/model/cart";
import Cookies from "js-cookie";

export const getCartCookies = () => {
  if (Cookies.get("bakeryCartItems") === undefined) {
    return [] as Cart[];
  }
  const cartItems = JSON.parse(
    Cookies.get("bakeryCartItems") as string
  ) as Cart[];

  return cartItems;
};

export const setCartCookies = (cart: Cart[]): void => {
  Cookies.set("bakeryCartItems", JSON.stringify(cart));
};
