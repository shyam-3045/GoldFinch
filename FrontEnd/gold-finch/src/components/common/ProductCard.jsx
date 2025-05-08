import { ShoppingCart } from "lucide-react";
import Rating from "./Rating";

export default function ProductCard({ product,addItem,productNavigate }) {
  return (
    <>
    <div  className="product-card">
      <div onClick={productNavigate} className="product-image-container">
        <div className="product-image-placeholder"></div>
        {product.isNew && <div className="product-badge">NEW</div>}
      </div>

      <div className="product-info">
        <div onClick={productNavigate} className="product-header">
          <span onClick={productNavigate} className="product-category">{product.category}</span>
          <span onClick={productNavigate} className="flex flex-row"><Rating rating={product.rating} /></span>
        </div>
        
        <h3 onClick={productNavigate} className="product-name">{product.name}</h3>
        <p onClick={productNavigate} className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button onClick={addItem} className="add-to-cart-button">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>

    </>
    
  );
}