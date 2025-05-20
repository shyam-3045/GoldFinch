import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OtpModel from "./OtpModel";
import { giveOredr } from '../context/Order';

export default function PaymentConfirmationPage() {
  const { setDetails } = giveOredr();
  const [isAddress, setIsAddress] = useState(false);
  const [add, setAdd] = useState("");
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get user data from localStorage
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  
  // Form state
  const [formData, setFormData] = useState({
    address: '',
    pincode: '',
    mobile: '',
    city: '',
    state: '',
    country: 'India',
    isDefault: false
  });
  
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('address'); // 'address' or 'payment'
  
  // Get location state for order details
  const location = useLocation();
  let { checkoutItems, subtotal, shipping, tax, total } = location.state || {};
  tax = Number(tax.toFixed(2));
  
  // Load default address if available
  useEffect(() => {
    const deliveryAddress = user.deliveryDetails.find(el => el.isDefault === true);
    if (deliveryAddress) {
      setIsAddress(deliveryAddress);
      setAdd(deliveryAddress);
      setFormData({
        address: deliveryAddress.address || '',
        pincode: deliveryAddress.pincode || '',
        mobile: deliveryAddress.mobile || '',
        city: deliveryAddress.city || '',
        state: deliveryAddress.state || '',
        country: 'India',
        isDefault: true
      });
    }
  }, []);
  
  // Indian states list
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  // Cities by state for dropdown
  const citiesByState = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belgaum'],
    'Tamil Nadu': [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
      'Tirunelveli', 'Tiruppur', 'Vellore', 'Thoothukudi', 'Erode',
      'Dindigul', 'Thanjavur', 'Karur', 'Nagercoil', 'Kanchipuram',
      'Kumbakonam', 'Cuddalore', 'Ambur', 'Hosur', 'Rajapalayam'
    ],
    'Delhi': ['New Delhi', 'Delhi', 'Noida', 'Gurgaon', 'Faridabad'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Reset city if state changes
    if (name === 'state') {
      setFormData(prev => ({
        ...prev,
        city: ''
      }));
    }
  };

  // Address validation function
  function isValidAddress(address) {
    if (!address || typeof address !== "string") return false;

    const minLength = 10;
    const keywords = ["road", "complex", "near", "school", "street", "avenue", "lane", "sector", "plot", "area"];

    const hasEnoughLength = address.length >= minLength;
    const hasNumber = /\d/.test(address); // Check for at least one digit
    const hasKeyword = keywords.some(keyword => address.toLowerCase().includes(keyword));

    return hasEnoughLength && hasNumber && hasKeyword;
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Address validation
    if (!isValidAddress(formData.address)) {
      newErrors.address = 'Please enter a complete address with house number and street name';
    }
    
    // Pincode validation
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    // State validation
    if (!formData.state) {
      newErrors.state = 'Please select a state';
    }
    
    // City validation
    if (!formData.city) {
      newErrors.city = 'Please select a city';
    }

    return newErrors;
  };

  // Form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }
    
    if (!isSubmitting) {
      const res = await setDetails(
        formData.address, 
        formData.city, 
        formData.state, 
        formData.mobile, 
        formData.pincode,  
        formData.isDefault
      );

      if (res) {
        setIsOpen(true);
        setIsSubmitting(true);
      }
    }
  };
  
  // Available cities based on selected state
  const availableCities = formData.state ? (citiesByState[formData.state] || []) : [];

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Progress indicator for checkout process
  const ProgressIndicator = () => (
    <div style={styles.progressContainer}>
      <div style={styles.progressStep}>
        <div style={{
          ...styles.progressCircle,
          backgroundColor: '#4a90e2',
          color: '#fff'
        }}>1</div>
        <div style={styles.progressLabel}>Cart</div>
      </div>
      <div style={styles.progressLine}></div>
      <div style={styles.progressStep}>
        <div style={{
          ...styles.progressCircle,
          backgroundColor: activeSection === 'address' || activeSection === 'payment' ? '#4a90e2' : '#e0e0e0',
          color: activeSection === 'address' || activeSection === 'payment' ? '#fff' : '#666'
        }}>2</div>
        <div style={styles.progressLabel}>Address</div>
      </div>
      <div style={styles.progressLine}></div>
      <div style={styles.progressStep}>
        <div style={{
          ...styles.progressCircle,
          backgroundColor: activeSection === 'payment' ? '#4a90e2' : '#e0e0e0',
          color: activeSection === 'payment' ? '#fff' : '#666'
        }}>3</div>
        <div style={styles.progressLabel}>Payment</div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Checkout</h1>
        <ProgressIndicator />
      </div>
      
      <div style={styles.mainContent}>
        <div style={styles.leftPanel}>
          {/* Address Form */}
          <div style={styles.formContainer}>
            <h2 style={styles.sectionTitle}>Delivery Address</h2>
            
            {user.deliveryDetails && user.deliveryDetails.length > 0 && (
              <div style={styles.savedAddresses}>
                <h3 style={styles.subsectionTitle}>Saved Addresses</h3>
                {user.deliveryDetails.map((addr, index) => (
                  <div 
                    key={index} 
                    style={{
                      ...styles.savedAddress,
                      border: add === addr ? '2px solid #4a90e2' : '1px solid #ddd'
                    }}
                    onClick={() => {
                      setAdd(addr);
                      setFormData({
                        address: addr.address || '',
                        pincode: addr.pincode || '',
                        mobile: addr.mobile || '',
                        city: addr.city || '',
                        state: addr.state || '',
                        country: 'India',
                        isDefault: addr.isDefault || false
                      });
                    }}
                  >
                    <div style={styles.addressDetails}>
                      <p style={styles.addressText}>{addr.address}</p>
                      <p style={styles.addressSubtext}>{addr.city}, {addr.state}, {addr.pincode}</p>
                      <p style={styles.addressSubtext}>Mobile: {addr.mobile}</p>
                    </div>
                    {addr.isDefault && (
                      <div style={styles.defaultBadge}>Default</div>
                    )}
                  </div>
                ))}
                <div style={styles.divider}></div>
                <h3 style={styles.subsectionTitle}>Add New Address</h3>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Complete Address *</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{
                    ...styles.input, 
                    ...styles.textarea, 
                    ...(errors.address ? styles.inputError : {})
                  }}
                  placeholder="Flat / House No., Floor, Building, Street, Area"
                />
                {errors.address && <span style={styles.errorText}>{errors.address}</span>}
              </div>
              
              <div style={styles.formRow}>
                <div style={{...styles.formGroup, width: '48%'}}>
                  <label style={styles.label}>State *</label>
                  <select 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    style={{
                      ...styles.input, 
                      ...(errors.state ? styles.inputError : {})
                    }}
                  >
                    <option value="">Select State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <span style={styles.errorText}>{errors.state}</span>}
                </div>
                
                <div style={{...styles.formGroup, width: '48%'}}>
                  <label style={styles.label}>City *</label>
                  <select 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      ...(errors.city ? styles.inputError : {})
                    }}
                    disabled={!formData.state}
                  >
                    <option value="">Select City</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                  {errors.city && <span style={styles.errorText}>{errors.city}</span>}
                </div>
              </div>
              
              <div style={styles.formRow}>
                <div style={{...styles.formGroup, width: '48%'}}>
                  <label style={styles.label}>Pincode *</label>
                  <input 
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    style={{
                      ...styles.input, 
                      ...(errors.pincode ? styles.inputError : {})
                    }}
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />
                  {errors.pincode && <span style={styles.errorText}>{errors.pincode}</span>}
                </div>
                
                <div style={{...styles.formGroup, width: '48%'}}>
                  <label style={styles.label}>Mobile Number *</label>
                  <input 
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    style={{
                      ...styles.input, 
                      ...(errors.mobile ? styles.inputError : {})
                    }}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                  />
                  {errors.mobile && <span style={styles.errorText}>{errors.mobile}</span>}
                </div>
              </div>
              
              
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Country</label>
                <input 
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  style={{...styles.input, ...styles.disabledInput}}
                  disabled
                />
              </div>
              
              <div style={styles.formGroup}>
                <div style={styles.checkboxContainer}>
                  <input 
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    style={styles.checkbox}
                  />
                  <label htmlFor="isDefault" style={styles.checkboxLabel}>
                    Set as default delivery address
                  </label>
                </div>
              </div>
              
              <div style={styles.formActions}>
                <button 
                  type="submit"
                  style={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div style={styles.rightPanel}>
          <div style={styles.orderSummary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            
            {checkoutItems && checkoutItems.map((item, index) => (
              <div key={index} style={styles.orderItem}>
                <div style={styles.productImage}>
                  <img src={item.product.name === "Assam Delight Tea" ?"Product1-front.jpg":"/"} alt={item.name} style={styles.productImg} />
                </div>
                <div style={styles.productDetails}>
                  <h3 style={styles.productName}>{item.product.name || 'Product Name'}</h3>
                  <p style={styles.productDescription}>{`Category: ${item.product.category}` || 'Product description'}</p>
                  <div style={styles.productMeta}>
                    <span style={styles.productQuantity}>Qty: {item.quantity || 1}</span>
                    <span style={styles.productPrice}>{formatCurrency(item.product.price || 0)}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div style={styles.divider}></div>
            
            <div style={styles.priceSummary}>
              <div style={styles.priceRow}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal || 0)}</span>
              </div>
              <div style={styles.priceRow}>
                <span>Shipping</span>
                <span>{formatCurrency(shipping || 0)}</span>
              </div>
              <div style={styles.priceRow}>
                <span>Tax</span>
                <span>{formatCurrency(tax || 0)}</span>
              </div>
              <div style={styles.divider}></div>
              <div style={{...styles.priceRow, ...styles.totalRow}}>
                <span>Total</span>
                <span>{formatCurrency(total || 0)}</span>
              </div>
            </div>
            
            <div style={styles.secureCheckout}>
              <div style={styles.secureIcon}>🔒</div>
              <p style={styles.secureText}>
                Your transaction is secure. We use industry-standard encryption to protect your data.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* OTP Modal */}
      <OtpModel 
        isOpen={isOpen} 
        total={total} 
        closeModel={() => setIsOpen(false)} 
        token={token} 
        user={user} 
        formData={formData} 
        products={checkoutItems}
      />
    </div>
  );
}

// Improved styles with modern UI elements
const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    backgroundColor: '#f8f9fa',
    margin: 0,
    padding: 0,
    color: '#333',
  },
  
  header: {
    backgroundColor: '#ffffff',
    padding: '20px 5%',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    marginBottom: '30px',
  },
  
  headerTitle: {
    fontSize: '26px',
    fontWeight: '600',
    margin: '0 0 20px 0',
    color: '#2c3e50',
    textAlign: 'center',
  },
  
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '500px',
    margin: '0 auto',
  },
  
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  
  progressCircle: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  
  progressLabel: {
    fontSize: '12px',
    color: '#666',
  },
  
  progressLine: {
    height: '2px',
    backgroundColor: '#e0e0e0',
    flex: 1,
    margin: '0 10px',
    position: 'relative',
    top: '-15px',
    zIndex: 0,
  },
  
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0 5% 50px',
    maxWidth: '1400px',
    margin: '0 auto',
    gap: '30px',
  },
  
  leftPanel: {
    flex: '1 1 600px',
    minWidth: '300px',
  },
  
  rightPanel: {
    flex: '0 1 350px',
    minWidth: '300px',
  },
  
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
  },
  
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    marginTop: 0,
    marginBottom: '25px',
    color: '#2c3e50',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  
  subsectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  
  savedAddresses: {
    marginBottom: '30px',
  },
  
  savedAddress: {
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },
  
  addressDetails: {
    flex: 1,
  },
  
  addressText: {
    fontSize: '14px',
    margin: '0 0 5px 0',
    fontWeight: '500',
  },
  
  addressSubtext: {
    fontSize: '13px',
    color: '#666',
    margin: '3px 0',
  },
  
  defaultBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '3px 8px',
    fontSize: '11px',
    borderRadius: '4px',
  },
  
  formGroup: {
    marginBottom: '20px',
  },
  
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px',
    flexWrap: 'wrap',
  },
  
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#444',
  },
  
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
    outlineColor: '#4a90e2',
  },
  
  textarea: {
    minHeight: '80px',
    resize: 'vertical',
  },
  
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#666',
    cursor: 'not-allowed',
  },
  
  inputError: {
    borderColor: '#e74c3c',
  },
  
  errorText: {
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '5px',
    display: 'block',
  },
  
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  
  checkbox: {
    marginRight: '10px',
    width: '16px',
    height: '16px',
    accentColor: '#4a90e2',
  },
  
  checkboxLabel: {
    fontSize: '14px',
    color: '#444',
  },
  
  formActions: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
  },
  
  submitButton: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '14px 30px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  
  orderSummary: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: '20px',
  },
  
  summaryTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginTop: 0,
    marginBottom: '20px',
    color: '#2c3e50',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  
  orderItem: {
    display: 'flex',
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  
  productImage: {
    width: '70px',
    height: '70px',
    backgroundColor: '#eeeeee',
    borderRadius: '6px',
    marginRight: '15px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  productImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  
  productDetails: {
    flex: '1',
  },
  
  productName: {
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 5px 0',
    color: '#333',
  },
  
  productDescription: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 8px 0',
  },
  
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  productQuantity: {
    fontSize: '13px',
    color: '#666',
  },
  
  productPrice: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
  },
  
  divider: {
    height: '1px',
    backgroundColor: '#eeeeee',
    margin: '15px 0',
  },
  
  priceSummary: {
    marginTop: '10px',
  },
  
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
    fontSize: '14px',
    color: '#555',
  },
  
  totalRow: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#2c3e50',
    marginTop: '5px',
  },
  
  secureCheckout: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f2f7fd',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
  },
  
  secureIcon: {
    fontSize: '20px',
    marginRight: '10px',
  },
  
  secureText: {
    fontSize: '12px',
    color: '#555',
    margin: 0,
    lineHeight: 1.4,
  }
};