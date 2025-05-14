import { useEffect, useState } from 'react';
import Navbar2 from '../components/layout/NavBar2';
import Footer from '../components/layout/Footer';
import { useCartItems } from "../context/CartItemsContext";
import { useAlert } from '../context/AlertMsgContext';
import { useNavigate } from 'react-router-dom';

export default function ShoppingCart() {
  const { cartProducts, getCartItems, removeCartItem } = useCartItems();
  const { alertMsg } = useAlert();
  const navigate = useNavigate();
  const token=localStorage.getItem("token")

  const subtotal = cartProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = 5.00;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;

  // Update quantity
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    else {
      await getCartItems(id, newQuantity);
    }
  };

  const removeItem = (id, name) => {
    removeCartItem(id);
    alertMsg(`Removed ${name} from Cart`);
  };

  const handlePayment = () => {

    if(!token){
      return navigate("/")
    }

    navigate("/order", {
      state: {
        checkoutItems: cartProducts,
        subtotal,
        shipping,
        tax,
        total
      }
    });
  };

  // Tea-themed colors
  const colors = {
    primaryColor: '#8D6E63', // Brown
    primaryLight: '#D7CCC8', // Light brown
    primaryDark: '#5D4037', // Dark brown
    secondaryColor: '#A1887F', // Medium brown
    accentColor: '#EFEBE9', // Very light brown
    lightColor: '#F5F5F5', // Off-white
    textColor: '#3E2723', // Very dark brown
    textMuted: '#8D6E63', // Brown
    background: '#FFF8E1', // Cream
    cardBg: '#FFFDE7', // Light cream
    hoverColor: '#F9FBE7', // Light cream yellow
    borderColor: '#D7CCC8', // Light brown
    green: '#558B2F', // Green for tea leaves accent
  };
  
  return (
    <div style={{
      fontFamily: "'Playfair Display', serif",
      color: colors.textColor,
      backgroundColor: colors.background,
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          color: colors.primaryDark,
          marginBottom: '2rem',
          position: 'relative',
          paddingBottom: '15px',
          borderBottom: `2px solid ${colors.green}`,
          width: 'fit-content',
          fontFamily: "'Playfair Display', serif",
          fontWeight: '700'
        }}>Your Tea Collection</h1>

        {cartProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            backgroundColor: colors.cardBg,
            borderRadius: '12px',
            border: `1px solid ${colors.borderColor}`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            margin: '0 auto',
            maxWidth: '600px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem auto',
              backgroundImage: 'url("/path-to-teacup-icon.png")', // Replace with your own tea icon
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: '0.7'
            }}></div>
            <h3 style={{ 
              marginBottom: '1rem',
              color: colors.primaryDark,
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem'
            }}>Your tea cart is empty</h3>
            <p style={{ 
              color: colors.textMuted,
              marginBottom: '1.5rem',
              fontFamily: "'Lato', sans-serif",
              fontSize: '1rem',
              lineHeight: '1.6'
            }}>
              You haven't selected any tea treasures for your collection yet.
            </p>
            <button style={{
              padding: '12px 24px',
              backgroundColor: colors.primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(141, 110, 99, 0.3)',
              fontFamily: "'Lato', sans-serif",
            }}>
              Browse Our Tea Collection
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Cart Items Section */}
            <div style={{
              gridColumn: 'span 2',
              minWidth: '280px',
              '@media (max-width: 768px)': {
                gridColumn: 'span 1'
              }
            }}>
              <div style={{
                backgroundColor: colors.cardBg,
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                border: `1px solid ${colors.borderColor}`
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 2fr 1fr 1fr 50px',
                  gap: '1rem',
                  padding: '0.5rem 0',
                  borderBottom: `1px solid ${colors.borderColor}`,
                  fontWeight: '600',
                  color: colors.primaryDark,
                  '@media (max-width: 768px)': {
                    display: 'none'
                  }
                }}>
                  <div>Product</div>
                  <div>Tea Details</div>
                  <div style={{ textAlign: 'center' }}>Quantity</div>
                  <div style={{ textAlign: 'right' }}>Price</div>
                  <div></div>
                </div>

                {cartProducts.map(item => (
                  <div key={item._id} style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 2fr 1fr 1fr 50px',
                    gap: '1rem',
                    padding: '1.5rem 0',
                    alignItems: 'center',
                    borderBottom: `1px solid ${colors.borderColor}`,
                    transition: 'background-color 0.3s ease',
                    '@media (max-width: 768px)': {
                      gridTemplateColumns: '80px 1fr',
                      gridTemplateRows: 'auto auto auto',
                      gap: '0.5rem',
                      padding: '1rem 0'
                    }
                  }}>
                    {/* Product Image */}
                    <div style={{
                      '@media (max-width: 768px)': {
                        gridRow: 'span 3'
                      }
                    }}>
                      <img 
                        src={item.image || '/path-to-tea-default.jpg'} 
                        alt={item.product.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: `2px solid ${colors.borderColor}`,
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </div>

                    {/* Product Details */}
                    <div style={{
                      '@media (max-width: 768px)': {
                        gridColumn: '2',
                        gridRow: '1',
                        paddingRight: '30px'
                      }
                    }}>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        marginBottom: '0.5rem',
                        color: colors.textColor,
                        fontFamily: "'Playfair Display', serif",
                      }}>{item.product.name}</h3>
                      <span style={{ 
                        fontSize: '0.9rem', 
                        color: colors.green,
                        backgroundColor: colors.accentColor,
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: '500',
                        fontFamily: "'Lato', sans-serif",
                      }}>{item.product.category}</span>
                    </div>

                    {/* Quantity */}
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      '@media (max-width: 768px)': {
                        gridColumn: '2',
                        gridRow: '2',
                        justifyContent: 'flex-start'
                      }
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: `1px solid ${colors.borderColor}`,
                        borderRadius: '6px',
                        overflow: 'hidden',
                        backgroundColor: 'white'
                      }}>
                        <button 
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          style={{
                            width: '36px',
                            height: '36px',
                            border: 'none',
                            backgroundColor: colors.accentColor,
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            transition: 'all 0.2s ease',
                            color: colors.primaryDark
                          }}
                        >-</button>
                        <span style={{
                          width: '36px',
                          textAlign: 'center',
                          lineHeight: '36px',
                          fontWeight: '600',
                          color: colors.textColor
                        }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          style={{
                            width: '36px',
                            height: '36px',
                            border: 'none',
                            backgroundColor: colors.accentColor,
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            transition: 'all 0.2s ease',
                            color: colors.primaryDark
                          }}
                        >+</button>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ 
                      textAlign: 'right',
                      '@media (max-width: 768px)': {
                        gridColumn: '2',
                        gridRow: '3',
                        textAlign: 'left'
                      }
                    }}>
                      <div style={{ 
                        fontWeight: '600',
                        color: colors.green,
                        fontSize: '1.1rem',
                        fontFamily: "'Lato', sans-serif",
                      }}>${(item.product.price * item.quantity).toFixed(2)}</div>
                      <div style={{ 
                        fontSize: '0.9rem',
                        color: colors.textMuted,
                        fontFamily: "'Lato', sans-serif",
                      }}>${item.product.price.toFixed(2)} each</div>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.product._id, item.product.name)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: colors.textMuted,
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        '@media (max-width: 768px)': {
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem'
                        }
                      }}
                    >✕</button>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Button */}
              <div style={{ 
                marginTop: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: 'none',
                  border: `1px solid ${colors.primaryColor}`,
                  borderRadius: '6px',
                  color: colors.primaryColor,
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Lato', sans-serif",
                }}>
                  <span>←</span> Continue Tea Shopping
                </button>
              </div>
            </div>

            {/* Order Summary Section */}
            <div style={{
              '@media (max-width: 768px)': {
                gridColumn: 'span 1'
              }
            }}>
              <div style={{
                backgroundColor: colors.cardBg,
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: `1px solid ${colors.borderColor}`,
                position: 'sticky',
                top: '20px'
              }}>
                <h2 style={{
                  fontSize: '1.4rem',
                  marginBottom: '1.5rem',
                  color: colors.primaryDark,
                  position: 'relative',
                  paddingBottom: '12px',
                  borderBottom: `2px solid ${colors.green}`,
                  width: 'fit-content',
                  fontFamily: "'Playfair Display', serif",
                }}>Tea Order Summary</h2>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.8rem',
                  fontSize: '1rem',
                  fontFamily: "'Lato', sans-serif",
                }}>
                  <span>Subtotal ({cartProducts.reduce((total, item) => total + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.8rem',
                  fontSize: '1rem',
                  fontFamily: "'Lato', sans-serif",
                }}>
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: `1px solid ${colors.borderColor}`,
                  fontSize: '1rem',
                  fontFamily: "'Lato', sans-serif",
                }}>
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  marginBottom: '1.5rem',
                  marginTop: '1rem',
                  color: colors.primaryDark,
                  fontFamily: "'Playfair Display', serif",
                }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Coupon Code */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: colors.textColor,
                    fontFamily: "'Lato', sans-serif",
                  }}>Tea Promo Code</label>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <input 
                      type="text" 
                      placeholder="Enter code"
                      style={{
                        flex: '1',
                        padding: '0.8rem',
                        border: `1px solid ${colors.borderColor}`,
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease',
                        fontFamily: "'Lato', sans-serif",
                      }}
                    />
                    <button style={{
                      padding: '0 1rem',
                      backgroundColor: colors.secondaryColor,
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: "'Lato', sans-serif",
                    }}>
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button onClick={handlePayment} style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: colors.green,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(85, 139, 47, 0.3)',
                  fontFamily: "'Lato', sans-serif",
                }}>
                  Complete Tea Order
                </button>

                {/* Payment Methods */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '1.5rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '25px',
                    backgroundColor: colors.lightColor,
                    borderRadius: '4px',
                    border: `1px solid ${colors.borderColor}`,
                    backgroundImage: 'url("/path-to-visa.png")', // Replace with payment icons
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}></div>
                  <div style={{
                    width: '40px',
                    height: '25px',
                    backgroundColor: colors.lightColor,
                    borderRadius: '4px',
                    border: `1px solid ${colors.borderColor}`,
                    backgroundImage: 'url("/path-to-mastercard.png")', // Replace with payment icons
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}></div>
                  <div style={{
                    width: '40px',
                    height: '25px',
                    backgroundColor: colors.lightColor,
                    borderRadius: '4px',
                    border: `1px solid ${colors.borderColor}`,
                    backgroundImage: 'url("/path-to-amex.png")', // Replace with payment icons
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}></div>
                  <div style={{
                    width: '40px',
                    height: '25px',
                    backgroundColor: colors.lightColor,
                    borderRadius: '4px',
                    border: `1px solid ${colors.borderColor}`,
                    backgroundImage: 'url("/path-to-paypal.png")', // Replace with payment icons
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}