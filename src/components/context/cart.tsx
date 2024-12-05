import { createContext, PropsWithChildren, ReactElement } from "react";
import { useState, useEffect } from "react";
import { CartContextValue, CartItem } from "../../Types";

export const CartContext = createContext<CartContextValue>(null!);

export const CartProvider = (props: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  const addToCart = (item: CartItem) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id); // check if the item is already in the cart

    if (isItemInCart) {
      throw new Error("Item already in the cart!");
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id: number) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === id);

    if (isItemInCart) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0); // calculate the total price of the items in the cart
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
        getCartTotal,
      }}>
      {props.children}
    </CartContext.Provider>
  );
};
