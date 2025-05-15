import { useNavigate } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import { useProducts } from "../../context/ProductsDetails";
import { useCartItems } from "../../context/CartItemsContext";
import { useAlert } from "../../context/AlertMsgContext";

export default function FeaturedProducts() {
  const { alertMsg } = useAlert();
  const products = useProducts();
  const { getCartItems } = useCartItems();
  const navigate = useNavigate();

  const addCart = async (id) => {
    const res = await getCartItems(id);
    if (!res) {
      alertMsg("Login First");
    } else {
      alertMsg("Added To Cart");
    }
  };

  const navigateProduct = (productId) => {
    navigate("/product", {
      state: {
        productId: productId
      }
    });
  };

  return (
    <div style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '30px'
          }}>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: '600', 
              color: '#333',
              margin: '0'
            }}>
              Green Tea
            </h2>
            <a href="#" style={{ 
              fontSize: '16px', 
              color: '#333', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center'
            }}>
              View all
              <span style={{ marginLeft: '5px' }}>›</span>
            </a>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '30px'
          }}>
            {products.products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addItem={() => addCart(product._id)}
                value={product._id}
                productNavigate={() => navigateProduct(product._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}