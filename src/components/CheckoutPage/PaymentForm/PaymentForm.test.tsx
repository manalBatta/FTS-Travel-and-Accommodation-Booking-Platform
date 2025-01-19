import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentForm from "./PaymentForm";
import { CartContext } from "../../context/cart";
import Button from "../../Button/Button";
import { CartItem } from "../../../Types";

describe("PaymentForm", () => {
  const mockPay = jest.fn();
  const mockClearCart = jest.fn();
  const cartItems: CartItem[] = [];
  const addToCart = jest.fn();
  const removeFromCart = jest.fn();


  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          clearCart: mockClearCart,
        }}>
        <PaymentForm pay={mockPay} />
      </CartContext.Provider>
    );

  test("renders PaymentForm with default Card option", () => {
    renderComponent();

    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByLabelText("Card")).toBeChecked();
    expect(
      screen.getByPlaceholderText("1234 5678 9101 1121")
    ).toBeInTheDocument();
  });

  test("switches payment method to Bank", () => {
    renderComponent();

    const bankRadio = screen.getByLabelText("Bank");
    fireEvent.click(bankRadio);

    expect(bankRadio).toBeChecked();
    expect(
      screen.queryByPlaceholderText("1234 5678 9101 1121")
    ).not.toBeInTheDocument();
  });

  test("confirms payment and clears cart", () => {
    renderComponent();

    const confirmButton = screen.getByText("Confirm Payment");
    fireEvent.click(confirmButton);

    expect(mockPay).toHaveBeenCalled();
    expect(mockClearCart).toHaveBeenCalled();
  });

  test("renders special requests input for Card payment", () => {
    renderComponent();

    const specialRequestsInput = screen.getByPlaceholderText(
      "anything you wish.."
    );
    expect(specialRequestsInput).toBeInTheDocument();
  });

  test("renders privacy note", () => {
    renderComponent();

    expect(
      screen.getByText(
        /Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy\./
      )
    ).toBeInTheDocument();
  });
});
