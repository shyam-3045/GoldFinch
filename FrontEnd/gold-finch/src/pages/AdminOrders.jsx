import React, { useState, useEffect } from 'react';
import axios from "../../axios.config";

const AdminOrders = ({ order }) => {
  // State for UI
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);

  // Set breakpoints for responsive design
  const breakpoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024
  };

  // Monitor window size for responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setMobileView(width < breakpoints.tablet);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Make sure order is available and is an array
  const orders = Array.isArray(order) ? order : [];

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.orderStatus.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user && order.user.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.deliveryDetails && order.deliveryDetails.mobile && order.deliveryDetails.mobile.includes(searchTerm));
    return matchesStatus && matchesSearch;
  });

  // Handle order selection
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  // Handle order status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/edit-orders/${orderId}`, {
        orderStatus: newStatus
      });

      // Update the UI state - would normally happen through context or redux in a real app
      const updatedOrders = orders.map(order => 
        order._id === orderId ? {...order, orderStatus: newStatus} : order
      );
      
      // Update selected order if it's the one being changed
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({...selectedOrder, orderStatus: newStatus});
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Format currency helper for Indian Rupees
  const formatCurrency = (amount) => {
    return `₹${(amount / 100).toFixed(2)}`;
  };

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status cell styling based on order status
  const getStatusStyles = (status) => {
    let color;
    switch (status.toLowerCase()) {
      case 'delivered':
        color = '#4caf50';
        break;
      case 'processing':
        color = '#2196f3';
        break;
      case 'pending':
      case 'wait':
        color = '#ff9800';
        break;
      case 'cancelled':
        color = '#f44336';
        break;
      default:
        color = '#757575';
    }
    
    return {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      color: 'white',
      backgroundColor: color,
      fontSize: '12px',
      textTransform: 'capitalize'
    };
  };

  // Base styles with responsive adjustments
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      padding: mobileView ? '10px' : '20px',
      color: '#333',
      boxSizing: 'border-box',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: mobileView ? '15px' : '20px',
      padding: '10px 0',
      borderBottom: '1px solid #eaeaea',
      flexDirection: mobileView ? 'column' : 'row',
    },
    headerTitle: {
      fontSize: mobileView ? '20px' : '24px',
      fontWeight: 'bold',
      color: '#2a5e41',
      margin: mobileView ? '0 0 10px 0' : '0',
      textAlign: mobileView ? 'center' : 'left',
      width: mobileView ? '100%' : 'auto',
    },
    controlsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      flexDirection: mobileView ? 'column' : 'row',
      gap: mobileView ? '10px' : '0',
    },
    searchBoxContainer: {
      width: mobileView ? '100%' : '250px',
    },
    searchBox: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      width: '100%',
      fontSize: '14px',
      boxSizing: 'border-box',
    },
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
      width: mobileView ? '100%' : 'auto',
      justifyContent: mobileView ? 'space-between' : 'flex-start',
    },
    filterLabel: {
      marginRight: '10px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
    },
    filterSelect: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      fontSize: '14px',
      flex: mobileView ? '1' : '0',
    },
    ordersContainer: {
      display: 'flex',
      gap: '20px',
      flexDirection: mobileView ? 'column' : 'row',
    },
    ordersList: {
      flex: '1',
      borderRight: mobileView ? 'none' : '1px solid #eaeaea',
      paddingRight: mobileView ? '0' : '20px',
      marginBottom: mobileView ? '20px' : '0',
    },
    tableWrapper: {
      overflowX: 'auto',
      width: '100%',
    },
    ordersTable: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '500px', // Ensures table doesn't shrink too much on mobile
    },
    tableHeader: {
      backgroundColor: '#f1f8e9',
      textAlign: 'left',
      padding: '12px',
      fontSize: '14px',
      color: '#2a5e41',
      borderBottom: '2px solid #c5e1a5',
    },
    tableRow: {
      borderBottom: '1px solid #eaeaea',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    tableCell: {
      padding: '12px',
      fontSize: '14px',
      color: '#333',
    },
    detailsContainer: {
      flex: '2',
      padding: mobileView ? '0' : '0 20px',
    },
    noOrderSelected: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      border: '1px dashed #ddd',
      borderRadius: '8px',
      color: '#757575',
      fontSize: '16px',
      padding: '20px',
      textAlign: 'center',
    },
    orderDetailsCard: {
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      padding: mobileView ? '15px' : '20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    orderDetailsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: mobileView ? 'flex-start' : 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '1px solid #eaeaea',
      flexDirection: mobileView ? 'column' : 'row',
      gap: mobileView ? '10px' : '0',
    },
    orderDetailsTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2a5e41',
      margin: '0',
    },
    orderStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: mobileView ? '100%' : 'auto',
      justifyContent: mobileView ? 'space-between' : 'flex-start',
    },
    orderStatusSelect: {
      padding: '6px 10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      fontSize: '14px',
      flex: mobileView ? '1' : '0',
    },
    orderInfoGrid: {
      display: 'grid',
      gridTemplateColumns: mobileView ? '1fr' : '1fr 1fr',
      gap: '20px',
      marginBottom: '20px',
    },
    orderInfoSection: {
      padding: '15px',
      backgroundColor: '#f9f9f9',
      borderRadius: '6px',
    },
    sectionTitle: {
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
    itemsTableWrapper: {
      overflowX: 'auto',
      width: '100%',
    },
    itemsTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      minWidth: '500px', // Ensures table doesn't shrink too much on mobile
    },
    totalRow: {
      fontWeight: 'bold',
      borderTop: '2px solid #eaeaea',
    },
    empty: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      border: '1px dashed #ddd',
      borderRadius: '8px',
      color: '#757575',
      fontSize: '16px',
      padding: '20px',
      textAlign: 'center',
    },
    footer: {
      marginTop: '20px',
      padding: '20px 0',
      borderTop: '1px solid #eaeaea',
      textAlign: 'center',
      color: '#757575',
      fontSize: '14px',
    },
    backToListButton: {
      display: mobileView && selectedOrder ? 'block' : 'none',
      margin: '0 0 15px 0',
      padding: '8px 15px',
      backgroundColor: '#f1f8e9',
      color: '#2a5e41',
      border: '1px solid #c5e1a5',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Order Management</h1>
      </div>

      {/* Controls */}
      <div style={styles.controlsContainer}>
        <div style={styles.searchBoxContainer}>
          <input
            type="text"
            placeholder="Search orders by ID or mobile"
            style={styles.searchBox}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={styles.filterContainer}>
          <label style={styles.filterLabel}>Filter by Status:</label>
          <select
            style={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="wait">Waiting</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Container */}
      <div style={styles.ordersContainer}>
        {/* Mobile Back Button */}
        {mobileView && selectedOrder && (
          <button 
            style={styles.backToListButton}
            onClick={() => setSelectedOrder(null)}
          >
            ← Back to Orders List
          </button>
        )}

        {/* Orders List - Hide on mobile when order is selected */}
        {(!mobileView || !selectedOrder) && (
          <div style={styles.ordersList}>
            {filteredOrders.length > 0 ? (
              <div style={styles.tableWrapper}>
                <table style={styles.ordersTable}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Order ID</th>
                      <th style={styles.tableHeader}>Customer</th>
                      <th style={styles.tableHeader}>Date</th>
                      <th style={styles.tableHeader}>Total</th>
                      <th style={styles.tableHeader}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        style={{
                          ...styles.tableRow,
                          backgroundColor: selectedOrder && selectedOrder._id === order._id ? '#f1f8e9' : 'transparent'
                        }}
                        onClick={() => handleOrderClick(order)}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = selectedOrder && selectedOrder._id === order._id ? '#f1f8e9' : '#f5f5f5'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = selectedOrder && selectedOrder._id === order._id ? '#f1f8e9' : 'transparent'}
                      >
                        <td style={styles.tableCell}>{order._id.substring(order._id.length - 8)}</td>
                        <td style={styles.tableCell}>{order.deliveryDetails?.mobile || 'N/A'}</td>
                        <td style={styles.tableCell}>{order.createdAt ? formatDate(order.createdAt) : 'N/A'}</td>
                        <td style={styles.tableCell}>{formatCurrency(order.totalAmount)}</td>
                        <td style={styles.tableCell}>
                          <span style={getStatusStyles(order.orderStatus)}>{order.orderStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={styles.empty}>No orders found matching your criteria.</div>
            )}
          </div>
        )}

        {/* Order Details - Show on mobile only when an order is selected */}
        {(!mobileView || selectedOrder) && (
          <div style={styles.detailsContainer}>
            {selectedOrder ? (
              <div style={styles.orderDetailsCard}>
                <div style={styles.orderDetailsHeader}>
                  <h2 style={styles.orderDetailsTitle}>Order #{selectedOrder._id.substring(selectedOrder._id.length - 8)}</h2>
                  <div style={styles.orderStatus}>
                    <label>Status:</label>
                    <select
                      style={styles.orderStatusSelect}
                      value={selectedOrder.orderStatus}
                      onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                    >
                      <option value="Wait">Waiting</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div style={styles.orderInfoGrid}>
                  {/* Customer Information */}
                  <div style={styles.orderInfoSection}>
                    <h3 style={styles.sectionTitle}>Customer Information</h3>
                    <p style={styles.infoText}><strong>Mobile:</strong> {selectedOrder.deliveryDetails?.mobile || 'N/A'}</p>
                    <p style={styles.infoText}><strong>Order Date:</strong> {selectedOrder.createdAt ? formatDate(selectedOrder.createdAt) : 'N/A'}</p>
                    <p style={styles.infoText}><strong>User:</strong> {selectedOrder.deliveryDetails?.email || selectedOrder.user || 'N/A'}</p>
                  </div>

                  {/* Payment Information */}
                  <div style={styles.orderInfoSection}>
                    <h3 style={styles.sectionTitle}>Payment Information</h3>
                    <p style={styles.infoText}><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                    <p style={styles.infoText}><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
                    <p style={styles.infoText}><strong>Wait Status:</strong> {selectedOrder.waitStatus}</p>
                  </div>

                  {/* Shipping Information */}
                  <div style={styles.orderInfoSection}>
                    <h3 style={styles.sectionTitle}>Shipping Information</h3>
                    <p style={styles.infoText}><strong>Address:</strong> {selectedOrder.deliveryDetails?.address || 'N/A'}</p>
                    <p style={styles.infoText}><strong>City:</strong> {selectedOrder.deliveryDetails?.city || 'N/A'}, {selectedOrder.deliveryDetails?.state || 'N/A'} {selectedOrder.deliveryDetails?.pincode || 'N/A'}</p>
                    <p style={styles.infoText}><strong>Country:</strong> {selectedOrder.deliveryDetails?.country || 'N/A'}</p>
                    {selectedOrder.deliveryDetails?.landmark && (
                      <p style={styles.infoText}><strong>Landmark:</strong> {selectedOrder.deliveryDetails.landmark}</p>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 style={styles.sectionTitle}>Order Items</h3>
                  <div style={styles.itemsTableWrapper}>
                    <table style={styles.itemsTable}>
                      <thead>
                        <tr>
                          <th style={styles.tableHeader}>Product</th>
                          <th style={styles.tableHeader}>Quantity</th>
                          <th style={styles.tableHeader}>Price</th>
                          <th style={styles.tableHeader}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.products && selectedOrder.products.map((item, index) => (
                          <tr key={index} style={styles.tableRow}>
                            <td style={styles.tableCell}>{item.product?.name || 'Product Name N/A'}</td>
                            <td style={styles.tableCell}>{item.quantity}</td>
                            <td style={styles.tableCell}>{formatCurrency(item.product?.price || 0)}</td>
                            <td style={styles.tableCell}>{formatCurrency((item.product?.price || 0) * item.quantity)}</td>
                          </tr>
                        ))}
                        <tr style={{...styles.tableRow, ...styles.totalRow}}>
                          <td colSpan="3" style={{...styles.tableCell, textAlign: 'right'}}><strong>Total:</strong></td>
                          <td style={styles.tableCell}>{formatCurrency(selectedOrder.totalAmount)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div style={styles.noOrderSelected}>
                Select an order to view details
              </div>
            )}
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <p>© 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminOrders;