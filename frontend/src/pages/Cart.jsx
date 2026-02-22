import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity, userToken } =
    useContext(CartContext);
  const navigate = useNavigate();

  // Redireciona guest sempre para a Home
  useEffect(() => {
    if (userToken === "guest") navigate("/", { replace: true });
  }, [userToken, navigate]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="empty-cart">Seu carrinho está vazio 🛒</h2>
      </div>
    );
  }

  const handleBuySingle = (item) => {
    navigate("/checkout", { state: { product: item } });
  };

  return (
    <div className="cart-container">
      <h1>Carrinho</h1>

      {cartItems.map((item) => (
        <div className="cart-item" key={`${item.id}-${item.size}-${item.name}`}>
          <img src={`http://localhost:5000/images/${item.image}`} alt={item.name} />

          <div className="cart-info">
            <h3>{item.name}</h3>
            {item.size && <p className="cart-size">Tamanho: {item.size}</p>}
            <p className="price">R$ {(item.price * item.quantity).toFixed(2)}</p>
          </div>

          <div className="quantity-control">
            <button
              onClick={() =>
                updateQuantity(item.id, item.size, item.name, item.quantity - 1)
              }
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item.id, item.size, item.name, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

          <div className="cart-actions">
            <button className="btn-buy-single" onClick={() => handleBuySingle(item)}>
              Comprar
            </button>
            <button
              className="btn-remove"
              onClick={() => removeFromCart(item.id, item.size, item.name)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}

      <div className="cart-total-section">
        <div className="total-content">
          <h2>Total: R$ {total.toFixed(2)}</h2>
          <div className="total-actions">
            <button className="btn-clear" onClick={clearCart}>
              Limpar Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;