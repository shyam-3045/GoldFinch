import React, { createContext, useContext } from 'react';
import axios from "../../axios.config";

const OrderContext = createContext();

export const Order = ({ children }) => {
  

  const setDetails = async (address, city, state, mobile, pincode, isDefault) => {
    const Details = {
      address, pincode, mobile, city, state, isDefault
    };
    
    try {
      const response = await axios.post("https://goldfinch-backend.onrender.com/api/order-details", { Details }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      return response.data;
      
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
