import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../App.css";
import "./CartMessage.css";

function CartMessage() {
  const { message } = useContext(CartContext);

  if (!message) return null;

  return <div className="cart-notification">{message}</div>;
}

export default CartMessage;
