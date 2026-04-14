import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import api from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Banner products={products} />
      <ProductList products={products} />
    </>
  );
}

export default Home;