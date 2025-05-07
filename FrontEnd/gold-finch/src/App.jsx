import "./App.css";
import "./index.css"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import MainNavigation from "./components/layout/MainNavigation";
import { useEffect } from "react";
import Cart from "./pages/Cart";

const router=createBrowserRouter([
  {path:'/',element:<MainNavigation/>,children:[
    {path:'/',element:<Home/>,errorElement:<pageNotFound/>},
  ]
  },
  {path:'*',element:<PageNotFound/>},
  {path:"/cart",element:<Cart/>},
  
])

export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
    
    
  );
}
