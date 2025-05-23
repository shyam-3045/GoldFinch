import React, { createContext, useContext } from 'react'
import axios from "../../axios.config"

const  PaymentContext=createContext()
export const Payment = ({children}) => {
    const MakeOrder = async (
  formData,
  total,
  products,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) => {
  try {
        const deliveryDetails = {
        address: formData.address,
        pincode: formData.pincode,
        mobile: formData.mobile,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        isDefault: formData.isDefault,
        landmark: formData.landmark,
  };
    
    const res = await axios.post(
      "https://goldfinch-backend.onrender.com/api/createOrder",
      {
        products,
        deliveryDetails: deliveryDetails,
        totalAmount: total,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    
    return res.data;
  } catch (error) {
    console.error("Error making order:", error.response?.data || error.message);
    throw error;
  }
};



  return (
    <PaymentContext.Provider value={{MakeOrder}}>
        {children}
    </PaymentContext.Provider>
  )
}

export const makeOrder=()=> useContext(PaymentContext)
