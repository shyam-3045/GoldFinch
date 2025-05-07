import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

const CartProducts = createContext();

export const CartItemsContext = ({ children }) => {
    const [cartProducts,setCartProducts]=useState([])

    useEffect(()=>
    {
        const getCartUser=async()=>
            {
                const userToken = localStorage.getItem("token"); // ✅ use direct localStorage
                try {
                    await axios.get("http://localhost:3000/cart",{
                        headers:{
                            Authorization: `Bearer ${userToken}`
                        }
                    })
                    .then(res=>{
                        setCartProducts(res.data.cart)
                    })
                    
                } catch (error) {
                    
                }
        
            }   

            getCartUser()

    },)
    const getCartItems = async (id,quantity) => {
        const userToken = localStorage.getItem("token"); // ✅ use direct localStorage
        try {
            await axios.post("http://localhost:3000/cart/add", {
                productId: id,
                quantity:quantity
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            return true;
        } catch (err) {
            console.error("Add to cart error:", err);
            return false;
        }
    };
    
    const removeCartItem=async(id)=>
    {
        const userToken = localStorage.getItem("token"); // ✅ use direct localStorage
        try {
            await axios.delete(`http://localhost:3000/cart/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            return true;
        } catch (err) {
            console.error("Deletion Error", err);
            return false;
        }

    }

    return (
        <CartProducts.Provider value={{ getCartItems,cartProducts,removeCartItem }}>
            {children}
        </CartProducts.Provider>
    );
};

export const useCartItems = () => useContext(CartProducts); // 🔄 better naming
