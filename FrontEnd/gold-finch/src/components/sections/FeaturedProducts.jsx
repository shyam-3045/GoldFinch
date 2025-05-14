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
    <>
      <section id="shop" style={{ padding: "40px 0" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 15px" }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginBottom: "40px"
          }}>
            <h2 style={{ 
              fontSize: "42px", 
              fontWeight: "600",
              color: "#222"
            }}>
              Green Tea
            </h2>
            <a href="#" style={{ 
              display: "flex", 
              alignItems: "center",
              fontSize: "16px",
              color: "#666",
              textDecoration: "none",
              fontWeight: "500"
            }}>
              View all 
              <span style={{ 
                marginLeft: "5px",
                display: "inline-block",
                backgroundColor: "#f2f2f2",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                textAlign: "center",
                lineHeight: "22px"
              }}>›</span>
            </a>
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0 -15px",
            justifyContent: "space-between"
          }}>
            {products.products.map((product) => (
              <div key={product._id} style={{ 
                width: "calc(25% - 30px)",
                padding: "0 15px",
                marginBottom: "30px"
              }}>
                <ProductCard 
                  product={product} 
                  addItem={() => addCart(product._id)} 
                  value={product._id}
                  productNavigate={() => navigateProduct(product._id)} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}