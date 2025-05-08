import { useNavigate } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import {useProducts} from "../../context/ProductsDetails";
import {useCartItems} from "../../context/CartItemsContext"
import { useAlert } from "../../context/AlertMsgContext";


export default function FeaturedProducts() {
  const {alertMsg}=useAlert()
  const products=useProducts()
  const {getCartItems}=useCartItems()
  const navigate =useNavigate()

  const addCart=async(id)=>
  {
    const res =await getCartItems(id)
    if (!res)
    {
      alertMsg("Login First")
    }
    else{
      alertMsg("Added To Cart")
    }
  }

  const navigateProduct=(productId)=>
  {
    navigate("/product",{
      state:{
        productId:productId
      }
    })
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
                <ProductCard key={product._id} product={product} addItem={()=>addCart(product._id)} value={product._id} productNavigate={()=>navigateProduct(product._id)} /> 
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
