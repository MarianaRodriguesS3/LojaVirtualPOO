import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, userToken } = useContext(CartContext);
  const navigate = useNavigate();

  const sizes = [34, 35, 36, 37, 38, 39, 40, 41, 42];

  const [centerIndex, setCenterIndex] = useState(4);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState("");

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const moveLeft = () => {
    setCenterIndex((prev) => Math.max(prev - 1, 2));
  };

  const moveRight = () => {
    setCenterIndex((prev) => Math.min(prev + 1, sizes.length - 3));
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const center = rect.width / 2;

    if (mouseX > center + 40) {
      moveRight();
    }

    if (mouseX < center - 40) {
      moveLeft();
    }
  };

  const visibleSizes = sizes.slice(centerIndex - 2, centerIndex + 3);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setSelectedSize(null);
        setSizeError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddToCart = () => {
    if (userToken === "guest") return navigate("/login");

    if (!selectedSize) {
      return setSizeError("Selecione um tamanho!");
    }

    addToCart({ ...product, size: selectedSize });

    setSelectedSize(null);
    setSizeError("");
  };

  const handleBuyNow = () => {
    if (userToken === "guest") return navigate("/login");

    if (!selectedSize) {
      return setSizeError("Selecione um tamanho!");
    }

    navigate("/checkout", {
      state: {
        product: {
          ...product,
          size: selectedSize,
          quantity: 1,
        },
      },
    });

    setSelectedSize(null);
    setSizeError("");
  };

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

        {/* DESCRIÇÃO DO PRODUTO */}
        <p className="description">{product.description}</p>

        <p className="price">R$ {Number(product.price).toFixed(2)}</p>

        <div
          className="size-carousel"
          ref={containerRef}
          onMouseMove={handleMouseMove}
        >
          {visibleSizes.map((size) => (
            <button
              key={size}
              className={`size-btn ${
                selectedSize === size ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedSize(size);
                setSizeError("");
              }}
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