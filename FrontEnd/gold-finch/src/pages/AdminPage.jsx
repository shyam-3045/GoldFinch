import React, { useState, useEffect } from 'react';
import AdminOrders from "./AdminOrders"
import { useLoaderData } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// AdminDashboard component
const AdminDashboard = () => {

  const getOrders=async()=>
  {
      const { ordersDet }= await useAuth()
      return ordersDet
  }
  const Orders= getOrders()

  console.log("render")
  console.log(Orders)
  const user=useLoaderData()
  // State for active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0
  });
  
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  
  // Product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: ''
  });
  
  // Fetch data on component mount
  useEffect(() => {
    // Simulate API calls
    fetchStats();
    fetchUsers();
    fetchProducts();
  }, []);
  
  // Mock API calls
  const fetchStats = () => {
    // In a real application, this would be an API call
    setTimeout(() => {
      setStats({
        totalUsers: 245,
        totalOrders: 1023,
        deliveredOrders: 856,
        totalRevenue: 45890
      });
    }, 500);
  };
  
  const fetchUsers = () => {
    // Simulated user data
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', orders: 12, totalSpent: 560 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 8, totalSpent: 320 },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', orders: 5, totalSpent: 210 },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', orders: 15, totalSpent: 780 },
        { id: 5, name: 'Michael Brown', email: 'michael@example.com', orders: 3, totalSpent: 150 }
      ]);
    }, 500);
  };
  
  const fetchProducts = () => {
    // Simulated product data
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Green Tea', category: 'Herbal', price: 12.99, stock: 45 },
        { id: 2, name: 'Earl Grey', category: 'Black Tea', price: 10.99, stock: 30 },
        { id: 3, name: 'Chamomile', category: 'Herbal', price: 9.99, stock: 20 },
        { id: 4, name: 'Jasmine', category: 'Green Tea', price: 14.99, stock: 15 }
      ]);
    }, 500);
  };
  
  // Handle new product submission
  const handleProductSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call to save the product
    alert('Product saved successfully!');
    // Then add to local state
    const productWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, productWithId]);
    // Reset form
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
      stock: ''
    });
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };
  
  // Render dashboard stats
  const renderDashboard = () => (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.sectionTitle}>Dashboard Overview</h2>
      
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>Total Users</h3>
          <p style={styles.statNumber}>{user.length}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Orders</h3>
          <p style={styles.statNumber}>{Orders.length }</p>
        </div>
        <div style={styles.statCard}>
          <h3>Delivered Orders</h3>
          <p style={styles.statNumber}>{stats.deliveredOrders}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Total Revenue</h3>
          <p style={styles.statNumber}>${stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
      
      <h3 style={styles.subSectionTitle}>Recent Users</h3>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Orders</th>
              <th style={styles.tableHeader}>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={styles.tableCell}>{user.id}</td>
                <td style={styles.tableCell}>{user.name}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>{user.orders}</td>
                <td style={styles.tableCell}>${user.totalSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3 style={styles.subSectionTitle}>Recent Products</h3>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Category</th>
              <th style={styles.tableHeader}>Price</th>
              <th style={styles.tableHeader}>Stock</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Render users management tab
  const renderUsers = () => (
    <div style={styles.tabContent}>
      <h2 style={styles.sectionTitle}>User Management</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Orders</th>
              <th style={styles.tableHeader}>Total Spent</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={styles.tableCell}>{user.id}</td>
                <td style={styles.tableCell}>{user.name}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>{user.orders}</td>
                <td style={styles.tableCell}>${user.totalSpent}</td>
                <td style={styles.tableCell}>
                  <button style={styles.actionButton}>View</button>
                  <button style={styles.actionButton}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Render orders tab (using your component)
  const renderOrders = () => (
    <div style={styles.tabContent}>
      <h2 style={styles.sectionTitle}>Orders Management</h2>
      {/* Here we're including your AdminOrders component as requested */}
      <AdminOrders/>
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
        
        <div style={styles.formRow}>
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
        
        <div style={styles.formRow}>
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
                  <button style={styles.actionButton}>Edit</button>
                  <button style={{...styles.actionButton, backgroundColor: '#f44336'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              src="https://via.placeholder.com/150" 
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
            <div style={styles.formRow}>
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
            
            <div style={styles.formRow}>
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

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Gold Finch Admin</h2>
        </div>
        <ul style={styles.sidebarMenu}>
          <li 
            style={activeTab === 'dashboard' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </li>
          <li 
            style={activeTab === 'users' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => setActiveTab('users')}
          >
            Users
          </li>
          <li 
            style={activeTab === 'orders' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </li>
          <li 
            style={activeTab === 'addProduct' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => setActiveTab('addProduct')}
          >
            Products
          </li>
          <li 
            style={activeTab === 'profile' ? {...styles.sidebarItem, ...styles.activeItem} : styles.sidebarItem}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </li>
        </ul>
        <div style={styles.sidebarFooter}>
          <button style={styles.logoutButton}>Logout</button>
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.mainContent}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// AdminOrders component placeholder (you mentioned you have this component)

// Styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    padding: '20px',
    borderBottom: '1px solid #34495e',
  },
  sidebarTitle: {
    margin: 0,
    fontSize: '20px',
  },
  sidebarMenu: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  sidebarItem: {
    padding: '15px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #34495e',
    transition: 'background-color 0.3s',
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
  },
  topbar: {
    height: '60px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  mainContent: {
    padding: '20px',
    overflowY: 'auto',
    flexGrow: 1,
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
    minWidth: '200px',
    flex: '1 1 200px',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0 0 0',
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    color: '#2c3e50',
  },
  subSectionTitle: {
    margin: '20px 0 10px 0',
    color: '#2c3e50',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeader: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
  },
  tableCell: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
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
  },
  formRow: {
    display: 'flex',
    gap: '15px',
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
  },
  textarea: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    minHeight: '100px',
    resize: 'vertical',
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
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  profileHeader: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  profileImage: {
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