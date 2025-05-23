import axios from '../../axios.config';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductDetail = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://goldfinch-backend.onrender.com/api/products');
        setProducts(res.data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  const getProductById = async (productId) => {
    try {
      const res = await axios.get(`https://goldfinch-backend.onrender.com/api/product/${productId}`);
      return res.data.product
    } catch (err) {
      console.error('Failed to fetch product by ID:', err);
    }
  };
  return (
    <ProductDetail.Provider value={{ products, getProductById }}>
      {children}
    </ProductDetail.Provider>
  );
};

export const useProducts = () => useContext(ProductDetail);
