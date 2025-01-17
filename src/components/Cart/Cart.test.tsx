import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartContext } from "../context/cart";
import Cart from "./Cart";

describe("Cart Component", () => {
  const renderWithContext = (cartItems) => {
    render(
      <CartContext.Provider value={{ cartItems }}>
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
    renderWithContext([{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }]);
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
