import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from '../../axios.config';

const CartProducts = createContext();

export const CartItemsContext = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    const fetchCart = async () => {
        const userToken = localStorage.getItem("token");
        try {
            const res = await axios.get("https://goldfinch-backend.onrender.com/cart", {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setCartProducts(res.data.cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCart(); // Fetch once on mount
    }, []);

    const getCartItems = async (id, quantity) => {
        const userToken = localStorage.getItem("token");
        try {
            await axios.post("https://goldfinch-backend.onrender.com/cart/add", {
                productId: id,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            await fetchCart(); // Refresh cart after update
            return true;
        } catch (err) {
            console.error("Add to cart error:", err);
            return false;
        }
    };

    const removeCartItem = async (id) => {
        const userToken = localStorage.getItem("token");
        try {
            await axios.delete(`https://goldfinch-backend.onrender.com/cart/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            await fetchCart(); // Refresh cart after removal
            return true;
        } catch (err) {
            console.error("Deletion Error", err);
            return false;
        }
    };

    return (
        <CartProducts.Provider value={{ getCartItems, cartProducts, removeCartItem }}>
            {children}
        </CartProducts.Provider>
    );
};

export const useCartItems = () => useContext(CartProducts);
