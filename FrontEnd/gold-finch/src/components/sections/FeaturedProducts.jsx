import { useLoaderData } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import {useProducts} from "../../context/ProductsDetails";
import axios from "axios";
import {useCartItems} from "../../context/CartItemsContext"


export default function FeaturedProducts() {
  const products=useProducts()
  const {getCartItems}=useCartItems()

  const addCart=async(id)=>
  {
    getCartItems(id)
    
  }

  return (<>
    <section id="shop" className="product-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Featured Teas</h2>
          <p className="section-description">
            Hello
          </p>
        </div>

        <div className="product-grid" >
          {products.products.map((product) => (
            <span onClick={()=>addCart(product._id)} value={product._id} key={product._id}> <ProductCard key={product._id} product={product} /> </span>
            
          ))}
        </div>

        <div className="view-all">
          <a href="#" className="btn btn-primary">
            View All Products
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
