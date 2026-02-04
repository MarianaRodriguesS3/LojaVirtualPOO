import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
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
      </div>

      {/* Botões no final do card */}
      <div className="product-actions">
        <button className="btn-cart">Carrinho</button>
        <button className="btn-buy">Comprar</button>
      </div>
    </div>
  );
}

export default ProductCard;
