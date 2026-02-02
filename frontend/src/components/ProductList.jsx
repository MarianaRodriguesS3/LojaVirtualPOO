import ProductCard from './ProductCard';

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map(prod => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
}

export default ProductList;
