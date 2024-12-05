import { useContext, useState } from "react";
import "./CheckoutPage.css";
import { CartContext } from "../context/cart";
import { BookingDetails } from "../../Types";

const CheckoutPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [roomsINCart, setRoomsINCart] = useState<BookingDetails[]>([]);

  // const getRoomsDeatials
  return <>hello</>;
};

export default CheckoutPage;
