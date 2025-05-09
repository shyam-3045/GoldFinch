import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlertMsg from '../components/common/AltertMsg';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/NavBar2';
import { giveOredr } from '../context/Order';
import axios from "../../axios.config"

    export default function OrderPage() {
        const  {setDetails}=giveOredr()
        const [isopen,setIsOpen]=useState(false)
        const [isAddress,setIsAddress]=useState(false)
        const [add,setAdd]=useState("")
        const token=localStorage.getItem("token")
        


        let user=localStorage.getItem("user")
        user = JSON.parse(user);
        

    useEffect(() => {
        const delivaryAddress = user.deliveryDetails.find(el => el.isDefault === true);
         if (delivaryAddress) {
            setIsAddress(delivaryAddress);
            setAdd(delivaryAddress)
        }
        }, []); 

        console.log()


        const location=useLocation()
        let {checkoutItems,subtotal,shipping,tax,total}=location.state ||{}
        tax = Number(tax.toFixed(2));
        console.log(add)


    const [formData, setFormData] = useState({
        address: '',
        pincode: '',
        mobile: '',
        city: '',
        state: '',
        country: 'India',
        landmark: '',
        isDefault: false
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
        'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
        'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
        'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
    ];

    // Major cities by state for dropdown (simplified for demo)
    const citiesByState = {
        'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
        'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belgaum'],
         'Tamil Nadu' : [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Tiruppur', 'Vellore', 'Thoothukudi', 'Erode',
  'Dindigul', 'Thanjavur', 'Karur', 'Nagercoil', 'Kanchipuram',
  'Kumbakonam', 'Cuddalore', 'Ambur', 'Hosur', 'Rajapalayam',
  'Pudukkottai', 'Nagapattinam', 'Villupuram', 'Perambalur', 'Namakkal',
  'Ariyalur', 'Tiruvannamalai', 'Dharmapuri', 'Sivakasi', 'Theni',
  'Pollachi', 'Tenkasi', 'Ramanathapuram', 'Virudhunagar', 'Gudiyatham',
  'Arakkonam', 'Tambaram', 'Avadi', 'Karaikudi', 'Manapparai', 'Panruti',
  'Tiruchengode', 'Vaniyambadi', 'Udhagamandalam (Ooty)', 'Mettupalayam',
  'Pallavaram', 'Valparai', 'Coonoor', 'Chidambaram', 'Sivagangai'
],

        'Delhi': ['New Delhi', 'Delhi', 'Noida', 'Gurgaon', 'Faridabad'],
        'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
        // Add more as needed, but keeping it limited for this example
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

        // If state changes, reset city
        if (name === 'state') {
        setFormData(prev => ({
            ...prev,
            city: ''
        }));
        }
    };


    function isValidAddress(address) {
    if (!address || typeof address !== "string") return false;

    const minLength = 10;
    const keywords = ["road", "complex", "near", "school", "street", "avenue", "lane", "sector", "plot", "area"];

    const hasEnoughLength = address.length >= minLength;
    const hasNumber = /\d/.test(address); // Check for at least one digit
    const hasKeyword = keywords.some(keyword => address.toLowerCase().includes(keyword));

    return hasEnoughLength && hasNumber && hasKeyword;
}
    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        // Address validation
        if (!isValidAddress(formData.address)) {
        newErrors.address = 'Address is required';
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
        // State validation
        if (!formData.city) {
        newErrors.state = 'Please select a city';
        }


        return newErrors;
    };

    const handlePayment=async (total)=>
    {
        const { data } = await axios.post('http://localhost:3000/api/create-order', {
        amount: total, // Amount in INR
    },{
        headers:
        {
            Authorization:`Bearer ${token}`
        }
    });

    const options = {
        key: "rzp_test_cNG8AXPmxWUyej", // from Razorpay Dashboard
        amount: data.order.amount,
        currency: "INR",
        name: "Goldfinch Teas",
        description: "Tea Order Payment",
        order_id: data.order.id,
        handler: async (response) => {
        const verifyRes = await axios.post("http://localhost:3000/api/verify-payment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        },
        {
            headers:
            {
                Authorization:`Bearer ${token}`
            }
        }
    );

        if (verifyRes.data.success) {
          alert("Payment successful 🎉");
        } else {
          alert("Payment verification failed ❌");
        }
      },
        prefill: {
            name: user.name,
            email: user.email,
            contact: formData.mobile
        },
        theme: {
            color: "#3399cc"
        }
    };
    console.log(data)

    const rzp = new window.Razorpay(options);
    rzp.open();
    }


    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);
        
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        setIsSubmitting(false);
        return;
        }
        
        
        console.log('Form data submitted:', formData);
        
        setTimeout(() => {
        AlertMsg('Address saved successfully! Proceeding to payment...');
        setIsSubmitting(false);
        }, 1500);

        if(!isSubmitting)
        {
            const res= await setDetails(formData.address, formData.city, formData.state, formData.mobile, formData.pincode, formData.landmark, formData.isDefault)
            if(res)
            {
                setIsOpen(true)
                handlePayment(total)
                setIsSubmitting(true)

            }
        }

    };
    
    // Available cities based on selected state
    const availableCities = formData.state ? (citiesByState[formData.state] || []) : [];

    return (
        <>
        <Navbar/>
        <div style={styles.container}>
        <div style={styles.orderContainer}>
            <div style={styles.leftPanel}>
            <div style={styles.orderSummary}>
                <h2 style={styles.panelTitle}>Order Summary</h2>
                <div style={styles.orderItem}>
                <div style={styles.productImage}></div>
                <div style={styles.productDetails}>
                    <h3 style={styles.productName}>Product Name</h3>
                    <p style={styles.productDescription}>Brief product description here</p>
                    <p style={styles.productPrice}>₹{subtotal}</p>
                </div>
                </div>
                <div style={styles.divider}></div>
                <div style={styles.priceSummary}>
                <div style={styles.priceRow}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>
                <div style={styles.priceRow}>
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                </div>
                <div style={styles.priceRow}>
                    <span>Tax</span>
                    <span>₹{tax}</span>
                </div>
                <div style={styles.divider}></div>
                <div style={{...styles.priceRow, ...styles.totalRow}}>
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
                </div>
            </div>
            </div>
            
            <div style={styles.rightPanel}>
            <div style={styles.checkoutForm}>
                <h2 style={styles.formTitle}>Delivery Address</h2>
                <div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Address *</label>
                    <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{...styles.input, ...styles.textarea, ...(errors.address ? styles.inputError : {})}}
                    placeholder="Enter your full address"
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
                        style={{...styles.input, ...(errors.state ? styles.inputError : {})}}
                    >
                        <option value="">Select State</option>
                        {indianStates.map((state) => (
                        <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    {errors.state && <span style={styles.errorText}>{errors.state}</span>}
                    </div>
                    
                    <div style={{...styles.formGroup, width: '48%'}}>
                    <label style={styles.label}>City</label>
                    <select 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        style={styles.input}
                        disabled={!formData.state}
                    >
                        <option value="">Select City</option>
                        {availableCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                        ))}
                        <option value="other">Other</option>
                    </select>
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
                        style={{...styles.input, ...(errors.pincode ? styles.inputError : {})}}
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
                        style={{...styles.input, ...(errors.mobile ? styles.inputError : {})}}
                        placeholder="10-digit mobile number"
                        maxLength="10"
                    />
                    {errors.mobile && <span style={styles.errorText}>{errors.mobile}</span>}
                    </div>
                </div>
                
                <div style={styles.formGroup}>
                    <label style={styles.label}>Landmark</label>
                    <input 
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Nearby landmark (optional)"
                    />
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
                    onClick={handleSubmit} 
                    style={styles.submitButton}
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <Footer/>
        
        </>
        
    );
    }

// Inline styles
const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    margin: 0,
    padding: 0,
  },
  orderContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    overflow: 'auto',
  },
  leftPanel: {
    flex: '1',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRight: '1px solid #e1e4e8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  rightPanel: {
    flex: '2',
    backgroundColor: '#ffffff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  orderSummary: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  panelTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  orderItem: {
    display: 'flex',
    marginBottom: '15px',
  },
  productImage: {
    width: '80px',
    height: '80px',
    backgroundColor: '#e6e6e6',
    borderRadius: '4px',
    marginRight: '15px',
  },
  productDetails: {
    flex: '1',
  },
  productName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 5px 0',
  },
  productDescription: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 5px 0',
  },
  productPrice: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    margin: '5px 0 0 0',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e1e4e8',
    margin: '15px 0',
  },
  priceSummary: {
    marginTop: '10px',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '8px 0',
    fontSize: '14px',
    color: '#666',
  },
  totalRow: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
  },
  checkoutForm: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '25px',
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '25px',
    color: '#333',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  },
  textarea: {
    minHeight: '80px',
    resize: 'vertical',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
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
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#555',
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
    borderRadius: '4px',
    padding: '12px 25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
    maxWidth: '300px',
  },
}