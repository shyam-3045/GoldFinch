import { NavLink, useNavigate } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import { useProducts } from "../../context/ProductsDetails";
import { useCartItems } from "../../context/CartItemsContext";
import { useAlert } from "../../context/AlertMsgContext";
import { useEffect, useRef, useState } from "react";

export default function FeaturedProducts() {
  const { alertMsg } = useAlert();
  const products = useProducts();
  const { getCartItems } = useCartItems();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if products are loaded
    if (products.products && products.products.length > 0) {
      setLoading(false);
    }
  }, [products.products]);

  // Scroll animation
  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("fade-in");
        }
      },
      { threshold: 0.1 }
    );
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

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
    <div 
      ref={sectionRef}
      className="featured-section"
      style={{
        padding: '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '700',
          color: '#d3b20d ',
          marginBottom: '10px',
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          position: 'relative',
          display: 'inline-block'
        }}>
          Featured Products
          <span style={{
            display: 'block',
            width: '60%',
            height: '4px',
            background: '#45035b ',
            margin: '10px auto 0',
            borderRadius: '3px'
          }}></span>
        </h2>
        <p style={{ color: 'black', fontSize: '16px', marginTop: '10px' }}>
          Discover our finest handpicked teas for every mood.
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '25px',
        paddingRight: '10px'
      }}>
        <NavLink
          to="/allProducts"
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#d3b20d ',
            background: '#45035b ',
            padding: '10px 22px',
            borderRadius: '30px',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
          }}
        >
          View All →
        </NavLink>
      </div>

      {/* Loading Spinner or Products */}
      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '50px 0',
          fontSize: '20px',
          color: '#555'
        }}>
          <div style={{
            margin: '0 auto 20px',
            width: '50px',
            height: '50px',
            border: '5px solid #eee',
            borderTop: '5px solid #4CAF50',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading products...
        </div>
      ) : (
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
      )}

      {/* Inline CSS for fade-in and spinner */}
      <style>
        {`
          .featured-section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease-in-out;
          }
          .featured-section.fade-in {
            opacity: 1;
            transform: translateY(0);
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @media (max-width: 600px) {
            .featured-section h2 {
              font-size: 30px;
            }
          }
        `}
      </style>
    </div>
  );
}
