import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartMessage.css";

function CartMessage() {
  const { notification, setNotification } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [notification, setNotification]);

  const handleGoToCart = () => {
    setNotification(null);
    navigate("/carrinho");
  };

  if (!notification) return null;

  const { product } = notification;

  return (
    <div className="cart-card">
      <div className="cart-card-header">
        <span>✅ Adicionado ao carrinho</span>
        <button onClick={() => setNotification(null)}>✕</button>
      </div>

      <div className="cart-card-body">
        <img
          src={`http://localhost:5000/images/${product.image}`}
          alt={product.name}
        />
        <div className="cart-info">
          <h4>{product.name}</h4>
          {product.size && <p className="size">Tamanho: {product.size}</p>}
          <p className="price">R$ {product.price}</p>
        </div>
      </div>

      <button className="view-cart-btn" onClick={handleGoToCart}>
        Ver carrinho
      </button>
    </div>
  );
}

export default CartMessage;
