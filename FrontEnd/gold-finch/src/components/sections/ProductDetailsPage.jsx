import {  useEffect, useState } from 'react';
import Footer from '../layout/Footer';
import Navbar from '../layout/NavBar2';
import { useAlert } from '../../context/AlertMsgContext';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsDetails';
import { useCartItems } from '../../context/CartItemsContext'; 


export default function ProductDetailsPage() {
  const products=useLoaderData()
  const {getCartItems}=useCartItems()
  const {getProductById}=useProducts()
  const location=useLocation()
  const {productId}=location.state
  const {alertMsg}=useAlert()
  const[singlePrd,setSinglePrd]=useState([])
  const token=localStorage.getItem("token")
  const navigate=useNavigate()



  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);


 useEffect(() => {
  const fetchProduct = async () => {
    const res = await getProductById(productId);
    setSinglePrd(res);
  };
  fetchProduct();
}, [productId]);  // <-- this is key!


  
  
  
  
  const handleCart=()=>
  {
    if(!token)
    {
      alertMsg("Login To Procced")
    }
    else{
      getCartItems(productId,quantity)
      alertMsg(`Added ${singlePrd.name} To the Cart `)
    }
  }

  
  const product = {
    name: singlePrd.name,
    price: singlePrd.price,
    discountPrice: 24.99,
    rating: singlePrd.ratings,
    reviews: singlePrd.numOfReviews,
    description: singlePrd.description,
    features: [
      "BPA-free stainless steel construction",
      "Double-wall vacuum insulation",
      "Leak-proof design",
      "Wide mouth for easy cleaning",
      "Fits standard cup holders"
    ],
    specifications: {
      "Material": "18/8 Food-grade stainless steel",
      "Capacity": "24 oz (710ml)",
      "Dimensions": "9.5\" H x 2.9\" D",
      "Weight": "0.8 lbs"
    },
    colors: ["#a8e6cf", "#1e88e5", "#ff8a65"],
    stock: singlePrd.stock,
    images: [
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400"
    ],
    fullDescription: [
      "This premium eco-friendly water bottle is designed for the modern adventurer and everyday user alike. The double-wall vacuum insulation technology keeps your beverages at the perfect temperature - cold drinks stay cold for up to 24 hours, while hot drinks remain hot for up to 12 hours.",
      "Crafted from high-quality 18/8 food-grade stainless steel, this bottle is built to last and completely free from BPA and other harmful chemicals. The leak-proof design ensures you can toss it in your bag without worry, while the wide mouth makes filling and cleaning a breeze.",
      "Whether you're hiking a mountain trail, hitting the gym, or just staying hydrated at your desk, this bottle is the perfect companion. Its sleek design fits standard cup holders, and the powder-coated finish provides a comfortable grip that won't sweat or leave condensation rings."
    ]
  };

  

  const reviews = [
    {
      id: 1,
      user: "Sarah J.",
      rating: 5,
      date: "April 15, 2025",
      title: "Exactly what I was looking for!",
      content: "I've been using this bottle for a month now and it's exceeded my expectations. My coffee stays hot during my entire morning commute, and ice water stays cold all day during hikes. The mint green color is gorgeous too!",
      verified: true
    },
    {
      id: 2,
      user: "Michael T.",
      rating: 4,
      date: "March 30, 2025",
      title: "Great quality, slightly heavy",
      content: "The quality is excellent and it definitely keeps drinks at temperature as advertised. My only small complaint is that it's a bit heavier than I expected, but that's probably due to the good insulation.",
      verified: true
    },
    {
      id: 3,
      user: "Elena R.",
      rating: 5,
      date: "April 2, 2025",
      title: "No more plastic bottles!",
      content: "I'm so happy with this purchase. The bottle is sturdy, doesn't leak at all, and has helped me completely eliminate single-use plastic bottles from my routine. Worth every penny!",
      verified: true
    }
  ];

  const recommendedProducts=products.filter((el)=>el.name !== singlePrd.name)

  
  // Styles
  const pageStyles = {
    fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    color: "#333",
    backgroundColor: "#f9fafb",
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const breadcrumbStyles = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  };

  const containerStyles = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "40px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
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
    gap: "10px",
    width: "80px",
  };

  const thumbnailStyles = {
    width: "80px",
    height: "80px",
    border: "1px solid #e0e0e0",
    borderRadius: "6px",
    cursor: "pointer",
    objectFit: "cover",
    transition: "all 0.2s ease",
  };

  const selectedThumbnailStyles = {
    ...thumbnailStyles,
    borderColor: "#86efac",
    boxShadow: "0 0 0 2px #86efac",
  };

  const mainImageContainerStyles = {
    flex: "1",
    position: "relative",
  };

  const mainImageStyles = {
    width: "100%",
    borderRadius: "8px",
    objectFit: "cover",
    aspectRatio: "1/1",
  };

  const infoColumnStyles = {
    flex: "1",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxHeight: "800px", // Added fixed height for scrolling
  };

  const scrollableContentStyles = {
    overflowY: "auto",
    paddingRight: "10px",
    height: "100%",
  };

  const productTitleStyles = {
    fontSize: "28px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: "#111",
  };

  const priceContainerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "5px 0 15px 0",
  };

  const currentPriceStyles = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#10b981",
  };

  const originalPriceStyles = {
    fontSize: "18px",
    color: "#888",
    textDecoration: "line-through",
  };

  const ratingContainerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const starStyles = {
    color: "#facc15",
    fontSize: "18px",
  };

  const reviewCountStyles = {
    color: "#666",
    fontSize: "14px",
  };

  const dividerStyles = {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "10px 0",
    width: "100%",
  };

  const descriptionStyles = {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#444",
    marginBottom: "10px",
  };

  const featureListStyles = {
    listStyle: "none",
    padding: "0",
    margin: "15px 0",
  };

  const featureItemStyles = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
    fontSize: "15px",
  };

  const checkmarkStyles = {
    color: "#10b981",
    fontSize: "16px",
  };

  const sectionTitleStyles = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
    marginTop: "20px",
  };

  const colorOptionsStyles = {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  };

  const colorOptionStyles = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  };

  const selectedColorOptionStyles = {
    transform: "scale(1.1)",
    boxShadow: "0 0 0 2px white, 0 0 0 4px #10b981",
  };

  const quantitySelectorStyles = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    margin: "15px 0",
  };

  const quantityLabelStyles = {
    fontSize: "16px",
    fontWeight: "500",
  };

  const quantityControlsStyles = {
    display: "flex",
    alignItems: "center",
  };

  const quantityButtonStyles = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "16px",
  };

  const decrementButtonStyles = {
    ...quantityButtonStyles,
    borderRadius: "6px 0 0 6px",
  };

  const incrementButtonStyles = {
    ...quantityButtonStyles,
    borderRadius: "0 6px 6px 0",
  };

  const quantityInputStyles = {
    width: "50px",
    height: "32px",
    border: "1px solid #e5e7eb",
    borderLeft: "none",
    borderRight: "none",
    textAlign: "center",
    fontSize: "16px",
  };

  const stockInfoStyles = {
    fontSize: "14px",
    color: product.stock > 5 ? "#10b981" : "#f59e0b",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  const addToCartButtonStyles = {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "background-color 0.2s ease",
    marginTop: "10px",
    width: "100%",
  };

  const specificationsTableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const tableRowStyles = {
    borderBottom: "1px solid #e5e7eb",
  };

  const tableCellStyles = {
    padding: "10px 5px",
    fontSize: "14px",
  };

  const tableCellHeaderStyles = {
    ...tableCellStyles,
    fontWeight: "600",
    width: "40%",
  };

  const sectionStyles = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    marginTop: "40px",
  };

  const sectionHeaderStyles = {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "25px",
    color: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const reviewContainerStyles = {
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "20px",
    marginBottom: "20px",
  };

  const reviewHeaderStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
  };

  const reviewUserStyles = {
    fontWeight: "600",
    fontSize: "16px",
  };

  const reviewDateStyles = {
    color: "#6b7280",
    fontSize: "14px",
  };

  const reviewTitleStyles = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  };

  const reviewContentStyles = {
    lineHeight: "1.6",
    fontSize: "15px",
    color: "#374151",
  };

  const verifiedBadgeStyles = {
    backgroundColor: "#ecfdf5",
    color: "#10b981",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "500",
    marginLeft: "8px",
  };

  const reviewFormStyles = {
    marginTop: "30px",
    padding: "25px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  };

  const reviewFormTitleStyles = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
  };

  const formGroupStyles = {
    marginBottom: "15px",
  };

  const formLabelStyles = {
    display: "block",
    fontSize: "15px",
    fontWeight: "500",
    marginBottom: "6px",
  };

  const formInputStyles = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "15px",
  };

  const formTextareaStyles = {
    ...formInputStyles,
    minHeight: "120px",
    resize: "vertical",
  };

  const ratingInputContainerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const starInputStyles = {
    fontSize: "24px",
    color: "#d1d5db",
    cursor: "pointer",
  };

  const starInputActiveStyles = {
    ...starInputStyles,
    color: "#facc15",
  };

  const submitButtonStyles = {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    marginTop: "10px",
  };

  const recommendedSectionStyles = {
    ...sectionStyles,
  };

  const productsGridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  };

  const productCardStyles = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  };

  const productCardImageStyles = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const productCardContentStyles = {
    padding: "15px",
  };

  const productCardTitleStyles = {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
  };

  const productCardPriceStyles = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  };

  const productCardCurrentPriceStyles = {
    fontSize: "18px",
    fontWeight: "700",
    color: "#10b981",
  };

  const productCardOriginalPriceStyles = {
    fontSize: "14px",
    color: "#888",
    textDecoration: "line-through",
  };

  const productCardRatingStyles = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
  };

  // Add Google Fonts
  const styleTag = document.createElement('style');
  if (!document.head.querySelector('#product-page-styles')) {
    styleTag.id = 'product-page-styles';
    document.head.appendChild(styleTag);
    
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }
  console.log("re renders")
  return (
    <>
    <Navbar/>
        <div style={pageStyles}>
      {/* Breadcrumb */}
      <div style={breadcrumbStyles}>
        Home &gt; Shop &gt; Outdoor &gt; Water Bottles
      </div>

      {/* Main container */}
      <div style={containerStyles}>
        {/* Left column - Product images */}
        <div style={imageColumnStyles}>
          {/* Thumbnails column */}
          <div style={thumbnailColumnStyles}>
            {product.images.slice(0, 4).map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${product.name} thumbnail ${index + 1}`}
                style={index === selectedImage ? selectedThumbnailStyles : thumbnailStyles}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
          
          {/* Main image */}
          <div style={mainImageContainerStyles}>
            <img 
              src={product.images[selectedImage]} 
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
                <span style={currentPriceStyles}>${product.price}</span>                
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
              <span style={{fontSize: "16px"}}>●</span>
              {product.stock > 0 
                ? `In Stock (${product.stock} available)` 
                : "Out of Stock"}
            </div>

            <button onClick={handleCart} style={addToCartButtonStyles}>
              <span style={{fontSize: "18px"}}>🛒</span> Add to Cart
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
                      <td style={tableCellStyles}>{value}</td>
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
          { reviews.map((review) => (
            <div key={review.id} style={reviewContainerStyles}>
              <div style={reviewHeaderStyles}>
                <div>
                  <span style={reviewUserStyles}>{review.user}</span>
                  {review.verified && (
                    <span style={verifiedBadgeStyles}>Verified Purchase</span>
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
          ))
          }
        </div>

        {/* Write a review form */}
        
      </div>

      {/* Recommended Products section */}
      <div style={recommendedSectionStyles}>
        <h2 style={{...sectionHeaderStyles, marginBottom: "15px"}}>You May Also Like</h2>
        <div style={productsGridStyles}>
          {recommendedProducts.map((product) => (
            <div key={product._id} style={productCardStyles}>
              <img
                onClick={()=>{navigate("/product",{state:{productId:product._id}})}}
                src={product.image} 
                alt={product.name}
                style={productCardImageStyles}
              />
              <div style={productCardContentStyles}>
                <h3 style={productCardTitleStyles}>{product.name}</h3>
                <div style={productCardPriceStyles}>
                  <span style={productCardCurrentPriceStyles}>${product.price}</span>
                </div>
                <div style={productCardRatingStyles}>
                  <span style={{color: "#facc15"}}>{"★".repeat(Math.floor(product.ratings))}{"☆".repeat(5 - Math.floor(product.ratings))}</span>
                  <span>{product.ratings}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
}