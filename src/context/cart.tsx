import { createContext, PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { CartContextValue, CartItem } from "../Types";

export const CartContext = createContext<CartContextValue>(null!);

export const CartProvider = (props: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  const addToCart = (id: number, hotelName: string) => {
    const isItemInCart = cartItems.find((item) => item.id === id); // check if the item is already in the cart

    if (isItemInCart) {
      throw new Error("Item already in the cart!");
    } else {
      setCartItems([...cartItems, { id: id, hotelName: hotelName }]);
    }
  };

  const isReserved = (id: number) => {
    const isItemInCart = cartItems.find((item) => item.id === id);

    if (isItemInCart) {
      return true;
    } else return false;
  };

  const removeFromCart = (id: number) => {
    const isItemInCart = cartItems.find((item) => item.id === id);

    if (isItemInCart) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isReserved
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
