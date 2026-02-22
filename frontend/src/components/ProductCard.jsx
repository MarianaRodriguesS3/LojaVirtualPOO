import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, userToken } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const sizes = [36, 37, 38, 39, 40];

  const handleAddToCart = () => {
    if (userToken === "guest") {
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      setSizeError("Selecione um tamanho!");
      return;
    }

    addToCart({ ...product, size: selectedSize });
    setSelectedSize(null);
    setSizeError("");
  };

  const handleBuyNow = () => {
    if (userToken === "guest") {
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      setSizeError("Selecione um tamanho!");
      return;
    }

    navigate("/checkout", {
      state: { product: { ...product, size: selectedSize, quantity: 1 } },
    });
  };

  useEffect(() => {
    if (!sizeError) return;
    const timer = setTimeout(() => setSizeError(""), 5000);
    return () => clearTimeout(timer);
  }, [sizeError]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setSelectedSize(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="product-card" ref={cardRef}>
      <div className="product-image">
        <img
          src={`http://localhost:5000/images/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">R$ {Number(product.price).toFixed(2)}</p>

        <div className="size-selector">
          {sizes.map((size) => (
            <button
              key={size}
              className={`size-btn ${selectedSize === size ? "selected" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {sizeError && <p className="size-error">{sizeError}</p>}
      </div>

      <div className="product-actions">
        <button className="btn-cart" onClick={handleAddToCart}>
          Carrinho
        </button>

        <button className="btn-buy" onClick={handleBuyNow}>
          Comprar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;