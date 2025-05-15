import { useEffect, useState } from 'react';
import Navbar2 from '../components/layout/NavBar2';
import Footer from '../components/layout/Footer';
import {useCartItems} from "../context/CartItemsContext"
import { useAlert } from '../context/AlertMsgContext';
import { useLoaderData, useNavigate } from 'react-router-dom';



export default function ShoppingCart() {
  const {cartProducts,getCartItems,removeCartItem}=useCartItems()
  const {alertMsg}=useAlert()
  const navigate=useNavigate()

  const subtotal = cartProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = 1.00 ;
  const tax = subtotal * 0.01; // 7% tax rate
  const total = subtotal + shipping + tax;

  // Update quantity
  const updateQuantity =async (id, newQuantity) => {
    if (newQuantity < 1) return;
    else
    {
      await getCartItems(id,newQuantity)
    }
    
  };

  const removeItem = (id,name) => {
    removeCartItem(id)
    alertMsg(`Removed ${name} from Cart`)

  };

  const handlePayment=()=>
  {
    navigate("/order",{
      state:{
        checkoutItems:cartProducts,
        subtotal,
        shipping,
        tax,
        total
      }
    })
    
  }

  const colors = {
    primaryColor: '#4CAF50',
    primaryLight: '#A5D6A7',
    primaryDark: '#2E7D32',
    secondaryColor: '#81C784',
    accentColor: '#C8E6C9',
    lightColor: '#E8F5E9',
    textColor: '#2E3A59',
    textMuted: '#75757A',
    background: '#FFFFFF',
    cardBg: '#F9FFF9',
    hoverColor: '#E8F5E9',
    borderColor: '#C8E6C9'
  };
  return (
    <>
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      color: colors.textColor,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: colors.background
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: colors.primaryDark,
        marginBottom: '2rem',
        position: 'relative',
        paddingBottom: '15px',
        borderBottom: `4px solid ${colors.primaryLight}`,
        width: 'fit-content'
      }}>Your Shopping Cart</h1>

      {cartProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: colors.cardBg,
          borderRadius: '12px',
          border: `1px solid ${colors.borderColor}`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
        }}>
          <h3 style={{ 
            marginBottom: '1rem',
            color: colors.primaryDark 
          }}>Your cart is empty</h3>
          <p style={{ 
            color: colors.textMuted,
            marginBottom: '1.5rem' 
          }}>
            Looks like you haven't added any products to your cart yet.
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
            boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
          }}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '2rem'
        }}>
          {/* Cart Items Section */}
          <div>
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
                color: colors.primaryDark
              }}>
                <div>Product</div>
                <div>Details</div>
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
                  ':hover': {
                    backgroundColor: colors.hoverColor
                  }
                }}>
                  {/* Product Image */}
                  <div>
                    <img 
                      src={item.image} 
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
                  <div>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      marginBottom: '0.5rem',
                      color: colors.textColor
                    }}>{item.product.name}</h3>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      color: colors.textMuted,
                      backgroundColor: colors.accentColor,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}>{item.product.category}</span>
                  </div>

                  {/* Quantity */}
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'center'
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
                          backgroundColor: colors.lightColor,
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
                          backgroundColor: colors.lightColor,
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          transition: 'all 0.2s ease',
                          color: colors.primaryDark
                        }}
                      >+</button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontWeight: '600',
                      color: colors.primaryColor,
                      fontSize: '1.1rem' 
                    }}>${(item.product.price * item.quantity).toFixed(2)}</div>
                    <div style={{ 
                      fontSize: '0.9rem',
                      color: colors.textMuted
                    }}>${item.product.price.toFixed(2)} each</div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeItem(item.product._id,item.product.name)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: colors.textMuted,
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >✕</button>
                </div>
              ))}
            </div>

            {/* Continue Shopping Button */}
            <div style={{ marginTop: '1.5rem' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                background: 'none',
                border: 'none',
                color: colors.primaryColor,
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <span>←</span> Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div>
            <div style={{
              backgroundColor: colors.cardBg,
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: `1px solid ${colors.borderColor}`
            }}>
              <h2 style={{
                fontSize: '1.4rem',
                marginBottom: '1.5rem',
                color: colors.primaryDark,
                position: 'relative',
                paddingBottom: '12px',
                borderBottom: `3px solid ${colors.primaryLight}`,
                width: 'fit-content'
              }}>Order Summary</h2>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.8rem',
                fontSize: '1rem'
              }}>
                <span>Subtotal ({cartProducts.reduce((total, item) => total + item.quantity, 0)} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.8rem',
                fontSize: '1rem'
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
                fontSize: '1rem'
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
                color: colors.primaryDark
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
                  color: colors.textColor
                }}>Promo Code</label>
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
                      transition: 'all 0.3s ease'
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
                    transition: 'all 0.3s ease'
                  }}>
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button onClick={handlePayment} style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: colors.primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
              }}>

                Proceed to Checkout
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
                  border: `1px solid ${colors.borderColor}`
                }}></div>
                <div style={{
                  width: '40px',
                  height: '25px',
                  backgroundColor: colors.lightColor,
                  borderRadius: '4px',
                  border: `1px solid ${colors.borderColor}`
                }}></div>
                <div style={{
                  width: '40px',
                  height: '25px',
                  backgroundColor: colors.lightColor,
                  borderRadius: '4px',
                  border: `1px solid ${colors.borderColor}`
                }}></div>
                <div style={{
                  width: '40px',
                  height: '25px',
                  backgroundColor: colors.lightColor,
                  borderRadius: '4px',
                  border: `1px solid ${colors.borderColor}`
                }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>

    </>
    
  );
}