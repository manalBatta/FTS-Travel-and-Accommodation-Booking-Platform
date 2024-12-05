import { useContext } from "react";
import "./Cart.css";
import { IoBagCheck } from "react-icons/io5";
import { CartContext } from "../../context/cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Link to={"/checkoutPage"} className="fixed-con">
      <h1>{cartItems.length}</h1>
      <IoBagCheck />
    </Link>
  );
};

export default Cart;
