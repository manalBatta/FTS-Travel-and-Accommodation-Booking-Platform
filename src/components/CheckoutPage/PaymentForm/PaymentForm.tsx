import React, { useState, useContext } from "react";
import "./PaymentForm.css";
import { CartContext } from "../../context/cart";
import Button from "../../Button/Button";

type PaymentFormProps = {
  pay: () => void;
};
const PaymentForm = ({ pay }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const { clearCart } = useContext(CartContext);

  const confirmPayment = () => {
    pay();
    clearCart();
  };

  return (
    <div className="payment-form">
      <h2>Payment</h2>
      <hr />
      <label>Pay With:</label>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Card"
            checked={paymentMethod === "Card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Bank"
            checked={paymentMethod === "Bank"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Bank
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Transfer"
            checked={paymentMethod === "Transfer"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Transfer
        </label>
      </div>
      {paymentMethod === "Card" && (
        <>
          <div className="input-group">
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9101 1121" />
          </div>
          <div className="input-group-row">
            <div className="input-group">
              <label>Expiration Date</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input type="text" placeholder="123" />
            </div>
          </div>
          <label className="checkbox-group">
            <input type="checkbox" />
            Save card details
          </label>
        </>
      )}
      <div className="buttons">
        <Button>
          <button className="confirm-button " onClick={confirmPayment}>
            Confirm Payment
          </button>
        </Button>
      </div>
      <p className="privacy-note">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our privacy policy.
      </p>
    </div>
  );
};

export default PaymentForm;
