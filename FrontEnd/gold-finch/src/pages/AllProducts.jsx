import { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, Tag } from 'lucide-react';
import Footer from '../components/layout/Footer';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useCartItems } from '../context/CartItemsContext';
import { useAlert } from '../context/AlertMsgContext';


export default function ProductDisplay() {
    const navigate = useNavigate()
    const { getCartItems } = useCartItems()
    const products = useLoaderData()
    const { alertMsg } = useAlert()
    const token = localStorage.getItem("token")


  const categories = ["All", ...new Set(products.map(product => product.category))];
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group products by category for display
  const productsByCategory = {};
  filteredProducts.forEach(product => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });

  // Add to cart functionality
  const addToCart = (id) => {
    let quantity=1
    const res =  getCartItems(id._id,quantity)
    if (!token) {
      alertMsg("Login First")
    }
    else {
      alertMsg("Added To Cart")
    }
  }

  // Generate star rating display
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{
          color: i <= rating ? '#9c5518' : '#e8e8e8',
          fontSize: '16px',
          marginRight: '2px',
          textShadow: i <= rating ? '0 0 1px rgba(156, 85, 24, 0.5)' : 'none'
        }}>★</span>
      );
    }
    return stars;
  };

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, discountedPrice) => {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #ffffff, #f5f9f5)',
      fontFamily: '"Playfair Display", "Georgia", serif',
    },
    header: {
      background: 'linear-gradient(90deg, #6B8E23, #8FBC8F)',
      padding: '15px 20px',
      color: 'white',
      boxShadow: '0 4px 12px rgba(107, 142, 35, 0.2)'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      margin: '0',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)'
    },
    cartIcon: {
      position: 'relative',
      cursor: 'pointer'
    },
    cartBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: '#e74c3c',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
    },
    searchBar: {
      background: 'linear-gradient(135deg, rgba(143, 188, 143, 0.15), rgba(143, 188, 143, 0.05))',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(107, 142, 35, 0.08)',
      marginBottom: '30px',
      borderBottom: '1px solid rgba(107, 142, 35, 0.15)'
    },
    searchBarContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px'
    },
    searchInput: {
      flex: '1',
      maxWidth: '500px',
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '12px 12px 12px 42px',
      borderRadius: '30px',
      border: '1px solid rgba(107, 142, 35, 0.3)',
      fontSize: '16px',
      transition: 'all 0.3s',
      boxShadow: '0 2px 5px rgba(107, 142, 35, 0.05)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#6B8E23',
      boxShadow: '0 2px 10px rgba(107, 142, 35, 0.2)'
    },
    searchIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6B8E23'
    },
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '8px 15px',
      borderRadius: '25px',
      border: '1px solid rgba(107, 142, 35, 0.2)',
    },
    filterLabel: {
      color: '#556B2F',
      fontWeight: '500',
      fontSize: '15px'
    },
    select: {
      padding: '10px 35px 10px 15px',
      borderRadius: '20px',
      border: '1px solid rgba(107, 142, 35, 0.3)',
      fontSize: '15px',
      backgroundColor: 'white',
      cursor: 'pointer',
      minWidth: '160px',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236B8E23\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpath d=\'M6 9l6 6 6-6\'/%3e%3c/svg%3e")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      backgroundSize: '12px',
      transition: 'all 0.3s',
      boxShadow: '0 2px 5px rgba(107, 142, 35, 0.05)'
    },
    selectFocus: {
      outline: 'none',
      borderColor: '#6B8E23',
      boxShadow: '0 2px 10px rgba(107, 142, 35, 0.2)'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px 40px'
    },
    categoryHeading: {
      fontSize: '26px',
      fontWeight: '700',
      color: '#3e5622',
      borderBottom: '2px solid rgba(107, 142, 35, 0.3)',
      paddingBottom: '15px',
      marginBottom: '25px',
      marginTop: '40px',
      position: 'relative',
      letterSpacing: '0.5px'
    },
    categoryIcon: {
      marginRight: '12px',
      opacity: '0.8'
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '30px',
      margin: '30px 0'
    },
    productCard: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(107, 142, 35, 0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      border: '1px solid rgba(143, 188, 143, 0.2)',
      position: 'relative',
    },
    productCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 30px rgba(107, 142, 35, 0.15)'
    },
    productImageContainer: {
      width: "100%",      // or fixed width if you want
  height: "300px",    // or whatever height you want
  overflow: "hidden", // hide overflow to avoid scrollbars if image overflows
  padding: 0,
  margin: 0,
  position: "relative", // if you want to do anything position-wise later
    },
     productImage: {
    width: "100%",         // Make image fill the container's width
    height: "100%",        // Make image fill the container's height
    objectFit: "cover",    // Cover the container, cropping if necessary to avoid distortion
    display: "block",      // Remove any inline gap below image
  },
    productInfo: {
      padding: '24px',
      position: 'relative',
    },
    productTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#3e5622',
      lineHeight: '1.4'
    },
    productCategory: {
      color: '#71906a',
      fontSize: '14px',
      marginBottom: '10px',
      fontStyle: 'italic'
    },
    productFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      paddingTop: '15px',
      borderTop: '1px solid rgba(143, 188, 143, 0.2)'
    },
    productPrice: {
      display: 'flex',
      flexDirection: 'column',
    },
    currentPrice: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#3e5622',
      display: 'inline-block',
    },
    originalPrice: {
      fontSize: '16px',
      color: '#999',
      textDecoration: 'line-through',
      marginRight: '8px',
      display: 'inline-block',
    },
    addButton: {
      backgroundColor: '#6B8E23',
      color: 'white',
      border: 'none',
      padding: '10px 18px',
      borderRadius: '25px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 10px rgba(107, 142, 35, 0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '15px'
    },
    addButtonHover: {
      backgroundColor: '#556B2F',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(107, 142, 35, 0.35)'
    },
    noProducts: {
      textAlign: 'center',
      padding: '80px 0',
      color: '#71906a',
      fontSize: '20px',
      fontStyle: 'italic'
    },
    footer: {
      background: 'linear-gradient(90deg, #6B8E23, #8FBC8F)',
      color: 'white',
      padding: '30px 20px',
      textAlign: 'center',
      marginTop: '40px'
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    badge: {
      display: 'inline-block',
      backgroundColor: 'rgba(107, 142, 35, 0.1)',
      color: '#556B2F',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      marginRight: '6px',
      marginBottom: '6px'
    },
    discountBadge: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '12px',
      fontWeight: 'bold',
      fontSize: '14px',
      zIndex: 2,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    newBadge: {
      position: 'absolute',
      top: '15px',
      left: '15px',
      backgroundColor: "green",
      color: 'white',
      padding: '5px 10px',
      borderRadius: '12px',
      fontWeight: 'bold',
      fontSize: '14px',
      zIndex: 2,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    },
    stockInfo: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: '#2ecc71',
      padding: '4px 10px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '500',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
    },
    ratingCount: {
      marginLeft: '8px',
      color: '#71906a',
      fontSize: '14px',
    },
    wishlistButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: 'none',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: 3,
    }
  };

  return (
    <>
    <div style={styles.container}>
      {/* Search and Filter Bar */}
      <div style={styles.searchBar}>
        <div style={styles.searchBarContent}>
          <div style={styles.searchInput}>
            <input
              type="text"
              placeholder="Search for premium teas..."
              style={{...styles.input}}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
              onBlur={(e) => e.target.style.boxShadow = styles.input.boxShadow}
            />
            <Search style={{...styles.searchIcon, height: 20, width: 20}} />
          </div>
          
          <div style={styles.filterContainer}>
            <Filter style={{ height: 18, width: 18, color: '#6B8E23' }} />
            <label style={styles.filterLabel}>Tea Category:</label>
            <select 
              style={{...styles.select}}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              onFocus={(e) => e.target.style.boxShadow = styles.selectFocus.boxShadow}
              onBlur={(e) => e.target.style.boxShadow = styles.select.boxShadow}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main style={styles.main}>
        {Object.keys(productsByCategory).length > 0 ? (
          Object.entries(productsByCategory).map(([category, products]) => (
            <div key={category}>
              <h2 style={styles.categoryHeading}>
                <span style={styles.categoryIcon}>🍃</span>
                {category}
              </h2>
              <div style={styles.productGrid}>
                {products.map(product => {
                  // Calculate original price (assuming discounted price is 599)
                  const discountedPrice = product.price;
                  const originalPrice = 599 ;
                  const discountPercentage = calculateDiscount(originalPrice, discountedPrice);
                  
                  return (
                  <div 
                    key={product._id} 
                    style={styles.productCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = styles.productCardHover.transform;
                      e.currentTarget.style.boxShadow = styles.productCardHover.boxShadow;
                      // Scale image slightly on hover
                      const image = e.currentTarget.querySelector('img');
                      if (image) image.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = styles.productCard.boxShadow;
                      // Reset image scale
                      const image = e.currentTarget.querySelector('img');
                      if (image) image.style.transform = 'scale(1)';
                    }}
                  >
                    
                    
                    {/* New badge for some products */}
                    {product._id  !== 0 && (
                      <div style={styles.newBadge}>NEW</div>
                    )}
                    
                    <div 
                      onClick={() => {navigate("/product", {state: {productId: product._id}})}} 
                      style={styles.productImageContainer}
                    >
                      <img 
                        src="/Product1-front.jpg"
                        alt={product.name} 
                        style={styles.productImage} 
                      />
                      {/* In-stock indicator */}
                      <div style={styles.stockInfo}>In Stock</div>
                    </div>
                    
                    <div style={styles.productInfo}>
                      <h3 style={styles.productTitle}>{product.name}</h3>
                      <div style={styles.ratingContainer}>
                        {renderRating(product.ratings)}
                        <span style={styles.ratingCount}>
                          ({product.numOfReviews})
                        </span>
                      </div>
                      <p style={styles.productCategory}>Category: {product.category}</p>
                      
                      <div style={styles.productFooter}>
                        <div style={styles.productPrice}>
                          <div>
                            <span style={styles.currentPrice}>${discountedPrice}</span>
                            <span style={styles.originalPrice}>${originalPrice}</span>
                          </div>
                          
                        </div>
                        <button 
                          style={styles.addButton}
                          onClick={() => addToCart(product)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = styles.addButtonHover.backgroundColor;
                            e.currentTarget.style.transform = styles.addButtonHover.transform;
                            e.currentTarget.style.boxShadow = styles.addButtonHover.boxShadow;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = styles.addButton.backgroundColor;
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = styles.addButton.boxShadow;
                          }}
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noProducts}>
            <p>No teas found matching your search criteria.</p>
            <p style={{fontSize: '16px', marginTop: '15px'}}>Try adjusting your filters or search terms.</p>
          </div>
        )}
      </main>
    </div>
    </>
  );
}