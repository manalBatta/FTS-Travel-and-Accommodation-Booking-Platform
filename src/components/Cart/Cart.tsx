import { useContext } from "react";
import "./Cart.css";
import { IoBagCheck } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Link
      to={"/checkoutPage"}
      className="fixed-con"
      onClick={(e) => {
        if (!cartItems.length) e.preventDefault();
      }}>
      <h1>{cartItems.length}</h1>
      <IoBagCheck />
    </Link>
  );
};

export default Cart;
