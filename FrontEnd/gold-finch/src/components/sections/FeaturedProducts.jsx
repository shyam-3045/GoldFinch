import { NavLink, useNavigate } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import { useProducts } from "../../context/ProductsDetails";
import { useCartItems } from "../../context/CartItemsContext";
import { useAlert } from "../../context/AlertMsgContext";
import { useEffect, useRef } from "react";

export default function FeaturedProducts() {
  const { alertMsg } = useAlert();
  const products = useProducts();
  const { getCartItems } = useCartItems();
  const navigate = useNavigate();
  const sectionRef = useRef(null);

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
          color: '#2c3e50',
          marginBottom: '10px',
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          position: 'relative',
          display: 'inline-block'
        }}>
          Featured Products
          <span style={{
            content: '""',
            display: 'block',
            width: '60%',
            height: '4px',
            background: 'linear-gradient(90deg, #4CAF50, #81C784)',
            margin: '10px auto 0',
            borderRadius: '3px'
          }}></span>
        </h2>
        <p style={{ color: '#7f8c8d', fontSize: '16px', marginTop: '10px' }}>
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
            color: '#fff',
            background: 'linear-gradient(135deg, #4CAF50, #66bb6a)',
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

      {/* Style for fade-in */}
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
