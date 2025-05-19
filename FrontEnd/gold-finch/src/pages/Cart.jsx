import { useEffect, useState } from 'react';
import { useCartItems } from "../context/CartItemsContext";
import { useAlert } from '../context/AlertMsgContext';
import { useNavigate,NavLink } from 'react-router-dom';

export default function ShoppingCart() {
  const { cartProducts, getCartItems, removeCartItem } = useCartItems();
  const { alertMsg } = useAlert();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Keep all existing logic intact
  const subtotal = cartProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = 1.00;
  const tax = subtotal * 0.01;
  const total = subtotal + shipping + tax;

  // Update quantity function - unchanged
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    else {
      await getCartItems(id, newQuantity);
    }
  };

  // Remove item function - unchanged
  const removeItem = (id, name) => {
    removeCartItem(id);
    alertMsg(`Removed ${name} from Cart`);
  };

  // Handle payment function - unchanged
  const handlePayment = () => {
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

  // Continue shopping handler
  const handleContinueShopping = () => {
    navigate("/allProducts");
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Lato", "Open Sans", sans-serif',
      color: '#333'
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: '700',
        color: '#2b5d34',
        marginBottom: '30px',
        textAlign: 'center'
      }}>Your Tea Cart</h1> 
      {/* Checkout Progress Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0 40px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          maxWidth: '600px',
          position: 'relative'
        }}>
          {/* Progress Line */}
          <div style={{
            position: 'absolute',
            height: '2px',
            backgroundColor: '#e0e0e0',
            width: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: '1'
          }}></div>
          
          {/* Active Step */}
          <div style={{
            backgroundColor: '#4a7c59',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: '2'
          }}>
            1
          </div>
          
          {/* Text under step */}
          <div style={{
            position: 'absolute',
            top: '45px',
            left: '0',
            textAlign: 'center',
            fontWeight: '600',
            color: '#4a7c59'
          }}>
            Cart
          </div>
          
          {/* Inactive Step */}
          <div style={{
            backgroundColor: '#7fad8b',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: '2'
          }}>
            2
          </div>
          
          {/* Text under step */}
          <div style={{
            position: 'absolute',
            top: '45px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            fontWeight: '500',
            color: '#666'
          }}>
            Address
          </div>
          
          {/* Inactive Step */}
          <div style={{
            backgroundColor: '#e0e0e0',
            color: '#666',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: '2'
          }}>
            3
          </div>
          
          {/* Text under step */}
          <div style={{
            position: 'absolute',
            top: '45px',
            right: '0',
            textAlign: 'center',
            fontWeight: '500',
            color: '#666'
          }}>
            Payment
          </div>
        </div>
      </div>

      

      {cartProducts.length === 0 ? (
        <div style={{
          padding: '60px 30px',
          textAlign: 'center',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          marginBottom: '40px'
        }}>
          <div style={{
            fontSize: '64px',
            color: '#d1e0d5',
            marginBottom: '20px'
          }}>🛒</div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#2b5d34',
            marginBottom: '16px'
          }}>Your cart is empty</h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '30px',
            maxWidth: '400px',
            margin: '0 auto 30px'
          }}>
            Explore our premium collection of teas and find your perfect brew!
          </p>
          <button 
            onClick={handleContinueShopping}
            style={{
              padding: '14px 28px',
              backgroundColor: '#4a7c59',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3d6a4a'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a7c59'}
          >
            Browse Our Tea Collection
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: windowWidth > 900 ? '1fr 380px' : '1fr',
          gap: '30px'
        }}>
          {/* Cart Items Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}>
            {/* Cart Header */}
            <div style={{
              backgroundColor: '#f1f7f3',
              padding: '16px 20px',
              color: '#2b5d34',
              fontWeight: '600',
              borderBottom: '1px solid #e0e0e0',
              display: windowWidth > 768 ? 'grid' : 'none',
              gridTemplateColumns: '120px 2fr 1fr 1fr 50px',
              gap: '16px'
            }}>
              <div>Product</div>
              <div>Details</div>
              <div style={{textAlign: 'center'}}>Quantity</div>
              <div style={{textAlign: 'right'}}>Price</div>
              <div></div>
            </div>

            {/* Cart Items */}
            <div style={{padding: '10px 0'}}>
              {cartProducts.map(item => (
                <div key={item._id} style={{
                  display: 'grid',
                  gridTemplateColumns: windowWidth > 768 ? '120px 2fr 1fr 1fr 50px' : '120px 1fr',
                  gridTemplateRows: windowWidth <= 768 ? 'auto auto auto' : 'auto',
                  gap: windowWidth > 768 ? '16px' : '8px',
                  padding: '20px',
                  borderBottom: '1px solid #f0f0f0',
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  {/* Product Image */}
                  <div style={{
                    gridRow: windowWidth <= 768 ? 'span 3' : 'auto'
                  }}>
                    <img
                      src={item.product.name === "Assam Delight Tea" ?"../../../public/Product1-front.jpg":"/"}
                      alt={item.product.name}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        border: '1px solid #eaeaea'
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div style={{
                    gridColumn: windowWidth <= 768 ? '2' : 'auto',
                    gridRow: windowWidth <= 768 ? '1' : 'auto',
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#333'
                    }}>{item.product.name}</h3>
                    <span style={{
                      fontSize: '14px',
                      color: '#666',
                      backgroundColor: '#f1f7f3',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>{item.product.category}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    justifyContent: windowWidth > 768 ? 'center' : 'flex-start',
                    gridColumn: windowWidth <= 768 ? '2' : 'auto',
                    gridRow: windowWidth <= 768 ? '2' : 'auto',
                    marginTop: windowWidth <= 768 ? '8px' : '0'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          backgroundColor: '#f1f7f3',
                          cursor: 'pointer',
                          fontSize: '16px',
                          color: '#2b5d34'
                        }}
                      >-</button>
                      <span style={{
                        width: '40px',
                        textAlign: 'center',
                        lineHeight: '32px',
                        fontWeight: '600',
                        color: '#333'
                      }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          backgroundColor: '#f1f7f3',
                          cursor: 'pointer',
                          fontSize: '16px',
                          color: '#2b5d34'
                        }}
                      >+</button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{
                    textAlign: windowWidth > 768 ? 'right' : 'left',
                    gridColumn: windowWidth <= 768 ? '2' : 'auto',
                    gridRow: windowWidth <= 768 ? '3' : 'auto',
                    marginTop: windowWidth <= 768 ? '8px' : '0'
                  }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#4a7c59',
                      fontSize: '16px'
                    }}>₹{(item.product.price * item.quantity).toFixed(2)}</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#777'
                    }}>₹{item.product.price.toFixed(2)} each</div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product._id, item.product.name)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '0',
                      position: windowWidth <= 768 ? 'absolute' : 'static',
                      top: windowWidth <= 768 ? '20px' : 'auto',
                      right: windowWidth <= 768 ? '20px' : 'auto'
                    }}
                    aria-label="Remove item"
                  >✕</button>
                </div>
              ))}
            </div>

            {/* Continue Shopping Button */}
            <div style={{
              padding: '20px',
              borderTop: '1px solid #f0f0f0'
            }}>
              <button 
                onClick={handleContinueShopping}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  color: '#4a7c59',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '15px'
                }}
              >
                <NavLink to={"/allProducts"}><span>←</span> <span>Continue Shopping</span>  </NavLink>
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            padding: '24px',
            position: 'sticky',
            top: '20px',
            height: 'fit-content'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#2b5d34',
              position: 'relative',
              paddingBottom: '12px'
            }}>
              Order Summary
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '60px',
                height: '3px',
                backgroundColor: '#7fad8b'
              }}></span>
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{color: '#666'}}>
                  Subtotal ({cartProducts.reduce((total, item) => total + item.quantity, 0)} items)
                </span>
                <span style={{fontWeight: '500'}}>₹{subtotal.toFixed(2)}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{color: '#666'}}>Shipping</span>
                <span style={{fontWeight: '500'}}>₹{shipping.toFixed(2)}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: '14px',
                borderBottom: '1px solid #eaeaea'
              }}>
                <span style={{color: '#666'}}>Estimated Tax</span>
                <span style={{fontWeight: '500'}}>₹{tax.toFixed(2)}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '6px',
                marginBottom: '20px'
              }}>
                <span style={{
                  fontWeight: '700',
                  fontSize: '18px'
                }}>Total</span>
                <span style={{
                  fontWeight: '700',
                  fontSize: '18px',
                  color: '#2b5d34'
                }}>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Future Discount Note */}
            <div style={{
              backgroundColor: '#f1f7f3',
              borderRadius: '6px',
              padding: '14px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              borderLeft: '4px solid #7fad8b'
            }}>
              <span style={{
                fontSize: '18px'
              }}>ℹ️</span>
              <span style={{
                fontSize: '14px',
                color: '#555'
              }}>Discount codes will be available soon!</span>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={handlePayment} 
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#4a7c59',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                marginBottom: '20px'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3d6a4a'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a7c59'}
            >
              Proceed to Checkout
            </button>

            {/* Secure Checkout Text */}
            <div style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '16px'
            }}>
              <span style={{fontSize: '14px'}}>🔒</span> 
              <span>Secure Checkout</span>
            </div>

            {/* Payment Methods */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '50px',
                height: '30px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: '#666'
              }}>VISA</div>
              <div style={{
                width: '50px',
                height: '30px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: '#666'
              }}>MC</div>
              <div style={{
                width: '50px',
                height: '30px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: '#666'
              }}>AMEX</div>
              <div style={{
                width: '50px',
                height: '30px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: '#666'
              }}>PAY</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}