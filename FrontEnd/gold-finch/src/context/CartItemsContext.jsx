import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

const CartProducts = createContext();

export const CartItemsContext = ({ children }) => {
    const [token, setToken] = useState("");
    const [cartProducts,setCartProducts]=useState([])

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        setToken(userToken);
    },); 

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
    const getCartItems = async (id) => {
        const userToken = localStorage.getItem("token"); // ✅ use direct localStorage
        try {
            await axios.post("http://localhost:3000/cart/add", {
                productId: id,
                quantity: 1
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
    

    return (
        <CartProducts.Provider value={{ getCartItems,cartProducts }}>
            {children}
        </CartProducts.Provider>
    );
};

export const useCartItems = () => useContext(CartProducts); // 🔄 better naming
