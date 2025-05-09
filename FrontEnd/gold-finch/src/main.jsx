import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"
import { ProductsProvider } from "./context/ProductsDetails.jsx";
import {AuthProvider} from "./context/authContext.jsx"
import {CartItemsContext} from "./context/CartItemsContext.jsx"
import {AlertMsgContext} from "./context/AlertMsgContext.jsx"
import { Order } from "./context/Order.jsx";

createRoot(document.getElementById("root")).render
(
  <AlertMsgContext>
    <Order>

    
 <ProductsProvider>
  <AuthProvider>
    <CartItemsContext>
       <App />
    </CartItemsContext>
  </AuthProvider>
  </ProductsProvider>
  </Order>
  </AlertMsgContext>
  
);
