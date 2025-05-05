import { teaProducts } from "../../data/products";
import ProductCard from "../common/ProductCard";

export default function FeaturedProducts() {
  return (
    <section id="shop" className="product-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Featured Teas</h2>
          <p className="section-description">
            Explore our handpicked selection of premium teas, sourced from the
            finest tea gardens around the world.
          </p>
        </div>

        <div className="product-grid">
          {teaProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="view-all">
          <a href="#" className="btn btn-primary">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
