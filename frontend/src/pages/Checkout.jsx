import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../pages/Cart.css"; 
import "../pages/Checkout.css";

function Checkout() {
  const location = useLocation();
  const { product } = location.state || {};

  const [selectedSize, setSelectedSize] = useState(product?.size || null);
  const [quantity, setQuantity] = useState(product?.quantity || 1);

  if (!product) {
    return <div className="cart-container"><h2 className="empty-cart">Nenhum produto selecionado.</h2></div>;
  }

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="cart-container">
      <h1>Compra</h1>

      <div className="cart-item checkout-layout-grid">
        {/* POSIÇÃO 1: Imagem */}
        <div className="checkout-col-image">
          <img
            src={`http://localhost:5000/images/${product.image}`}
            alt={product.name}
          />
        </div>

        {/* POSIÇÃO 2: Tamanho e Quantidade (Centralizados um abaixo do outro) */}
        <div className="checkout-col-selectors">
          <div className="size-selector">
            {[36, 37, 38, 39, 40].map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(-1)}>−</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        </div>

        {/* POSIÇÃO 3: Nome e Valor (Centralizados um abaixo do outro) */}
        <div className="checkout-col-info">
          <h3>{product.name}</h3>
          <p className="price">R$ {(product.price * quantity).toFixed(2)}</p>
        </div>
      </div>

      <div className="cart-total-section">
        <div className="total-content">
          <h2>Total: R$ {(product.price * quantity).toFixed(2)}</h2>
          <div className="total-actions">
            <button 
              className="btn-finalize" 
              onClick={() => alert("Compra finalizada!")}
              disabled={!selectedSize}
            >
              {selectedSize ? "Finalizar Compra" : "Selecione o Tamanho"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;