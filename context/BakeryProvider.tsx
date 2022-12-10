import { Cart } from "@/data/model/cart";
import { Product } from "@/data/model/products";
import React, { ReactNode, useEffect, useReducer, useState } from "react";
import { BakeryContext } from "./BakeryContext";
import Cookies from "js-cookie";

type BakeryProviderProps = {
  children: ReactNode;
};

const BakeryProvider: React.FC<BakeryProviderProps> = ({ children }) => {
  //const [state, dispatch] = useReducer(CampaignReducer, initialState);

  const [cart, setCart] = useState<Cart[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (Cookies.get("bakeryCartItems") !== undefined) {
      const cartFromCookies = JSON.parse(
        Cookies.get("bakeryCartItems") as string
      ) as Cart[];
      setCart(cartFromCookies);
    }
  }, []);

  useEffect(() => {
    cart.length > 0 && Cookies.set("bakeryCartItems", JSON.stringify(cart));
  }, [cart]);

  const setCurrentQuantity = (qty: number) => {
    setQuantity(qty)
  };

  const handleCartQuantity = (qty: number) => {
    qty === 0 && quantity > 1 && setQuantity((prev) => prev - 1);
    qty === 1 && setQuantity((prev) => prev + 1);
  };

  const handleCartItem = (product: Product) => {
    const findIndex = cart.findIndex((cItem) => cItem.item.id === product.id);
    const cartItem = {
      item: product,
      quantity: quantity,
      price: product.price * quantity,
    } as Cart;

    if (findIndex != -1) {
      cart.splice(findIndex, 1, cartItem);
      setCart((prev) => [...prev]);
    } else {
      setCart((prev) => [...prev, cartItem]);
    }
  };

  const deleteCartItem = (product: Product) => {
    const findIndex = cart.findIndex((cItem) => cItem.item.id === product.id);
    if (findIndex != -1) {
      cart.splice(findIndex, 1);
      setCart((prev) => [...prev]);
    }
  };

  const value = {
    cartItems: cart,
    currentQuantity: quantity,
    setCurrentQuantity,
    handleCartQuantity,
    handleCartItem,
    deleteCartItem,
  };
  return (
    <BakeryContext.Provider value={value}>{children}</BakeryContext.Provider>
  );
};

export default BakeryProvider;
