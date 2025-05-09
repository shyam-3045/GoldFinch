import React, { createContext, useContext } from 'react';
import axios from "../../axios.config";

const OrderContext = createContext();

export const Order = ({ children }) => {
  const token = localStorage.getItem("token");

  const setDetails = async (address, city, state, mobile, pincode, landmark, isDefault) => {
    const Details = {
      address, pincode, mobile, city, state, landmark, isDefault
    };
    
    try {
      const response = await axios.post("http://localhost:3000/api/order-details", { Details }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return user;
    } catch (error) {
      return error.response ? error.response.data : error.message;
    }
  };

  return (
    <OrderContext.Provider value={{ setDetails }}>
      {children} 
    </OrderContext.Provider>
  );
};

export const  giveOredr=()=>useContext(OrderContext);
