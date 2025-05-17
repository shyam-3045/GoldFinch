import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  // State for orders data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in a real application, this would come from an API
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockOrders = [
        {
          id: 'ORD-2025-001',
          customer: 'John Smith',
          email: 'john.smith@email.com',
          date: '2025-05-05',
          status: 'delivered',
          total: 32.99,
          items: [
            { id: 1, name: 'Jasmine Green Tea', quantity: 2, price: 12.50 },
            { id: 2, name: 'Earl Grey', quantity: 1, price: 7.99 },
          ],
          shipping: {
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345',
            method: 'Standard Shipping',
            cost: 5.99
          },
          payment: {
            method: 'Credit Card',
            last4: '4242',
            status: 'paid'
          }
        },
        {
          id: 'ORD-2025-002',
          customer: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          date: '2025-05-07',
          status: 'processing',
          total: 45.50,
          items: [
            { id: 3, name: 'Darjeeling Premium', quantity: 1, price: 18.50 },
            { id: 4, name: 'Herbal Tea Sampler', quantity: 2, price: 13.50 },
          ],
          shipping: {
            address: '456 Oak Ave',
            city: 'Somewhere',
            state: 'NY',
            zip: '67890',
            method: 'Express Shipping',
            cost: 8.99
          },
          payment: {
            method: 'PayPal',
            last4: 'N/A',
            status: 'paid'
          }
        },
        {
          id: 'ORD-2025-003',
          customer: 'Michael Brown',
          email: 'michael.b@email.com',
          date: '2025-05-08',
          status: 'pending',
          total: 25.99,
          items: [
            { id: 5, name: 'Chamomile Tea', quantity: 3, price: 8.33 },
          ],
          shipping: {
            address: '789 Pine Ln',
            city: 'Elsewhere',
            state: 'TX',
            zip: '54321',
            method: 'Standard Shipping',
            cost: 5.99
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

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle order selection
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  // Handle order status change - Fixed the syntax error here
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({...selectedOrder, status: newStatus});
    }
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
    controlsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    searchBox: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      width: '250px',
      fontSize: '14px',
    },
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    filterLabel: {
      marginRight: '10px',
      fontWeight: 'bold',
    },
    filterSelect: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      fontSize: '14px',
    },
    ordersContainer: {
      display: 'flex',
      gap: '20px',
    },
    ordersList: {
      flex: '1',
      borderRight: '1px solid #eaeaea',
      paddingRight: '20px',
    },
    ordersTable: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f1f8e9', // Light green background
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
    tableRowHover: {
      backgroundColor: '#f5f5f5',
    },
    tableCell: {
      padding: '12px',
      fontSize: '14px',
      color: '#333',
    },
    statusCell: (status) => {
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
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'white',
        backgroundColor: color,
        fontSize: '12px',
        textTransform: 'capitalize',
      };
    },
    detailsContainer: {
      flex: '2',
      padding: '0 20px',
    },
    noOrderSelected: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      border: '1px dashed #ddd',
      borderRadius: '8px',
      color: '#757575',
      fontSize: '16px',
    },
    orderDetailsCard: {
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    orderDetailsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '1px solid #eaeaea',
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
    },
    orderStatusSelect: {
      padding: '6px 10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      fontSize: '14px',
    },
    orderInfoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
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
    itemsTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    totalRow: {
      fontWeight: 'bold',
      borderTop: '2px solid #eaeaea',
    },
    actionButton: {
      padding: '8px 16px',
      margin: '0 5px',
      backgroundColor: '#2a5e41',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s',
    },
    actionButtonHover: {
      backgroundColor: '#1e4031',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      fontSize: '16px',
      color: '#757575',
    },
    empty: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      border: '1px dashed #ddd',
      borderRadius: '8px',
      color: '#757575',
      fontSize: '16px',
    },
    footer: {
      marginTop: '20px',
      padding: '20px 0',
      borderTop: '1px solid #eaeaea',
      textAlign: 'center',
      color: '#757575',
      fontSize: '14px',
    },
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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Order Management</h1>
      </div>

      {/* Controls */}
      <div style={styles.controlsContainer}>
        <div>
          <input
            type="text"
            placeholder="Search orders by ID, customer, or email"
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={styles.loading}>Loading orders...</div>
      ) : (
        <div style={styles.ordersContainer}>
          {/* Orders List */}
          <div style={styles.ordersList}>
            {filteredOrders.length > 0 ? (
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
                      key={order.id}
                      style={{
                        ...styles.tableRow,
                        backgroundColor: selectedOrder && selectedOrder.id === order.id ? '#f1f8e9' : 'transparent'
                      }}
                      onClick={() => handleOrderClick(order)}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = selectedOrder && selectedOrder.id === order.id ? '#f1f8e9' : '#f5f5f5'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = selectedOrder && selectedOrder.id === order.id ? '#f1f8e9' : 'transparent'}
                    >
                      <td style={styles.tableCell}>{order.id}</td>
                      <td style={styles.tableCell}>{order.customer}</td>
                      <td style={styles.tableCell}>{formatDate(order.date)}</td>
                      <td style={styles.tableCell}>{formatCurrency(order.total)}</td>
                      <td style={styles.tableCell}>
                        <span style={styles.statusCell(order.status)}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={styles.empty}>No orders found matching your criteria.</div>
            )}
          </div>

          {/* Order Details */}
          <div style={styles.detailsContainer}>
            {selectedOrder ? (
              <div style={styles.orderDetailsCard}>
                <div style={styles.orderDetailsHeader}>
                  <h2 style={styles.orderDetailsTitle}>Order {selectedOrder.id}</h2>
                  <div style={styles.orderStatus}>
                    <label>Status:</label>
                    <select
                      style={styles.orderStatusSelect}
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div style={styles.orderInfoGrid}>
                  {/* Customer Information */}
                  <div style={styles.orderInfoSection}>
                    <h3 style={styles.sectionTitle}>Customer Information</h3>
                    <p style={styles.infoText}><strong>Name:</strong> {selectedOrder.customer}</p>
                    <p style={styles.infoText}><strong>Email:</strong> {selectedOrder.email}</p>
                    <p style={styles.infoText}><strong>Order Date:</strong> {formatDate(selectedOrder.date)}</p>
                  </div>

                  {/* Payment Information */}
                  <div style={styles.orderInfoSection}>
                    <h3 style={styles.sectionTitle}>Payment Information</h3>
                    <p style={styles.infoText}><strong>Method:</strong> {selectedOrder.payment.method}</p>
                    {selectedOrder.payment.last4 !== 'N/A' && (
                      <p style={styles.infoText}><strong>Card:</strong> **** **** **** {selectedOrder.payment.last4}</p>
                    )}
                    <p style={styles.infoText}><strong>Payment Status:</strong> {selectedOrder.payment.status}</p>
                  </div>

                  {/* Shipping Information */}
                  <div style={styles.orderInfoSection}>
                    <h3 style={styles.sectionTitle}>Shipping Information</h3>
                    <p style={styles.infoText}><strong>Address:</strong> {selectedOrder.shipping.address}</p>
                    <p style={styles.infoText}><strong>City:</strong> {selectedOrder.shipping.city}, {selectedOrder.shipping.state} {selectedOrder.shipping.zip}</p>
                    <p style={styles.infoText}><strong>Method:</strong> {selectedOrder.shipping.method}</p>
                  </div>

                  {/* Order Actions */}
                  <div style={styles.orderInfoSection}>
                    <h3 style={styles.sectionTitle}>Order Actions</h3>
                    <div>
                      <button
                        style={styles.actionButton}
                        onMouseOver={(e) => e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = styles.actionButton.backgroundColor}
                      >
                        Print Invoice
                      </button>
                      <button
                        style={styles.actionButton}
                        onMouseOver={(e) => e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = styles.actionButton.backgroundColor}
                      >
                        Send Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 style={styles.sectionTitle}>Order Items</h3>
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
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id} style={styles.tableRow}>
                          <td style={styles.tableCell}>{item.name}</td>
                          <td style={styles.tableCell}>{item.quantity}</td>
                          <td style={styles.tableCell}>{formatCurrency(item.price)}</td>
                          <td style={styles.tableCell}>{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                      <tr style={styles.tableRow}>
                        <td colSpan="3" style={{...styles.tableCell, textAlign: 'right'}}><strong>Shipping:</strong></td>
                        <td style={styles.tableCell}>{formatCurrency(selectedOrder.shipping.cost)}</td>
                      </tr>
                      <tr style={{...styles.tableRow, ...styles.totalRow}}>
                        <td colSpan="3" style={{...styles.tableCell, textAlign: 'right'}}><strong>Total:</strong></td>
                        <td style={styles.tableCell}>{formatCurrency(selectedOrder.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div style={styles.noOrderSelected}>
                Select an order to view details
              </div>
            )}
          </div>
        </div>
      )}

      <div style={styles.footer}>
        <p>© 2025 Tea Emporium. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminOrders;

