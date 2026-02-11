import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../pages/Cart.css"; 

function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2 className="empty-cart">Seu carrinho está vazio 🛒</h2>;
  }

  return (
    <div className="cart-container">
      <h1>Carrinho</h1>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img
            src={`http://localhost:5000/images/${item.image}`}
            alt={item.name}
          />

          <div className="cart-info">
            <h3>{item.name}</h3>

            {/* Controle de quantidade */}
            <div className="quantity-control">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
          </div>

          <button
            className="btn-remove"
            onClick={() => removeFromCart(item.id)}
          >
            Remover
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h2>Total: R$ {total.toFixed(2)}</h2>
        <button className="btn-clear" onClick={clearCart}>
          Limpar carrinho
        </button>
      </div>
    </div>
  );
}

export default Cart;
