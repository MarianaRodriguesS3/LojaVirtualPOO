import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/products'); //rota do backend
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Banner products={products}/>
      {/* Aqui o ProductList recebe o array de produtos */}
      <ProductList products={products} />
    </>
  );
}

export default Home;
