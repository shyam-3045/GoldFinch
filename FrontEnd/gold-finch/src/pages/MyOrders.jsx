import React, { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/NavBar2';

const MyOrders = () => {
  // State for user orders and UI
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock user data - in a real application, this would come from user authentication
  const user = {
    id: 'USR123456',
    name: 'Jane Smith',
    email: 'jane.smith@email.com'
  };

  // Mock data - in a real application, this would come from an API fetch based on user ID
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockOrders = [
        {
          id: 'ORD-2025-001',
          date: '2025-05-05',
          status: 'delivered',
          total: 32.99,
          items: [
            { id: 1, name: 'Jasmine Green Tea', quantity: 2, price: 12.50, image: '/jasmine-tea.jpg' },
            { id: 2, name: 'Earl Grey', quantity: 1, price: 7.99, image: '/earl-grey.jpg' },
          ],
          shipping: {
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
            method: 'Standard Shipping',
            cost: 5.99,
            trackingNumber: 'TRK123456789',
            estimatedDelivery: '2025-05-07',
            actualDelivery: '2025-05-06'
          },
          payment: {
            method: 'Credit Card',
            last4: '4242',
            status: 'paid'
          }
        },
        {
          id: 'ORD-2025-012',
          date: '2025-05-07',
          status: 'processing',
          total: 45.50,
          items: [
            { id: 3, name: 'Darjeeling Premium', quantity: 1, price: 18.50, image: '/darjeeling.jpg' },
            { id: 4, name: 'Herbal Tea Sampler', quantity: 2, price: 13.50, image: '/herbal-sampler.jpg' },
          ],
          shipping: {
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
            method: 'Express Shipping',
            cost: 8.99,
            trackingNumber: 'TRK987654321',
            estimatedDelivery: '2025-05-09',
            actualDelivery: null
          },
          payment: {
            method: 'PayPal',
            last4: 'N/A',
            status: 'paid'
          }
        },
        {
          id: 'ORD-2025-023',
          date: '2025-05-08',
          status: 'pending',
          total: 25.99,
          items: [
            { id: 5, name: 'Chamomile Tea', quantity: 3, price: 8.33, image: '/chamomile.jpg' },
          ],
          shipping: {
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
            method: 'Standard Shipping',
            cost: 5.99,
            trackingNumber: null,
            estimatedDelivery: '2025-05-12',
            actualDelivery: null
          },
          payment: {
            method: 'Credit Card',
            last4: '7890',
            status: 'pending'
          }
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    return filterStatus === 'all' || order.status === filterStatus;
  });

  // Handle order selection
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  // Close order details view
  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  // Styles object
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      color: '#333',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '10px 0',
      borderBottom: '1px solid #eaeaea',
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2a5e41', // Tea-themed color
      margin: '0',
    },
    userInfo: {
      fontSize: '14px',
      color: '#666',
    },
    controlsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      alignItems: 'center',
    },
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    filterSelect: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      fontSize: '14px',
    },
    orderCount: {
      fontSize: '14px',
      color: '#666',
    },
    ordersContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    orderSummary: {
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    orderSummaryHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.06)',
    },
    orderSummaryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    orderIdText: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2a5e41',
    },
    orderStatusContainer: (status) => {
      let color;
      switch (status) {
        case 'delivered':
          color = '#4caf50'; // Green
          break;
        case 'processing':
          color = '#2196f3'; // Blue
          break;
        case 'pending':
          color = '#ff9800'; // Orange
          break;
        case 'cancelled':
          color = '#f44336'; // Red
          break;
        default:
          color = '#757575'; // Grey
      }
      return {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '20px',
        color: 'white',
        backgroundColor: color,
        fontSize: '12px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
      };
    },
    orderSummaryDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    orderDate: {
      fontSize: '14px',
      color: '#666',
    },
    orderTotal: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    orderItemsPreview: {
      marginTop: '10px',
      paddingTop: '10px',
      borderTop: '1px solid #eaeaea',
      fontSize: '14px',
      color: '#666',
    },
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90%',
      overflow: 'auto',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      fontSize: '24px',
      fontWeight: 'bold',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: '#666',
    },
    orderDetails: {
      padding: '25px',
    },
    orderDetailHeader: {
      borderBottom: '1px solid #eaeaea',
      paddingBottom: '15px',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    orderDetailTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#2a5e41',
      margin: '0 0 5px 0',
    },
    orderDetailDate: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '5px',
    },
    orderDetailStatus: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    twoColumnGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '20px',
    },
    infoBox: {
      backgroundColor: '#f9f9f9',
      borderRadius: '6px',
      padding: '15px',
    },
    infoBoxTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#2a5e41',
    },
    infoText: {
      margin: '5px 0',
      fontSize: '14px',
      lineHeight: '1.5',
    },
    trackingStatus: {
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
      marginTop: '30px',
      marginBottom: '30px',
    },
    trackingStep: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: '1',
      flex: '1',
    },
    trackingStepCircle: (completed) => ({
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: completed ? '#4caf50' : '#ddd',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '8px',
      color: '#fff',
      fontSize: '12px',
      fontWeight: 'bold',
    }),
    trackingStepLabel: {
      fontSize: '12px',
      textAlign: 'center',
      color: '#666',
      maxWidth: '80px',
    },
    trackingLine: {
      position: 'absolute',
      top: '12px',
      left: '10%',
      right: '10%',
      height: '2px',
      backgroundColor: '#ddd',
      zIndex: '0',
    },
    trackingLineProgress: (progress) => ({
      position: 'absolute',
      top: '12px',
      left: '10%',
      width: `${progress}%`,
      height: '2px',
      backgroundColor: '#4caf50',
      zIndex: '0',
    }),
    orderDetailsSection: {
      marginTop: '20px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#2a5e41',
      paddingBottom: '5px',
      borderBottom: '1px solid #eaeaea',
    },
    orderItemsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    orderItem: {
      display: 'flex',
      padding: '10px',
      borderRadius: '6px',
      backgroundColor: '#f9f9f9',
    },
    itemImagePlaceholder: {
      width: '60px',
      height: '60px',
      backgroundColor: '#eaeaea',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '15px',
      fontSize: '10px',
      color: '#999',
    },
    itemDetails: {
      flex: '1',
      display: 'flex',
      justifyContent: 'space-between',
    },
    itemName: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '5px',
    },
    itemPrice: {
      fontSize: '14px',
      color: '#666',
    },
    itemQuantity: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '5px',
    },
    itemTotal: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
    },
    orderSummarySection: {
      marginTop: '20px',
      borderTop: '1px solid #eaeaea',
      paddingTop: '20px',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      fontSize: '14px',
      padding: '0 10px',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px',
      paddingTop: '10px',
      borderTop: '1px solid #eaeaea',
      fontWeight: 'bold',
      fontSize: '18px',
      padding: '10px',
      backgroundColor: '#f1f8e9',
      borderRadius: '4px',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '20px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.2s',
    },
    primaryButton: {
      backgroundColor: '#2a5e41',
      color: 'white',
    },
    secondaryButton: {
      backgroundColor: '#f1f8e9',
      color: '#2a5e41',
      border: '1px solid #2a5e41',
    },
    emptyOrders: {
      padding: '40px 20px',
      textAlign: 'center',
      border: '1px dashed #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    emptyOrdersText: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '20px',
    },
    shopNowButton: {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#2a5e41',
      color: 'white',
      borderRadius: '4px',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'background-color 0.2s',
    },
    loading: {
      padding: '40px 20px',
      textAlign: 'center',
      fontSize: '16px',
      color: '#666',
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  // Get tracking progress percentage based on status
  const getTrackingProgress = (status) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'processing':
        return 50;
      case 'shipped':
        return 75;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  // Get steps completed for tracking UI
  const getStepCompleted = (status, step) => {
    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const statusIndex = statusOrder.indexOf(status);
    const stepIndex = statusOrder.indexOf(step);
    
    return stepIndex <= statusIndex;
  };

  // Truncate order items for preview
  const getItemsPreview = (items) => {
    if (items.length === 1) {
      return items[0].name;
    } else {
      return `${items[0].name} and ${items.length - 1} more item${items.length > 2 ? 's' : ''}`;
    }
  };

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>My Orders</h1>
        <div style={styles.userInfo}>Welcome, {user.name}</div>
      </div>

      <div style={styles.controlsContainer}>
        <div style={styles.orderCount}>
          {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
        </div>
        <div style={styles.filterContainer}>
          <span>Filter by:</span>
          <select 
            style={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={styles.loading}>
          Loading your orders...
        </div>
      ) : filteredOrders.length > 0 ? (
        <div style={styles.ordersContainer}>
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              style={styles.orderSummary}
              onClick={() => handleOrderClick(order)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = styles.orderSummaryHover.transform;
                e.currentTarget.style.boxShadow = styles.orderSummaryHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = styles.orderSummary.boxShadow;
              }}
            >
              <div style={styles.orderSummaryHeader}>
                <div style={styles.orderIdText}>Order #{order.id}</div>
                <div style={styles.orderStatusContainer(order.status)}>
                  {order.status}
                </div>
              </div>
              <div style={styles.orderSummaryDetails}>
                <div style={styles.orderDate}>
                  {formatDate(order.date)}
                </div>
                <div style={styles.orderTotal}>
                  {formatCurrency(order.total)}
                </div>
              </div>
              <div style={styles.orderItemsPreview}>
                {getItemsPreview(order.items)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyOrders}>
          <p style={styles.emptyOrdersText}>You don't have any orders yet.</p>
          <a href="/shop" style={styles.shopNowButton}>Shop Now</a>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div style={styles.modalOverlay} onClick={closeOrderDetails}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeOrderDetails}>×</button>
            <div style={styles.orderDetails}>
              <div style={styles.orderDetailHeader}>
                <div>
                  <h2 style={styles.orderDetailTitle}>Order #{selectedOrder.id}</h2>
                  <div style={styles.orderDetailDate}>Placed on {formatDate(selectedOrder.date)}</div>
                </div>
                <div style={styles.orderDetailStatus}>
                  <div style={styles.orderStatusContainer(selectedOrder.status)}>
                    {selectedOrder.status}
                  </div>
                </div>
              </div>

              {/* Tracking Status - Only show for non-cancelled orders */}
              {selectedOrder.status !== 'cancelled' && (
                <div>
                  <div style={styles.trackingLine}></div>
                  <div style={styles.trackingLineProgress(getTrackingProgress(selectedOrder.status))}></div>
                  <div style={styles.trackingStatus}>
                    <div style={styles.trackingStep}>
                      <div style={styles.trackingStepCircle(getStepCompleted(selectedOrder.status, 'pending'))}>✓</div>
                      <div style={styles.trackingStepLabel}>Order Placed</div>
                    </div>
                    <div style={styles.trackingStep}>
                      <div style={styles.trackingStepCircle(getStepCompleted(selectedOrder.status, 'processing'))}>✓</div>
                      <div style={styles.trackingStepLabel}>Processing</div>
                    </div>
                    <div style={styles.trackingStep}>
                      <div style={styles.trackingStepCircle(getStepCompleted(selectedOrder.status, 'shipped'))}>✓</div>
                      <div style={styles.trackingStepLabel}>Shipped</div>
                    </div>
                    <div style={styles.trackingStep}>
                      <div style={styles.trackingStepCircle(getStepCompleted(selectedOrder.status, 'delivered'))}>✓</div>
                      <div style={styles.trackingStepLabel}>Delivered</div>
                    </div>
                  </div>
                </div>
              )}

              <div style={styles.twoColumnGrid}>
                {/* Shipping Information */}
                <div style={styles.infoBox}>
                  <h3 style={styles.infoBoxTitle}>Shipping Details</h3>
                  <p style={styles.infoText}>
                    <strong>Address:</strong> {selectedOrder.shipping.address}, {selectedOrder.shipping.city}, {selectedOrder.shipping.state} {selectedOrder.shipping.zip}
                  </p>
                  <p style={styles.infoText}>
                    <strong>Method:</strong> {selectedOrder.shipping.method}
                  </p>
                  {selectedOrder.shipping.trackingNumber && (
                    <p style={styles.infoText}>
                      <strong>Tracking #:</strong> {selectedOrder.shipping.trackingNumber}
                    </p>
                  )}
                  <p style={styles.infoText}>
                    <strong>Estimated Delivery:</strong> {formatDate(selectedOrder.shipping.estimatedDelivery)}
                  </p>
                  {selectedOrder.shipping.actualDelivery && (
                    <p style={styles.infoText}>
                      <strong>Delivered On:</strong> {formatDate(selectedOrder.shipping.actualDelivery)}
                    </p>
                  )}
                </div>

                {/* Payment Information */}
                <div style={styles.infoBox}>
                  <h3 style={styles.infoBoxTitle}>Payment Information</h3>
                  <p style={styles.infoText}>
                    <strong>Method:</strong> {selectedOrder.payment.method}
                  </p>
                  {selectedOrder.payment.last4 !== 'N/A' && (
                    <p style={styles.infoText}>
                      <strong>Card:</strong> **** **** **** {selectedOrder.payment.last4}
                    </p>
                  )}
                  <p style={styles.infoText}>
                    <strong>Payment Status:</strong> {selectedOrder.payment.status}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div style={styles.orderDetailsSection}>
                <h3 style={styles.sectionTitle}>Order Items</h3>
                <div style={styles.orderItemsList}>
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} style={styles.orderItem}>
                      <div style={styles.itemImagePlaceholder}>
                        Tea Image
                      </div>
                      <div style={styles.itemDetails}>
                        <div>
                          <div style={styles.itemName}>{item.name}</div>
                          <div style={styles.itemPrice}>{formatCurrency(item.price)} each</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={styles.itemQuantity}>Qty: {item.quantity}</div>
                          <div style={styles.itemTotal}>{formatCurrency(item.price * item.quantity)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div style={styles.orderSummarySection}>
                <div style={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>{formatCurrency(selectedOrder.total - selectedOrder.shipping.cost)}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>{formatCurrency(selectedOrder.shipping.cost)}</span>
                </div>
                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                <button 
                  style={{...styles.button, ...styles.secondaryButton}}
                  onClick={() => window.print()}
                >
                  Print Receipt
                </button>
                {selectedOrder.status === 'delivered' && (
                  <button 
                    style={{...styles.button, ...styles.primaryButton}}
                    onClick={() => alert('Reorder functionality would go here')}
                  >
                    Buy Again
                  </button>
                )}
                {selectedOrder.shipping.trackingNumber && selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                  <button 
                    style={{...styles.button, ...styles.primaryButton}}
                    onClick={() => alert('Tracking page would open here')}
                  >
                    Track Package
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>

    </>
    
  );
};

export default MyOrders;