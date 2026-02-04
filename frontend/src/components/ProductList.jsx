import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products }) {
  if (!Array.isArray(products)) return null;

  return (
    <div className="product-list">
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
}

export default ProductList;
