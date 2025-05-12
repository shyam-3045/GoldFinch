import React, { useState } from 'react';
import Navbar from '../components/layout/NavBar2';
import Footer from '../components/layout/Footer';
import { useLoaderData, useLocation } from 'react-router-dom';


const MyOrdersPage = () => {
  const product=useLoaderData()
  console.log(product)

  
  const [orders, setOrders] = useState(product);
  const [selectedOrder, setSelectedOrder] = useState(product[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      backgroundColor: '#f4f5f7',
      height: '100vh',
      overflow: 'hidden'
    },
    container: {
      display: 'flex',
      height: '100%',
      position: 'relative'
    },
    navbar: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      padding: '15px 20px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    navTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginLeft: '15px'
    },
    orderList: {
      width: '350px',
      backgroundColor: 'white',
      borderRight: '1px solid #e0e0e0',
      overflowY: 'auto',
      height: 'calc(100vh - 70px)',
      position: 'relative'
    },
    orderListHeader: {
      backgroundColor: '#f8f9fa',
      padding: '15px 20px',
      borderBottom: '1px solid #e0e0e0',
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    orderItem: {
      padding: '15px 20px',
      borderBottom: '1px solid #e0e0e0',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    selectedOrderItem: {
      backgroundColor: '#e6f2ff',
      borderLeft: '4px solid #007bff'
    },
    orderDetails: {
      flex: 1,
      backgroundColor: '#ffffff',
      overflowY: 'auto',
      padding: '20px',
      height: 'calc(100vh - 70px)'
    },
    sectionTitle: {
      borderBottom: '1px solid #e0e0e0',
      paddingBottom: '10px',
      marginBottom: '20px',
      color: '#333',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    detailGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    },
    detailLabel: {
      color: '#666',
      fontSize: '14px'
    },
    detailValue: {
      color: '#333',
      fontWeight: 'bold'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    processingStatus: {
      backgroundColor: '#007bff1a',
      color: '#007bff'
    },
    deliveredStatus: {
      backgroundColor: '#28a7451a',
      color: '#28a745'
    },
    mobileMenuButton: {
      display: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer'
    },
    mobileOrderList: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '80%',
      height: '100%',
      backgroundColor: 'white',
      zIndex: 1000,
      transform: 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out'
    },
    mobileOrderListOpen: {
      transform: 'translateX(0)'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
      display: 'none'
    },
    '@media': {
      '(max-width: 768px)': {
        container: {
          flexDirection: 'column'
        },
        orderList: {
          display: 'none'
        },
        mobileMenuButton: {
          display: 'block'
        },
        orderDetails: {
          width: '100%'
        },
        overlay: {
          display: 'block'
        }
      }
    }
  };

  const OrderListItem = ({ order, isSelected }) => (
    <div 
      style={{
        ...styles.orderItem,
        ...(isSelected ? styles.selectedOrderItem : {})
      }}
      onClick={() => {
        setSelectedOrder(order);
        setIsMobileMenuOpen(false);
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
        <span style={{fontWeight: 'bold'}}>Order #{order._id.slice(-6)}</span>
        <span 
          style={{
            ...styles.statusBadge,
            ...(order.orderStatus === 'Processing' ? styles.processingStatus : styles.deliveredStatus)
          }}
        >
          {order.orderStatus}
        </span>
      </div>
      <div style={{color: '#666'}}>
        <div>Date: {order.createdAt}</div>
        <div>Products: {order.products.length}</div>
      </div>
    </div>
  );

  const OrderDetailsView = ({ order }) => {
    if (!order) return <div>No order selected</div>;

    return (
      <>
        <h2 style={styles.sectionTitle}>Order Details</h2>
        
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
          <div>
            <h3 style={{margin: 0}}>Order #{order._id.slice(-6)}</h3>
            <p style={{margin: '5px 0 0', color: '#666'}}>Order Date: {order.createdAt}</p>
          </div>
          <div>
            <span 
              style={{
                ...styles.statusBadge,
                ...(order.orderStatus === 'Processing' ? styles.processingStatus : styles.deliveredStatus)
              }}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>

        <h3 style={{marginBottom: '15px'}}>Delivery Details</h3>
        <div style={styles.detailGrid}>
          <div>
            <div style={styles.detailLabel}>Address</div>
            <div style={styles.detailValue}>{order.deliveryDetails.address}</div>
          </div>
          <div>
            <div style={styles.detailLabel}>City</div>
            <div style={styles.detailValue}>{order.deliveryDetails.city}</div>
          </div>
          <div>
            <div style={styles.detailLabel}>State</div>
            <div style={styles.detailValue}>{order.deliveryDetails.state}</div>
          </div>
          <div>
            <div style={styles.detailLabel}>Pincode</div>
            <div style={styles.detailValue}>{order.deliveryDetails.pincode}</div>
          </div>
          <div>
            <div style={styles.detailLabel}>Mobile</div>
            <div style={styles.detailValue}>{order.deliveryDetails.mobile}</div>
          </div>
          <div>
            <div style={styles.detailLabel}>Country</div>
            <div style={styles.detailValue}>{order.deliveryDetails.country}</div>
          </div>
        </div>

        <h3 style={{marginTop: '30px', marginBottom: '15px'}}>Products</h3>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: '#f8f9fa'}}>
              <th style={{padding: '10px', textAlign: 'left', borderBottom: '1px solid #e0e0e0'}}>Product ID</th>
              <th style={{padding: '10px', textAlign: 'left', borderBottom: '1px solid #e0e0e0'}}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => (
              <tr key={index}>
                <td style={{padding: '10px', borderBottom: '1px solid #e0e0e0'}}>{product.name}</td>
                <td style={{padding: '10px', borderBottom: '1px solid #e0e0e0'}}>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
    <Navbar/>
      <div style={styles.body}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <button 
          style={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          ☰
        </button>
        <span style={styles.navTitle}>My Orders</span>
      </div>

      {/* Main Container */}
      <div style={styles.container}>
        {/* Order List */}
        <div style={styles.orderList}>
          <div style={styles.orderListHeader}>Orders</div>
          {orders.map((order) => (
            <OrderListItem 
              key={order.id} 
              order={order} 
              isSelected={selectedOrder === order}
            />
          ))}
        </div>

        {/* Mobile Order List */}
        <div 
          style={{
            ...styles.mobileOrderList,
            ...(isMobileMenuOpen ? styles.mobileOrderListOpen : {})
          }}
        >
          <div style={{...styles.orderListHeader, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span>Orders</span>
            <button 
              style={{
                background: 'none', 
                border: 'none', 
                fontSize: '24px', 
                cursor: 'pointer'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ×
            </button>
          </div>
          {orders.map((order) => (
            <OrderListItem 
              key={order.id} 
              order={order} 
              isSelected={selectedOrder === order}
            />
          ))}
        </div>

        {/* Order Details */}
        <div style={styles.orderDetails}>
          <OrderDetailsView order={selectedOrder} />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
    <Footer/>
    </>
    
  );
};

export default MyOrdersPage;