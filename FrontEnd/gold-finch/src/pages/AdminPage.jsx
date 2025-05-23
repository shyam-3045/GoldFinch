import React, { useState, useEffect } from 'react';
import AdminOrders from "./AdminOrders";
import { useLoaderData } from 'react-router-dom';

const AdminDashboard = () => {
  const { users, order } = useLoaderData();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const deliverdItems=order.filter((item)=>
  {
     return item.orderStatus == "Delivered"
  })
  function formatIndianCurrencyFromInt(amount) {
  const strAmount = amount.toString();

  if (strAmount.length <= 2) {
    const paise = strAmount.padStart(2, '0');
    return `₹0.${paise}`;
  }

  const rupees = strAmount.slice(0, -2);
  const paise = strAmount.slice(-2);

  const formattedRupees = new Intl.NumberFormat('en-IN').format(parseInt(rupees));

  return `₹${formattedRupees}.${paise}`;
}
  
  let totalAmount=0
  order.forEach(element => {
    totalAmount+=Number(element.totalAmount)
  });
  const [stats, setStats] = useState({
    totalUsers: users.length,
    totalOrders: order.length,
    deliveredOrders: deliverdItems.length,
    totalRevenue: formatIndianCurrencyFromInt(totalAmount)
  });
  
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: ''
  });
  
  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth > 768 && showMobileSidebar) {
      setShowMobileSidebar(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
    
    window.addEventListener('resize', updateWindowDimensions);
    
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, [showMobileSidebar]);
  
  const fetchProducts = () => {
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Green Tea', category: 'Herbal', price: 12.99, stock: 45 },
        { id: 2, name: 'Earl Grey', category: 'Black Tea', price: 10.99, stock: 30 },
        { id: 3, name: 'Chamomile', category: 'Herbal', price: 9.99, stock: 20 },
        { id: 4, name: 'Jasmine', category: 'Green Tea', price: 14.99, stock: 15 }
      ]);
    }, 500);
  };
  
  const handleProductSubmit = (e) => {
    e.preventDefault();
    alert('Product saved successfully!');
    const productWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, productWithId]);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      stock: ''
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };
  
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    setShowMobileSidebar(false);
  };
  
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };
  
  const renderDashboard = () => (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.sectionTitle}>Dashboard Overview</h2>
      
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>Total Users</h3>
          <p style={styles.statNumber}>{stats.totalUsers}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Orders</h3>
          <p style={styles.statNumber}>{stats.totalOrders}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Delivered Orders</h3>
          <p style={styles.statNumber}>{stats.deliveredOrders}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Revenue</h3>
          <p style={styles.statNumber}>{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
      
      <h3 style={styles.subSectionTitle}>Recent Users</h3>
      <div style={styles.tableContainer}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0,5).map(user => (
                <tr key={user._id}>
                  <td style={styles.tableCell}>{user._id}</td>
                  <td style={styles.tableCell}>{user.name}</td>
                  <td style={styles.tableCell}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  // Render users management tab
  const renderUsers = () => (
    <div style={styles.tabContent}>
      <h2 style={styles.sectionTitle}>User Management</h2>
      <div style={styles.tableContainer}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td style={styles.tableCell}>{user._id}</td>
                  <td style={styles.tableCell}>{user.name}</td>
                  <td style={styles.tableCell}>{user.email}</td>
                  <td style={styles.tableCell}>
                    <button style={styles.actionButton}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  // Render orders tab
  const renderOrders = () => (
    <div style={styles.tabContent}>
      <h2 style={styles.sectionTitle}>Orders Management</h2>
      <AdminOrders order={order}/>
    </div>
  );
  
  // Render add product form
  const renderAddProduct = () => (
    <div style={styles.tabContent}>
      <h2 style={styles.sectionTitle}>Add New Product</h2>
      <form onSubmit={handleProductSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            style={styles.textarea}
            required
          />
        </div>
        
        <div style={styles.formRowResponsive}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Price ($)</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              style={styles.input}
              step="0.01"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              style={styles.input}
              required
            >
              <option value="">Select category</option>
              <option value="Black Tea">Black Tea</option>
              <option value="Green Tea">Green Tea</option>
              <option value="Herbal">Herbal</option>
              <option value="Oolong">Oolong</option>
              <option value="White Tea">White Tea</option>
            </select>
          </div>
        </div>
        
        <div style={styles.formRowResponsive}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
        </div>
        
        <button type="submit" style={styles.submitButton}>
          Add Product
        </button>
      </form>
      
      <h3 style={styles.subSectionTitle}>Current Products</h3>
      <div style={styles.tableContainer}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Category</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Stock</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td style={styles.tableCell}>{product.id}</td>
                  <td style={styles.tableCell}>{product.name}</td>
                  <td style={styles.tableCell}>{product.category}</td>
                  <td style={styles.tableCell}>${product.price}</td>
                  <td style={styles.tableCell}>{product.stock}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtonsContainer}>
                      <button style={styles.actionButton}>Edit</button>
                      <button style={{...styles.actionButton, backgroundColor: '#f44336'}}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  // Render profile tab
  const renderProfile = () => (
    <div style={styles.tabContent}>
      <h2 style={styles.sectionTitle}>Admin Profile</h2>
      <div style={styles.profileContainer}>
        <div style={styles.profileHeader}>
          <div style={styles.profileImage}>
            <img 
              src="/api/placeholder/150/150" 
              alt="Admin profile" 
              style={styles.avatar} 
            />
          </div>
          <div style={styles.profileInfo}>
            <h3>Admin User</h3>
            <p>admin@teapacket.com</p>
            <p>Role: Super Admin</p>
            <p>Last Login: May 17, 2025 12:43 PM</p>
          </div>
        </div>
        
        <div style={styles.profileContent}>
          <h3 style={styles.subSectionTitle}>Account Settings</h3>
          <form style={styles.form}>
            <div style={styles.formRowResponsive}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Admin User" 
                  style={styles.input} 
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@teapacket.com" 
                  style={styles.input} 
                />
              </div>
            </div>
            
            <div style={styles.formRowResponsive}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input 
                  type="password" 
                  defaultValue="********" 
                  style={styles.input} 
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input 
                  type="password" 
                  defaultValue="********" 
                  style={styles.input} 
                />
              </div>
            </div>
            
            <button type="button" style={styles.submitButton}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUsers();
      case 'orders':
        return renderOrders();
      case 'addProduct':
        return renderAddProduct();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  // Determine if we're in mobile view
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024 && windowWidth > 768;

  return (
    <div style={styles.container}>
      {/* Mobile hamburger menu */}
      {isMobile && (
        <div style={styles.mobileMenuToggle} onClick={toggleMobileSidebar}>
          <div style={styles.hamburgerIcon}>
            <div style={styles.hamburgerBar}></div>
            <div style={styles.hamburgerBar}></div>
            <div style={styles.hamburgerBar}></div>
          </div>
          <span style={styles.mobileMenuText}>Gold Finch Admin</span>
        </div>
      )}
      
      {/* Sidebar - will be hidden on mobile unless toggled */}
      <div style={{
        ...styles.sidebar,
        ...(isMobile && {
          transform: showMobileSidebar ? 'translateX(0)' : 'translateX(-100%)',
          position: 'fixed',
          zIndex: 1000,
          height: '100vh'
        })
      }}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Gold Finch Admin</h2>
          {isMobile && (
            <button 
              onClick={toggleMobileSidebar} 
              style={styles.closeSidebarButton}
            >
              ×
            </button>
          )}
        </div>
        <ul style={styles.sidebarMenu}>
          <li 
            style={activeTab === 'dashboard' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => handleTabSelect('dashboard')}
          >
            Dashboard
          </li>
          <li 
            style={activeTab === 'users' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => handleTabSelect('users')}
          >
            Users
          </li>
          <li 
            style={activeTab === 'orders' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => handleTabSelect('orders')}
          >
            Orders
          </li>
          <li 
            style={activeTab === 'addProduct' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => handleTabSelect('addProduct')}
          >
            Products
          </li>
          <li 
            style={activeTab === 'profile' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => handleTabSelect('profile')}
          >
            Profile
          </li>
        </ul>
        <div style={styles.sidebarFooter}>
          <button style={styles.logoutButton}>Logout</button>
        </div>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {showMobileSidebar && isMobile && (
        <div 
          style={styles.sidebarOverlay} 
          onClick={toggleMobileSidebar}
        />
      )}
      
      <div style={styles.content}>
        <div style={styles.mainContent}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
  },
  // Mobile menu toggle
  mobileMenuToggle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px',
    cursor: 'pointer',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  hamburgerIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '22px',
    height: '16px',
    marginRight: '15px',
  },
  hamburgerBar: {
    height: '2px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '2px',
    marginBottom: '4px',
  },
  mobileMenuText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  sidebarOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  closeSidebarButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0',
    fontWeight: 'bold',
    lineHeight: '1',
  },
  sidebar: {
    width: window.innerWidth <= 768 ? '250px' : (window.innerWidth <= 1024 ? '200px' : '250px'),
    backgroundColor: '#2c3e50',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
  },
  sidebarHeader: {
    padding: '20px',
    borderBottom: '1px solid #34495e',
    position: 'relative',
  },
  sidebarTitle: {
    margin: 0,
    fontSize: window.innerWidth <= 1024 ? '16px' : '20px',
  },
  sidebarMenu: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    flexGrow: 1,
    overflowY: 'auto',
  },
  sidebarItem: {
    padding: '15px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #34495e',
    transition: 'background-color 0.3s',
    fontSize: window.innerWidth <= 1024 ? '14px' : '16px',
  },
  activeItem: {
    backgroundColor: '#34495e',
    borderLeft: '4px solid #3498db',
  },
  sidebarFooter: {
    padding: '20px',
    borderTop: '1px solid #34495e',
  },
  logoutButton: {
    padding: '10px',
    width: '100%',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  mainContent: {
    padding: window.innerWidth <= 768 ? '15px' : '20px',
    overflowY: 'auto',
    flexGrow: 1,
    height: '100%',
  },
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  statsContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    minWidth: '140px',
    flex: '1 1 140px',
  },
  statNumber: {
    fontSize: window.innerWidth <= 768 ? '22px' : '28px',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0 0 0',
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    color: '#2c3e50',
    fontSize: window.innerWidth <= 768 ? '20px' : '24px',
  },
  subSectionTitle: {
    margin: '20px 0 10px 0',
    color: '#2c3e50',
    fontSize: window.innerWidth <= 768 ? '18px' : '20px',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: window.innerWidth <= 768 ? '10px' : '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  tableWrapper: {
    overflowX: 'auto',
    width: '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    minWidth: '600px', // Ensures table doesn't get too squished
  },
  tableHeader: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    fontSize: window.innerWidth <= 768 ? '14px' : '16px',
  },
  tableCell: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    fontSize: window.innerWidth <= 768 ? '14px' : '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px',
  },
  actionButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: window.innerWidth <= 768 ? '15px' : '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    flex: 1,
    minWidth: window.innerWidth <= 768 ? '100%' : 'auto',
  },
  formRowResponsive: {
    display: 'flex',
    gap: '15px',
    flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    minHeight: '100px',
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '10px 15px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    alignSelf: 'flex-start',
    marginTop: '10px',
  },
  actionButton: {
    padding: '5px 10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    marginRight: '5px',
    display: 'inline-block',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  profileHeader: {
    display: 'flex',
    flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
    gap: '20px',
    alignItems: window.innerWidth <= 768 ? 'center' : 'flex-start',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: window.innerWidth <= 768 ? 'center' : 'left',
  },
  profileImage: {
    marginBottom: window.innerWidth <= 768 ? '10px' : 0,
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  profileContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};

export default AdminDashboard;