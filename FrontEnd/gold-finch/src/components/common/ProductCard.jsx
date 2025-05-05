import { ShoppingCart } from "lucide-react";
import Rating from "./Rating";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="product-image-placeholder"></div>
        {product.isNew && <div className="product-badge">NEW</div>}
      </div>

      <div className="product-info">
        <div className="product-header">
          <span className="product-category">{product.category}</span>
          <Rating rating={product.rating} />
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="add-to-cart-button">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
