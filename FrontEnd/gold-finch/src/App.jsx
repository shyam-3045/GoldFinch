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
import AdminPage from "./pages/AdminPage";



const router=createBrowserRouter([
  {path:'/',element:<MainNavigation/>,errorElement:<PageNotFound/>,children:[
    {path:'/',element:<Home/>},
    
  {path:"/cart",loader:async()=>
    {
        const res = await axios.get("https://goldfinch-backend.onrender.com/cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        return res.data.cart

    },element:<Cart/>},
  {path:"/product",loader:async()=>
    {
        const res = await axios.get('https://goldfinch-backend.onrender.com/api/products');
        return res.data.products

    },element:<ProductDetailsPage/>},
  {path:"/order",element:<OrderPage/>},
  {path:"/Myorder",loader:async()=>
    {
      const res =await axios.get('https://goldfinch-backend.onrender.com/api/my-orders',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      return res.data.orders
    },element:<MyOrders/>},
  {path:"/allProducts",loader:async()=>
    {
        const res = await axios.get('https://goldfinch-backend.onrender.com/api/products');
        return res.data.products

    },element:<ProductDisplay/>},
    
    {path:'*',element:<PageNotFound/>},
  ]
  },
  {path:'/Admin@DashBoard@205',loader:async()=>
    {
        const res = await axios.get('https://goldfinch-backend.onrender.com/user');
        const res1=await axios.get('https://goldfinch-backend.onrender.com/api/get-orders')
        return{ users:res.data.users,order:res1.data}

    },element:<AdminPage/>},

])

export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  
  );
}