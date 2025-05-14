import "./App.css";
import "./index.css"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import Cart from "./pages/Cart";
import ProductDetailsPage from "./components/sections/ProductDetailsPage";
import OrderPage from "./pages/PaymentPage";
import MyOrders from "./pages/MyOrders"; 
import ProductDisplay from "./pages/AllProducts";
import axios from "../axios.config";

const router=createBrowserRouter([
  {path:'/',element:<MainNavigation/>,children:[
    {path:'/',element:<Home/>,errorElement:<pageNotFound/>},
    
  {path:"/cart",element:<Cart/>},
  {path:"/product",loader:async()=>
    {
        const res = await axios.get('http://localhost:3000/api/products');
        return res.data.products

    },element:<ProductDetailsPage/>},
  {path:"/order",element:<OrderPage/>},
  {path:"/Myorder",loader:async()=>
    {
      const res =await axios.get('http://localhost:3000/api/my-orders',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      return res.data.orders
    },element:<MyOrders/>},
  {path:"/allProducts",loader:async()=>
    {
        const res = await axios.get('http://localhost:3000/api/products');
        return res.data.products

    },element:<ProductDisplay/>},

  ]
  },
  {path:'*',element:<PageNotFound/>},
  

  
])

export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  
  );
}