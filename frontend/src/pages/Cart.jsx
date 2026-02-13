import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../pages/Cart.css";

function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleBuySingle = (item) => {
    navigate("/checkout", { state: { product: item } });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="empty-cart">Seu carrinho está vazio 🛒</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Carrinho</h1>

      {cartItems.map((item) => (
        <div
          className="cart-item"
          key={`${item.id}-${item.size}`}
        >
          <img
            src={`http://localhost:5000/images/${item.image}`}
            alt={item.name}
          />

          <div className="cart-info">
            <h3>{item.name}</h3>
            {item.size && <p className="cart-size">Tamanho: {item.size}</p>}
            <p className="price">R$ {(item.price * item.quantity).toFixed(2)}</p>
          </div>

          <div className="quantity-control">
            <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
          </div>

          <div className="cart-actions">
            <button className="btn-buy-single" onClick={() => handleBuySingle(item)}>
              Comprar
            </button>
            <button className="btn-remove" onClick={() => removeFromCart(item.id, item.size)}>
              Remover
            </button>
          </div>
        </div>
      ))}

      {/* SEÇÃO FINAL ALINHADA À DIREITA */}
      <div className="cart-total-section">
        <div className="total-content">
          <h2>Total: R$ {total.toFixed(2)}</h2>
          <div className="total-actions">
            <button className="btn-clear" onClick={clearCart}>
              Limpar Carrinho
            </button>
            <button className="btn-finalize" onClick={() => alert("Compra realizada!")}>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;