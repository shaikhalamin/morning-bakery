import { Cart } from "@/data/model/cart";
import { Product } from "@/data/model/products";
import React, { ReactNode, useEffect, useState } from "react";
import { BakeryContext } from "./BakeryContext";
import { getCartCookies, setCartCookies } from "./cookies";

type BakeryProviderProps = {
  children: ReactNode;
};

const BakeryProvider: React.FC<BakeryProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setCart(getCartCookies());
  }, []);

  useEffect(() => {
    cart.length > 0 && setCartCookies(cart);
  }, [cart]);

  const handleCartItem = (product: Product, qty: number) => {
    const findIndex = cart.findIndex((cItem) => cItem.item.id === product.id);
    const cartItem = {
      item: product,
      quantity: qty,
      price: product.price * qty,
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
      const cartFromCookies = getCartCookies();
      cartFromCookies.splice(findIndex, 1);
      setCartCookies(cartFromCookies);
    }
  };

  const setCartShow = (show: boolean) => {
    setShowCart(show);
  };

  const value = {
    cartItems: cart,
    cartShow: showCart,
    setCartShow,
    handleCartItem,
    deleteCartItem,
  };
  return (
    <BakeryContext.Provider value={value}>{children}</BakeryContext.Provider>
  );
};

export default BakeryProvider;
