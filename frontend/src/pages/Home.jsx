import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Exemplo de chamada para backend - adaptar URL conforme sua API real
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // ou a rota correta do backend
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
      <Banner />
      {/* Aqui o ProductList recebe o array de produtos */}
      <ProductList products={products} />
    </>
  );
}

export default Home;
