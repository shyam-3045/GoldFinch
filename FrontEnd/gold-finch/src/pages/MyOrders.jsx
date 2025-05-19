import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

const MyOrdersPage = () => {
  const product = useLoaderData();
  console.log(product)
  
  const [orders, setOrders] = useState(product);
  const [selectedOrder, setSelectedOrder] = useState(product[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Enhanced professional color palette
  const colors = {
    primary: '#4f46e5',
    primaryLight: '#ebe9ff',
    secondary: '#f8fafc',
    accent: '#f59e0b',
    success: '#10b981',
    successLight: '#d1fae5',
    processing: '#3b82f6',
    processingLight: '#dbeafe',
    textDark: '#1e293b',
    textMedium: '#475569',
    textLight: '#94a3b8',
    border: '#e2e8f0',
    borderDark: '#cbd5e1',
    white: '#ffffff',
    background: '#f1f5f9',
    cardHover: '#f8fafc',
    shadow: 'rgba(0, 0, 0, 0.05)'
  };

  // Modernized professional styles
  const styles = {
    pageContainer: {
      backgroundColor: colors.background,
      minHeight: 'calc(100vh - 70px)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    innerContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '30px 20px',
    },
    pageHeader: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '32px',
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: '700',
      color: colors.textDark,
      marginBottom: '6px',
      letterSpacing: '-0.025em',
    },
    headerSubtitle: {
      fontSize: '15px',
      color: colors.textMedium,
      marginBottom: '20px',
    },
    tabsContainer: {
      display: 'flex',
      borderBottom: `1px solid ${colors.border}`,
      marginBottom: '24px',
    },
    tab: {
      padding: '10px 16px',
      marginRight: '10px',
      fontSize: '14px',
      fontWeight: '500',
      color: colors.textMedium,
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      transition: 'all 0.2s ease',
    },
    activeTab: {
      color: colors.primary,
      borderBottom: `2px solid ${colors.primary}`,
    },
    contentWrapper: {
      display: 'flex',
      gap: '24px',
      position: 'relative',
    },
    ordersSidebar: {
      width: '350px',
      flexShrink: 0,
      backgroundColor: colors.white,
      borderRadius: '12px',
      boxShadow: `0 1px 3px ${colors.shadow}, 0 1px 2px ${colors.shadow}`,
      overflow: 'hidden',
      height: 'fit-content',
    },
    sidebarHeader: {
      backgroundColor: colors.secondary,
      padding: '16px 20px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sidebarTitle: {
      fontWeight: '600',
      fontSize: '16px',
      color: colors.textDark,
    },
    orderCount: {
      backgroundColor: colors.primaryLight,
      color: colors.primary,
      fontSize: '13px',
      fontWeight: '500',
      padding: '2px 8px',
      borderRadius: '12px',
    },
    ordersList: {
      maxHeight: '600px',
      overflowY: 'auto',
    },
    orderCard: {
      padding: '16px 20px',
      borderBottom: `1px solid ${colors.border}`,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      backgroundColor: colors.white,
    },
    orderCardHover: {
      ':hover': {
        backgroundColor: colors.cardHover,
      }
    },
    selectedOrderCard: {
      backgroundColor: colors.primaryLight,
      borderLeft: `4px solid ${colors.primary}`,
    },
    orderCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    orderNumber: {
      fontWeight: '600',
      fontSize: '15px',
      color: colors.textDark,
    },
    orderDate: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '13px',
      color: colors.textMedium,
      marginBottom: '6px',
    },
    orderDateIcon: {
      marginRight: '5px',
      fontSize: '13px',
    },
    orderProductCount: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '13px',
      color: colors.textMedium,
    },
    orderProductIcon: {
      marginRight: '5px',
      fontSize: '13px',
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
    },
    processingStatus: {
      backgroundColor: colors.processingLight,
      color: colors.processing,
    },
    deliveredStatus: {
      backgroundColor: colors.successLight,
      color: colors.success,
    },
    orderDetails: {
      flex: '1',
      backgroundColor: colors.white,
      borderRadius: '12px',
      boxShadow: `0 1px 3px ${colors.shadow}, 0 1px 2px ${colors.shadow}`,
      padding: '0',
      overflow: 'hidden',
    },
    detailsHeader: {
      backgroundColor: colors.white,
      padding: '24px 30px',
      borderBottom: `1px solid ${colors.border}`,
    },
    detailsHeaderTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px',
    },
    detailsHeaderId: {
      fontSize: '20px',
      fontWeight: '600',
      color: colors.textDark,
      marginBottom: '4px',
    },
    detailsMeta: {
      display: 'flex',
      gap: '24px',
      fontSize: '14px',
      color: colors.textMedium,
    },
    detailsMetaItem: {
      display: 'flex',
      alignItems: 'center',
    },
    detailsMetaIcon: {
      marginRight: '6px',
      fontSize: '16px',
      opacity: '0.8',
    },
    detailsContent: {
      padding: '24px 30px',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: colors.textDark,
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
    },
    sectionIcon: {
      marginRight: '8px',
      fontSize: '18px',
      color: colors.primary,
    },
    deliveryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '36px',
    },
    deliveryCard: {
      backgroundColor: colors.secondary,
      padding: '16px',
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
    },
    deliveryLabel: {
      color: colors.textMedium,
      fontSize: '13px',
      marginBottom: '6px',
      fontWeight: '500',
    },
    deliveryValue: {
      color: colors.textDark,
      fontSize: '15px',
      fontWeight: '500',
    },
    productSection: {
      marginBottom: '36px',
    },
    productSummary: {
      backgroundColor: colors.secondary,
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px',
      border: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    productSummaryText: {
      color: colors.textDark,
      fontSize: '15px',
      fontWeight: '500',
    },
    productSummaryCount: {
      backgroundColor: colors.primaryLight,
      color: colors.primary,
      fontSize: '13px',
      fontWeight: '500',
      padding: '2px 8px',
      borderRadius: '12px',
    },
    productTable: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      borderRadius: '8px',
      overflow: 'hidden',
      border: `1px solid ${colors.border}`,
    },
    tableHeader: {
      backgroundColor: colors.secondary,
      padding: '14px 20px',
      fontWeight: '600',
      fontSize: '14px',
      color: colors.textDark,
      textAlign: 'left',
      borderBottom: `1px solid ${colors.border}`,
    },
    tableHeaderCell: {
      padding: '14px 20px',
      fontWeight: '600',
      fontSize: '14px',
      color: colors.textDark,
      textAlign: 'left',
      borderBottom: `1px solid ${colors.border}`,
    },
    tableCell: {
      padding: '14px 20px',
      fontSize: '14px',
      color: colors.textMedium,
      borderBottom: `1px solid ${colors.border}`,
    },
    nothingSelectedContainer: {
      textAlign: 'center',
      padding: '80px 20px',
      color: colors.textMedium,
    },
    nothingSelectedIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      color: colors.textLight,
    },
    nothingSelectedTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px',
      color: colors.textDark,
    },
    nothingSelectedText: {
      fontSize: '15px',
      maxWidth: '400px',
      margin: '0 auto',
    },
    mobileMenuButton: {
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      backgroundColor: colors.white,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '500', 
      color: colors.textDark,
      cursor: 'pointer',
      marginBottom: '16px',
      boxShadow: `0 1px 2px ${colors.shadow}`,
    },
    mobileMenuIcon: {
      fontSize: '18px',
    },
    mobileOrdersList: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '85%',
      height: '100%',
      backgroundColor: colors.white,
      zIndex: 1000,
      transform: 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
      boxShadow: `4px 0 8px ${colors.shadow}`,
      overflowY: 'auto',
    },
    mobileOrdersListOpen: {
      transform: 'translateX(0)',
    },
    mobileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      borderBottom: `1px solid ${colors.border}`,
      backgroundColor: colors.secondary,
    },
    mobileHeaderTitle: {
      fontWeight: '600',
      fontSize: '16px',
      color: colors.textDark,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: colors.textMedium,
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 999,
      display: 'none',
    },
    overlayVisible: {
      display: 'block',
    },
    noOrderMessage: {
      textAlign: 'center',
      padding: '40px 20px',
      color: colors.textMedium,
      fontSize: '15px',
    },
    orderByContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    orderByLabel: {
      fontSize: '14px',
      color: colors.textMedium,
      fontWeight: '500',
    },
    orderBySelect: {
      backgroundColor: colors.white,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      padding: '6px 12px',
      fontSize: '14px',
      color: colors.textDark,
      cursor: 'pointer',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
    },
    emptyStateIcon: {
      fontSize: '40px',
      color: colors.textLight,
      marginBottom: '16px',
    },
    emptyStateTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: colors.textDark,
      marginBottom: '8px',
    },
    emptyStateMessage: {
      fontSize: '15px',
      color: colors.textMedium,
      maxWidth: '400px',
      margin: '0 auto',
    },
    progressContainer: {
      marginBottom: '36px',
    },
    progressSteps: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      marginTop: '30px',
    },
    progressLine: {
      position: 'absolute',
      top: '24px',
      left: '10%',
      right: '10%',
      height: '2px',
      backgroundColor: colors.border,
      zIndex: 0,
    },
    progressLineActive: {
      position: 'absolute',
      top: '24px',
      left: '10%',
      width: '50%',
      height: '2px',
      backgroundColor: colors.primary,
      zIndex: 1,
    },
    progressStep: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
    },
    progressCircle: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: colors.white,
      border: `2px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '10px',
      color: colors.textMedium,
      fontSize: '20px',
    },
    progressCircleActive: {
      backgroundColor: colors.primaryLight,
      border: `2px solid ${colors.primary}`,
      color: colors.primary,
    },
    progressCircleCompleted: {
      backgroundColor: colors.primary,
      border: `2px solid ${colors.primary}`,
      color: colors.white,
    },
    progressLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: colors.textMedium,
      marginTop: '6px',
    },
    progressLabelActive: {
      color: colors.primary,
      fontWeight: '600',
    },
    progressDate: {
      fontSize: '12px',
      color: colors.textLight,
      marginTop: '4px',
    },
    // Media queries for responsive design
    '@media (max-width: 768px)': {
      contentWrapper: {
        flexDirection: 'column',
      },
      ordersSidebar: {
        display: 'none',
      },
      orderDetails: {
        width: '100%',
      },
      mobileMenuButton: {
        display: 'flex',
      },
      deliveryGrid: {
        gridTemplateColumns: '1fr',
      },
    }
  };

  // Apply media queries manually since we're using inline styles
  const applyMediaQueries = () => {
    const isMobile = window.innerWidth <= 768;
    
    return {
      contentWrapper: {
        ...styles.contentWrapper,
        ...(isMobile && { flexDirection: 'column' }),
      },
      ordersSidebar: {
        ...styles.ordersSidebar,
        ...(isMobile && { display: 'none' }),
      },
      orderDetails: {
        ...styles.orderDetails,
        ...(isMobile && { width: '100%' }),
      },
      mobileMenuButton: {
        ...styles.mobileMenuButton,
        ...(isMobile && { display: 'flex' }),
      },
      deliveryGrid: {
        ...styles.deliveryGrid,
        ...(isMobile && { gridTemplateColumns: '1fr' }),
      },
    };
  };

  const responsiveStyles = applyMediaQueries();

  const OrderListItem = ({ order, isSelected }) => (
    <div 
      style={{
        ...styles.orderCard,
        ...(isSelected ? styles.selectedOrderCard : {})
      }}
      onClick={() => {
        setSelectedOrder(order);
        setIsMobileMenuOpen(false);
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = colors.cardHover;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = colors.white;
        }
      }}
    >
      <div style={styles.orderCardHeader}>
        <span style={styles.orderNumber}>Order #{order._id.slice(-6)}</span>
        <span 
          style={{
            ...styles.statusBadge,
            ...(order.orderStatus === 'Processing' ? styles.processingStatus : styles.deliveredStatus)
          }}
        >
          {order.orderStatus}
        </span>
      </div>
      <div style={styles.orderDate}>
        <span style={styles.orderDateIcon}>📅</span>
        {new Date(order.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </div>
      <div style={styles.orderProductCount}>
        <span style={styles.orderProductIcon}>📦</span>
        {order.products.length} {order.products.length === 1 ? 'product' : 'products'}
      </div>
    </div>
  );

  const NoOrderSelected = () => (
    <div style={styles.nothingSelectedContainer}>
      <div style={styles.nothingSelectedIcon}>📋</div>
      <h3 style={styles.nothingSelectedTitle}>No Order Selected</h3>
      <p style={styles.nothingSelectedText}>
        Please select an order from the list to view its details.
      </p>
    </div>
  );

  const OrderProgress = ({ status }) => {
    const isProcessing = status === 'Processing';
    const isShipped = status === 'Shipped' || status === 'Delivered';
    const isDelivered = status === 'Delivered';
    
    return (
      <div style={styles.progressContainer}>
        <h3 style={styles.sectionTitle}>
          <span style={styles.sectionIcon}>🚚</span>
          Order Progress
        </h3>
        <div style={styles.progressSteps}>
          <div style={styles.progressLine}></div>
          <div style={{
            ...styles.progressLineActive,
            width: isProcessing ? '0%' : isShipped ? '50%' : '100%',
          }}></div>
          
          {/* Processing Step */}
          <div style={styles.progressStep}>
            <div style={{
              ...styles.progressCircle,
              ...styles.progressCircleCompleted,
            }}>
              ✓
            </div>
            <div style={{
              ...styles.progressLabel,
              ...styles.progressLabelActive,
            }}>Ordered</div>
            <div style={styles.progressDate}>
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
          
          {/* Shipped Step */}
          <div style={styles.progressStep}>
            <div style={{
              ...styles.progressCircle,
              ...(isShipped || isDelivered ? styles.progressCircleCompleted : 
                 isProcessing ? styles.progressCircleActive : {}),
            }}>
              {isShipped || isDelivered ? '✓' : '📦'}
            </div>
            <div style={{
              ...styles.progressLabel,
              ...(isShipped || isDelivered ? styles.progressLabelActive : {}),
            }}>Shipped</div>
            <div style={styles.progressDate}>
              {isShipped || isDelivered ? new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              }) : '-'}
            </div>
          </div>
          
          {/* Delivered Step */}
          <div style={styles.progressStep}>
            <div style={{
              ...styles.progressCircle,
              ...(isDelivered ? styles.progressCircleCompleted : {}),
            }}>
              {isDelivered ? '✓' : '🏠'}
            </div>
            <div style={{
              ...styles.progressLabel,
              ...(isDelivered ? styles.progressLabelActive : {}),
            }}>Delivered</div>
            <div style={styles.progressDate}>
              {isDelivered ? new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              }) : '-'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OrderDetailsView = ({ order }) => {
    if (!order) return <NoOrderSelected />;

    return (
      <>
        <div style={styles.detailsHeader}>
          <div style={styles.detailsHeaderTop}>
            <div>
              <h2 style={styles.detailsHeaderId}>Order #{order._id.slice(-6)}</h2>
              <div style={styles.detailsMeta}>
                <div style={styles.detailsMetaItem}>
                  <span style={styles.detailsMetaIcon}>📅</span>
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div style={styles.detailsMetaItem}>
                  <span style={styles.detailsMetaIcon}>📦</span>
                  {order.products.length} {order.products.length === 1 ? 'product' : 'products'}
                </div>
              </div>
            </div>
            <span 
              style={{
                ...styles.statusBadge,
                ...(order.orderStatus === 'Processing' ||"cancelled" ? styles.processingStatus : styles.deliveredStatus)
              }}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>

        <div style={styles.detailsContent}>
          <OrderProgress status={order.orderStatus} />

          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>📍</span>
            Delivery Details
          </h3>
          <div style={responsiveStyles.deliveryGrid}>
            <div style={styles.deliveryCard}>
              <div style={styles.deliveryLabel}>Address</div>
              <div style={styles.deliveryValue}>{order.deliveryDetails.address}</div>
            </div>
            <div style={styles.deliveryCard}>
              <div style={styles.deliveryLabel}>City</div>
              <div style={styles.deliveryValue}>{order.deliveryDetails.city}</div>
            </div>
            <div style={styles.deliveryCard}>
              <div style={styles.deliveryLabel}>State</div>
              <div style={styles.deliveryValue}>{order.deliveryDetails.state}</div>
            </div>
            <div style={styles.deliveryCard}>
              <div style={styles.deliveryLabel}>Pincode</div>
              <div style={styles.deliveryValue}>{order.deliveryDetails.pincode}</div>
            </div>
            <div style={styles.deliveryCard}>
              <div style={styles.deliveryLabel}>Mobile</div>
              <div style={styles.deliveryValue}>{order.deliveryDetails.mobile}</div>
            </div>
            <div style={styles.deliveryCard}>
              <div style={styles.deliveryLabel}>Country</div>
              <div style={styles.deliveryValue}>{order.deliveryDetails.country}</div>
            </div>
          </div>

          <div style={styles.productSection}>
            <h3 style={styles.sectionTitle}>
              <span style={styles.sectionIcon}>🛍️</span>
              Products
            </h3>
            
            <div style={styles.productSummary}>
              <span style={styles.productSummaryText}>Order Items</span>
              <span style={styles.productSummaryCount}>{order.products.length}</span>
            </div>
            
            <table style={styles.productTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeaderCell}>Product Name</th>
                  <th style={styles.tableHeaderCell}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{product.product.name}</td>
                    <td style={styles.tableCell}>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* We could add more sections here like payment information, etc. */}
        </div>
      </>
    );
  };

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'processing') return order.orderStatus === 'Processing';
    if (activeTab === 'delivered') return order.orderStatus === 'Delivered';
    return true;
  });

  // Add window resize listener for responsive design
  useEffect(() => {
    const handleResize = () => {
      // Force re-render on window resize
      setOrders([...orders]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [orders]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.innerContainer}>
        <div style={styles.pageHeader}>
          <h1 style={styles.headerTitle}>My Orders</h1>
          <p style={styles.headerSubtitle}>
            Track and manage all your orders in one place
          </p>
          
          <div style={styles.tabsContainer}>
            <div 
              style={{
                ...styles.tab,
                ...(activeTab === 'all' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('all')}
            >
              All Orders
            </div>
            <div 
              style={{
                ...styles.tab,
                ...(activeTab === 'processing' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('processing')}
            >
              Processing
            </div>
            <div 
              style={{
                ...styles.tab,
                ...(activeTab === 'delivered' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('delivered')}
            >
              Delivered
            </div>
          </div>
        </div>

        <button 
          style={responsiveStyles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span style={styles.mobileMenuIcon}>☰</span>
          View Orders List
        </button>

        <div style={responsiveStyles.contentWrapper}>
          {/* Desktop Order List */}
          <div style={responsiveStyles.ordersSidebar}>
            <div style={styles.sidebarHeader}>
              <span style={styles.sidebarTitle}>Your Orders</span>
              <span style={styles.orderCount}>{filteredOrders.length}</span>
            </div>
            
            <div style={styles.ordersList}>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderListItem 
                    key={order._id} 
                    order={order} 
                    isSelected={selectedOrder?._id === order._id}
                  />
                ))
              ) : (
                <div style={styles.noOrderMessage}>
                  No {activeTab !== 'all' ? activeTab : ''} orders found
                </div>
              )}
            </div>
          </div>

          {/* Mobile Order List (Slide-in Menu) */}
          <div 
            style={{
              ...styles.mobileOrdersList,
              ...(isMobileMenuOpen ? styles.mobileOrdersListOpen : {})
            }}
          >
            <div style={styles.mobileHeader}>
              <span style={styles.mobileHeaderTitle}>Your Orders</span>
              <button 
                style={styles.closeButton}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div style={styles.ordersList}>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderListItem 
                    key={order._id} 
                    order={order} 
                    isSelected={selectedOrder?._id === order._id}
                  />
                ))
              ) : (
                <div style={styles.noOrderMessage}>
                  No {activeTab !== 'all' ? activeTab : ''} orders found
                </div>
              )}
            </div>
          </div>

          {/* Order Details Panel */}
          <div style={responsiveStyles.orderDetails}>
            <OrderDetailsView order={selectedOrder} />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div 
        style={{
          ...styles.overlay,
          ...(isMobileMenuOpen ? styles.overlayVisible : {})
        }}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};

export default MyOrdersPage;