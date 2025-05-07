// src/context/ProductContext.js
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductDetail = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProducts(res.data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductDetail.Provider value={{ products }}>
      {children}
    </ProductDetail.Provider>
  );
};

export const useProducts = () => useContext(ProductDetail);
