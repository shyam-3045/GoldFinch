import "./App.css";
import "./index.css"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import Cart from "./pages/Cart";
import ProductDetailsPage from "./components/sections/ProductDetailsPage";
import OrderPage from "./pages/PaymentPage";

const router=createBrowserRouter([
  {path:'/',element:<MainNavigation/>,children:[
    {path:'/',element:<Home/>,errorElement:<pageNotFound/>},
  ]
  },
  {path:'*',element:<PageNotFound/>},
  {path:"/cart",element:<Cart/>},
  {path:"/product",element:<ProductDetailsPage/>},
  {path:"/order",element:<OrderPage/>},

  
])

export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  
  );
}