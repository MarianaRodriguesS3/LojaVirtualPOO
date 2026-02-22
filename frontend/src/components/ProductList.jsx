import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products }) {
  // Garantir que products é um array
  if (!Array.isArray(products)) return null;

  // Se a lista estiver vazia
  if (products.length === 0) {
    return <p>Nenhum produto disponível.</p>;
  }

  return (
    <div className="product-list">
      {products.map((prod) => {
        // Usar prod.id se existir, senão gerar uma key única como fallback
        const key = prod.id ?? `${prod.nome}-${Math.random()}`;
        return <ProductCard key={key} product={prod} />;
      })}
    </div>
  );
}

export default ProductList;