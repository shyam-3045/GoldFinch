import { useState } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/NavBar2';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useCartItems } from '../context/CartItemsContext';
import { useAlert } from '../context/AlertMsgContext';


export default function ProductDisplay() {
    const navigate=useNavigate()
    const {getCartItems}=useCartItems()
    const products=useLoaderData()
    const {alertMsg}=useAlert()
      const token=localStorage.getItem("token")


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
  const addToCart=async(id)=>
  {
  
    const res =await getCartItems(id)
    if (!token)
    {
      alertMsg("Login First")
    }
    else{
      alertMsg("Added To Cart")
    }
  }

  // Generate star rating display
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{
          color: i <= rating ? '#FFD700' : '#D3D3D3',
          fontSize: '18px',
          marginRight: '2px',
          textShadow: i <= rating ? '0 0 2px rgba(255, 215, 0, 0.6)' : 'none'
        }}>★</span>
      );
    }
    return stars;
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0f4f8, #d9e2ec)',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      background: 'linear-gradient(90deg, #1a5276, #2874a6)',
      padding: '15px 20px',
      color: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
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
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
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
      background: 'white',
      padding: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      marginBottom: '20px'
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
      padding: '10px 10px 10px 40px',
      borderRadius: '25px',
      border: '1px solid #ccc',
      fontSize: '16px',
      transition: 'all 0.3s',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 2px 10px rgba(52, 152, 219, 0.3)'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#7f8c8d'
    },
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    filterLabel: {
      color: '#34495e',
      fontWeight: '500'
    },
    select: {
      padding: '10px 15px',
      borderRadius: '25px',
      border: '1px solid #ccc',
      fontSize: '16px',
      backgroundColor: 'white',
      cursor: 'pointer',
      minWidth: '150px',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23333\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpath d=\'M6 9l6 6 6-6\'/%3e%3c/svg%3e")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      backgroundSize: '12px',
      transition: 'all 0.3s',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    },
    selectFocus: {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 2px 10px rgba(52, 152, 219, 0.3)'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    categoryHeading: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px',
      marginBottom: '20px',
      marginTop: '30px',
      position: 'relative'
    },
    categoryIcon: {
      marginRight: '10px'
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '25px',
      margin: '20px 0'
    },
    productCard: {
      background: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer'
    },
    productCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)'
    },
    productImageContainer: {
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(45deg, #f9f9f9, #f1f1f1)'
    },
    productImage: {
      maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain'
    },
    productInfo: {
      padding: '20px'
    },
    productTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#2c3e50'
    },
    productCategory: {
      color: '#7f8c8d',
      fontSize: '14px',
      marginBottom: '10px'
    },
    productFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '15px',
      paddingTop: '15px',
      borderTop: '1px solid #ecf0f1'
    },
    productPrice: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2980b9'
    },
    addButton: {
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      padding: '10px 18px',
      borderRadius: '25px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 10px rgba(39, 174, 96, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    addButtonHover: {
      backgroundColor: '#219653',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(39, 174, 96, 0.4)'
    },
    noProducts: {
      textAlign: 'center',
      padding: '60px 0',
      color: '#7f8c8d',
      fontSize: '20px'
    },
    footer: {
      background: 'linear-gradient(90deg, #2c3e50, #34495e)',
      color: 'white',
      padding: '30px 20px',
      textAlign: 'center',
      marginTop: '40px'
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto'
    }
  };

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      {/* Search and Filter Bar */}
      <div style={styles.searchBar}>
        <div style={styles.searchBarContent}>
          <div style={styles.searchInput}>
            <input
              type="text"
              placeholder="Search for amazing products..."
              style={{...styles.input}}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
              onBlur={(e) => e.target.style.boxShadow = styles.input.boxShadow}
            />
            <Search style={{...styles.searchIcon, height: 20, width: 20}} />
          </div>
          
          <div style={styles.filterContainer}>
            <Filter style={{ height: 18, width: 18, color: '#34495e' }} />
            <label style={styles.filterLabel}>Category:</label>
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
                <span style={styles.categoryIcon}>📦</span>
                {category}
              </h2>
              <div style={styles.productGrid}>
                {products.map(product => (
                  <div 
                    key={product._id} 
                    style={styles.productCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = styles.productCardHover.transform;
                      e.currentTarget.style.boxShadow = styles.productCardHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = styles.productCard.boxShadow;
                    }}
                  >
                    <div onClick={()=>{navigate("/product",{state:{productId:product._id}})}} style={styles.productImageContainer}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        style={styles.productImage} 
                      />
                    </div>
                    <div style={styles.productInfo}>
                      <h3 style={styles.productTitle}>{product.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        {renderRating(product.ratings)}
                        <span style={{ marginLeft: '8px', color: '#7f8c8d', fontSize: '14px' }}>
                          ({product.ratings})
                        </span>
                      </div>
                      <p style={styles.productCategory}>Category: {product.category}</p>
                      <div style={styles.productFooter}>
                        <p style={styles.productPrice}>${product.price}</p>
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
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noProducts}>
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
    <Footer/>

    </>
    
  );
}