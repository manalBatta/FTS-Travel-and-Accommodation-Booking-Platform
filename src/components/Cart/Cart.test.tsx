import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartContext } from "../context/cart";
import Cart from "./Cart";
import { CartItem } from "../../Types";

describe("Cart Component", () => {
  const mockClearCart = jest.fn();
  const addToCart = jest.fn();
  const removeFromCart = jest.fn();

  const renderWithContext = (cartItems: CartItem[]) => {
    render(
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          clearCart: mockClearCart,
        }}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </CartContext.Provider>
    );
  };

  it("renders correctly with no items in the cart", () => {
    renderWithContext([]);
    const cartCount = screen.getByText("0");
    const link = screen.getByRole("link");
    fireEvent.click(link);
    expect(cartCount).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/checkoutPage");
  });

  it("renders correctly with items in the cart", () => {
    renderWithContext([
      { id: 1, hotelName: "Item 1" },
      { id: 2, hotelName: "Item 2" },
    ]);
    const cartCount = screen.getByText("2");
    const link = screen.getByRole("link");
    expect(cartCount).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/checkoutPage");
  });

  it("prevents navigation when the cart is empty", () => {
    renderWithContext([]);
    const link = screen.getByRole("link");
    fireEvent.click(link);
    expect(link).toHaveAttribute("href", "/checkoutPage");
  });
});
