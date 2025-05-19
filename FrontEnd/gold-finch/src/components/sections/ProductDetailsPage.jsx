import { useEffect, useState } from 'react';
import Footer from '../layout/Footer';
import { useAlert } from '../../context/AlertMsgContext';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsDetails';
import { useCartItems } from '../../context/CartItemsContext';

export default function ProductDetailsPage() {
  const products = useLoaderData();
  const { getCartItems } = useCartItems();
  const { getProductById } = useProducts();
  const location = useLocation();
  const { productId } = location.state;
  const { alertMsg } = useAlert();
  const [singlePrd, setSinglePrd] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProductById(productId);
      setSinglePrd(res);
    };
    fetchProduct();
  }, [productId]);

  const handleCart = () => {
    if (!token) {
      alertMsg("Login To Proceed");
    } else {
      console.log(productId)
      getCartItems(productId, quantity);
      alertMsg(`Added ${singlePrd.name} To the Cart`);
    }
  };

  const product = {
    name: singlePrd.name,
    price: singlePrd.price,
    originalPrice: 599,
    discountPrice: 24.99,
    rating: singlePrd.ratings,
    reviews: singlePrd.numOfReviews,
    description: singlePrd.description,
    features: [
      "Handpicked premium Assam tea leaves",
      "Rich aroma with bold and full-bodied taste",
      "Perfect for strong chai and milk tea preparations",
      "Freshly packed to preserve natural flavor",
      "Sourced from lush Assam estates"
    ],
    specifications: {
      "Type": "Loose Leaf Assam Tea",
      "Net Weight": "100g",
      "Origin": "Assam, India",
      "Packaging": "Sealed foil pouch",
      "Shelf Life": "12 months from packaging date"
    },
    colors: ["#d4af37", "#6b4c3b", "#f5f5dc"],
    stock: singlePrd.stock,
    images: [
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400"
    ],
    fullDescription: [
      "Goldfinch Teas - Assam Delight offers an authentic Assam tea experience with bold aroma and rich flavor, perfect for your daily chai or relaxing evenings.",
      "Our tea is handpicked from premium Assam estates, ensuring every leaf is of the highest quality and freshness. The sealed foil packaging preserves the natural taste and aroma until you brew your perfect cup.",
      "Enjoy a strong, full-bodied cup that complements milk perfectly, making it a favorite for traditional Indian chai lovers. Brew a cup of Goldfinch Assam Delight and enjoy the heritage and taste of Assam in every sip."
    ]
  };

  const reviews = [
    {
      id: 1,
      user: "Ravi",
      rating: 5,
      date: "May 15, 2025",
      title: "Very good tea!",
      content: "This Assam tea has a strong aroma and bold taste. Perfect for making my morning chai. Really happy with the quality.",
      verified: true
    },
    {
      id: 2,
      user: "Chandra",
      rating: 4,
      date: "May 12, 2025",
      title: "Good taste but a bit pricey",
      content: "I liked the taste and aroma, very nice tea. But I think the price could be a little less for daily use.",
      verified: true
    },
    {
      id: 3,
      user: "Kumar",
      rating: 5,
      date: "May 16, 2025",
      title: "Highly recommended",
      content: "Bought this for the first time and really liked the strong flavor. Feels like a true Assam tea experience. Will buy again.",
      verified: true
    }
  ];

  const recommendedProducts = products.filter((el) => el.name !== singlePrd.name);

  // Enhanced styles
  const pageStyles = {
    fontFamily: "'Poppins', -apple-system, system-ui, sans-serif",
    color: "#333",
    backgroundColor: "#f5f7fa",
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const breadcrumbStyles = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const containerStyles = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "40px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  };

  const imageColumnStyles = {
    flex: "1",
    minWidth: "300px",
    display: "flex",
    gap: "15px",
  };

  const thumbnailColumnStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "90px",
  };

  const thumbnailStyles = {
    width: "90px",
    height: "90px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    cursor: "pointer",
    objectFit: "cover",
    transition: "all 0.3s ease",
  };

  const selectedThumbnailStyles = {
    ...thumbnailStyles,
    borderColor: "#4ade80",
    boxShadow: "0 0 0 2px #4ade80",
  };

  const mainImageContainerStyles = {
    flex: "1",
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  };

  const mainImageStyles = {
    width: "100%",
    borderRadius: "8px",
    objectFit: "cover",
    aspectRatio: "1/1",
    transition: "transform 0.5s ease",
  };

  const infoColumnStyles = {
    flex: "1",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    maxHeight: "800px",
  };

  const scrollableContentStyles = {
    overflowY: "auto",
    paddingRight: "15px",
    height: "100%",
    scrollbarWidth: "thin",
    scrollbarColor: "#10b981 transparent",
  };

  const productTitleStyles = {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#111",
    letterSpacing: "-0.5px",
  };

  const priceContainerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "8px 0 15px 0",
  };

  const currentPriceStyles = {
    fontSize: "32px",
    fontWeight: "800",
    color: "#047857",
  };

  const originalPriceStyles = {
    fontSize: "20px",
    color: "#94a3b8",
    textDecoration: "line-through",
  };

  const discountBadgeStyles = {
    backgroundColor: "#fef2f2",
    color: "#ef4444",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  };

  const ratingContainerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "5px 0",
  };

  const starStyles = {
    color: "#facc15",
    fontSize: "18px",
    letterSpacing: "2px",
  };

  const reviewCountStyles = {
    color: "#64748b",
    fontSize: "15px",
    fontWeight: "500",
  };

  const dividerStyles = {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "15px 0",
    width: "100%",
  };

  const descriptionStyles = {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#4b5563",
    marginBottom: "15px",
  };

  const featureListStyles = {
    listStyle: "none",
    padding: "0",
    margin: "15px 0",
  };

  const featureItemStyles = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
    fontSize: "15px",
  };

  const checkmarkStyles = {
    color: "#10b981",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const sectionTitleStyles = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "15px",
    marginTop: "25px",
    color: "#0f172a",
    position: "relative",
    paddingLeft: "15px",
    borderLeft: "4px solid #10b981",
  };

  const quantitySelectorStyles = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    margin: "20px 0",
  };

  const quantityLabelStyles = {
    fontSize: "16px",
    fontWeight: "500",
    color: "#374151",
  };

  const quantityControlsStyles = {
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.08)",
  };

  const quantityButtonStyles = {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    border: "none",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "background-color 0.2s ease",
  };

  const decrementButtonStyles = {
    ...quantityButtonStyles,
    borderRadius: "8px 0 0 8px",
  };

  const incrementButtonStyles = {
    ...quantityButtonStyles,
    borderRadius: "0 8px 8px 0",
  };

  const quantityInputStyles = {
    width: "60px",
    height: "40px",
    border: "1px solid #e5e7eb",
    borderLeft: "none",
    borderRight: "none",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500",
  };

  const stockInfoStyles = {
    fontSize: "15px",
    color: product.stock > 5 ? "#10b981" : "#f59e0b",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "500",
  };

  const addToCartButtonStyles = {
    backgroundColor: "#047857",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "16px 24px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "all 0.3s ease",
    marginTop: "15px",
    width: "100%",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
  };

  const specificationsTableStyles = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
    marginTop: "15px",
  };

  const tableRowStyles = {
    transition: "background-color 0.2s",
  };

  const tableCellStyles = {
    padding: "12px 15px",
    fontSize: "14px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderLeft: "none",
    borderRight: "none",
  };

  const tableCellHeaderStyles = {
    ...tableCellStyles,
    fontWeight: "600",
    width: "40%",
    backgroundColor: "#f1f5f9",
    borderRadius: "6px 0 0 6px",
    borderLeft: "1px solid #e2e8f0",
  };

  const tableCellValueStyles = {
    ...tableCellStyles,
    borderRadius: "0 6px 6px 0",
    borderRight: "1px solid #e2e8f0",
  };

  const sectionStyles = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    marginTop: "40px",
  };

  const sectionHeaderStyles = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    paddingBottom: "15px",
    borderBottom: "2px solid #e2e8f0",
  };

  const reviewContainerStyles = {
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "25px",
    marginBottom: "25px",
    transition: "transform 0.2s ease",
  };

  const reviewHeaderStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  };

  const reviewUserStyles = {
    fontWeight: "600",
    fontSize: "16px",
    color: "#1e293b",
  };

  const reviewDateStyles = {
    color: "#64748b",
    fontSize: "14px",
  };

  const reviewTitleStyles = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#0f172a",
  };

  const reviewContentStyles = {
    lineHeight: "1.7",
    fontSize: "15px",
    color: "#4b5563",
  };

  const verifiedBadgeStyles = {
    backgroundColor: "#ecfdf5",
    color: "#10b981",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    marginLeft: "10px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  };

  const recommendedSectionStyles = {
    ...sectionStyles,
  };

  const productsGridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "25px",
    marginTop: "25px",
  };

  const productCardStyles = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  };

  const productCardImageStyles = {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  };

  const productCardContentStyles = {
    padding: "20px",
  };

  const productCardTitleStyles = {
    fontSize: "17px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#1e293b",
    lineHeight: "1.4",
  };

  const productCardPriceStyles = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  };

  const productCardCurrentPriceStyles = {
    fontSize: "18px",
    fontWeight: "700",
    color: "#047857",
  };

  const productCardOriginalPriceStyles = {
    fontSize: "14px",
    color: "#94a3b8",
    textDecoration: "line-through",
  };

  const productCardRatingStyles = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
  };

  // Add Google Fonts
  const styleTag = document.createElement('style');
  if (!document.head.querySelector('#product-page-styles')) {
    styleTag.id = 'product-page-styles';
    document.head.appendChild(styleTag);
    
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (product.originalPrice && product.price) {
      const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <>
      <div style={pageStyles}>
        {/* Breadcrumb */}
        <div style={breadcrumbStyles}>
          <span style={{cursor: "pointer"}} onClick={() => navigate("/")}>Home</span>
          <span>›</span>
          <span style={{cursor: "pointer"}} onClick={() => navigate("/allProducts")}>Tea Collection</span>
          <span>›</span>
          <span style={{color: "#10b981"}}>{product.name}</span>
        </div>
        
        {/* Main container */}
        <div style={containerStyles}>
          {/* Left column - Product images */}
          <div style={imageColumnStyles}>
            {/* Thumbnails column */}
            <div style={thumbnailColumnStyles}>
              {products[0]?.images?.slice(0, 2).map((img, index) => {
                const imageUrl = img?.url ? `/${img.url.replace(/^public\//, '')}` : '';

                return (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    style={index === selectedImage ? selectedThumbnailStyles : thumbnailStyles}
                    onClick={() => setSelectedImage(index)}
                  />
                );
              })}
            </div>
            
            {/* Main image */}
            <div style={mainImageContainerStyles}>
              <img 
                src={products[0]?.images[selectedImage]?.url ? `/${products[0].images[selectedImage].url.replace(/^public\//, '')}` : '/api/placeholder/400/400'} 
                alt={product.name}
                style={mainImageStyles}
              />
            </div>
          </div>

          {/* Right column - Product info with scrollable content */}
          <div style={infoColumnStyles}>
            <div style={scrollableContentStyles}>
              <div>
                <h1 style={productTitleStyles}>{product.name}</h1>
                
                <div style={priceContainerStyles}>
                  <span style={currentPriceStyles}>₹{product.price}</span>
                  <span style={originalPriceStyles}>₹{product.originalPrice}</span>
                  <span style={discountBadgeStyles}>Save {calculateDiscount()}%</span>
                </div>

                <div style={ratingContainerStyles}>
                  <div style={starStyles}>★★★★★</div>
                  <span style={{fontWeight: "500"}}>{product.rating}</span>
                  <span style={reviewCountStyles}>({product.reviews} reviews)</span>
                </div>
              </div>

              <div style={dividerStyles}></div>

              <div>
                <p style={descriptionStyles}>{product.description}</p>
              </div>

              <div>
                <h3 style={sectionTitleStyles}>Key Features</h3>
                <ul style={featureListStyles}>
                  {product.features.map((feature, index) => (
                    <li key={index} style={featureItemStyles}>
                      <span style={checkmarkStyles}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={dividerStyles}></div>

              <div style={quantitySelectorStyles}>
                <span style={quantityLabelStyles}>Quantity:</span>
                <div style={quantityControlsStyles}>
                  <div 
                    style={decrementButtonStyles}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >−</div>
                  <input
                    type="text"
                    value={quantity}
                    style={quantityInputStyles}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) {
                        setQuantity(val);
                      }
                    }}
                  />
                  <div 
                    style={incrementButtonStyles}
                    onClick={() => setQuantity(quantity + 1)}
                  >+</div>
                </div>
              </div>

              <div style={stockInfoStyles}>
                <span style={{fontSize: "18px"}}>●</span>
                {product.stock > 0 
                  ? `In Stock (${product.stock} available)` 
                  : "Out of Stock"}
              </div>

              <button onClick={handleCart} style={addToCartButtonStyles}>
                <span style={{fontSize: "20px"}}>🛒</span> Add to Cart
              </button>

              <div style={dividerStyles}></div>

              <div>
                <h3 style={sectionTitleStyles}>Full Description</h3>
                {product.fullDescription.map((paragraph, index) => (
                  <p key={index} style={descriptionStyles}>{paragraph}</p>
                ))}
              </div>

              <div style={dividerStyles}></div>

              <div>
                <h3 style={sectionTitleStyles}>Specifications</h3>
                <table style={specificationsTableStyles}>
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <tr key={index} style={tableRowStyles}>
                        <td style={tableCellHeaderStyles}>{key}</td>
                        <td style={tableCellValueStyles}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div style={sectionStyles}>
          <div style={sectionHeaderStyles}>
            <h2 style={{margin: 0}}>Customer Reviews</h2>
            <div style={ratingContainerStyles}>
              <div style={starStyles}>★★★★★</div>
              <span style={{fontWeight: "500"}}>{product.rating}</span>
              <span style={reviewCountStyles}>({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Review list */}
          <div>
            {reviews.map((review) => (
              <div key={review.id} style={reviewContainerStyles}>
                <div style={reviewHeaderStyles}>
                  <div>
                    <span style={reviewUserStyles}>{review.user}</span>
                    {review.verified && (
                      <span style={verifiedBadgeStyles}>
                        <span style={{fontSize: "10px"}}>✓</span> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span style={reviewDateStyles}>{review.date}</span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px"}}>
                  <div style={starStyles}>
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <h4 style={reviewTitleStyles}>{review.title}</h4>
                <p style={reviewContentStyles}>{review.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products section */}
        <div style={recommendedSectionStyles}>
          <h2 style={{...sectionHeaderStyles, marginBottom: "15px"}}>You May Also Like</h2>
          <div style={productsGridStyles}>
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map((product) => (
                <div 
                  key={product._id} 
                  style={productCardStyles} 
                  onClick={() => navigate("/product", {state: {productId: product._id}})}
                >
                  <img
                    src={product.image} 
                    alt={product.name}
                    style={productCardImageStyles}
                  />
                  <div style={productCardContentStyles}>
                    <h3 style={productCardTitleStyles}>{product.name}</h3>
                    <div style={productCardPriceStyles}>
                      <span style={productCardCurrentPriceStyles}>₹{product.price}</span>
                      <span style={productCardOriginalPriceStyles}>₹599</span>
                    </div>
                    <div style={productCardRatingStyles}>
                      <span style={{color: "#facc15"}}>{"★".repeat(Math.floor(product.ratings))}{"☆".repeat(5 - Math.floor(product.ratings))}</span>
                      <span>{product.ratings}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                ...productCardStyles,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px",
                backgroundColor: "#f8fafc",
                border: "1px dashed #cbd5e1",
                height: "250px"
              }}>
                <div style={{
                  fontSize: "36px",
                  marginBottom: "10px"
                }}>🍃</div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  textAlign: "center"
                }}>More Teas Coming Soon</h3>
                <p style={{
                  fontSize: "14px",
                  color: "#64748b",
                  textAlign: "center"
                }}>We're adding new premium teas to our collection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}