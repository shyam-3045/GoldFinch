import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"
import { ProductsProvider } from "./context/ProductsDetails.jsx";
import {AuthProvider} from "./context/authContext.jsx"
import {CartItemsContext} from "./context/CartItemsContext.jsx"
import {AlertMsgContext} from "./context/AlertMsgContext.jsx"
import { Order } from "./context/Order.jsx";
import { Payment } from "./context/Payment.jsx";

class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong in this component.</h2>;
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render
(
  <MyErrorBoundary>
  <AlertMsgContext>
    <Order> 
 <ProductsProvider>
  <AuthProvider>
    <CartItemsContext>
      <Payment>
        <App />
      </Payment>
    </CartItemsContext>
  </AuthProvider>
  </ProductsProvider>
  </Order>
  </AlertMsgContext>
  </MyErrorBoundary>
  
);
