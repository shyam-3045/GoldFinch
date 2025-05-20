import { ShoppingCart,Star } from "lucide-react";
import Rating from "./Rating";

export default function ProductCard({ product, addItem, productNavigate }) {
  const renderStars = (rating = 4) => {
  return (
    <div style={{ display: "flex", gap: "2px", marginTop: "5px" }}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          size={14} // Small, neat size
          fill={index <= rating ? "#facc15" : "none"} // Yellow for filled
          stroke={index <= rating ? "#facc15" : "#d1d5db"} // Light gray for empty
          style={{ transition: "all 0.2s ease-in-out" }}
        />
      ))}
    </div>
  );
};


  return (
    <div 
      style={{ 
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s ease',
      }}
      onClick={productNavigate}
    >
      <div style={{ 
        position: 'relative', 
        marginBottom: '15px',
        overflow: 'hidden',
        borderRadius: '8px',
        aspectRatio: '1/1',
      }}>
        <img 
          src="../../../public/Product1-front.jpg"
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
        />
        
        {product.isNew && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: '#ffcc00',
            color: '#000',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '4px'
          }}>
            NEW
          </div>
        )}
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addItem();
          }}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease',
          }}
        >
          <ShoppingCart size={20} color="#333" />
        </button>
      </div>
      
      <div style={{ padding: '0 5px' }}>
        <div style={{ 
          color: '#666', 
          fontSize: '13px',
          marginBottom: '5px',
          fontWeight: '500'
        }}>
          {product.category}
        </div>
        
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600',
          margin: '0 0 5px 0',
          color: '#333'
        }}>
          {product.name}
        </h3>
        
        <p style={{
          fontSize: '14px',
          color: '#666',
          margin: '0 0 10px 0',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {product.description}
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          <span style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#333'
          }}>
            ₹{product.price.toFixed(2)}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
              {renderStars(product.ratings || 5)}

            <span style={{ 
              marginLeft: '5px', 
              color: '#666',
              fontSize: '14px'
            }}>
              ({product.numOfReviews || 0})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}