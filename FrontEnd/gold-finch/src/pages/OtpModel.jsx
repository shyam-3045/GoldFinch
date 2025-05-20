import React, { useEffect, useRef, useState } from 'react';
import axios from '../../axios.config';
import { makeOrder } from '../context/Payment';
import { useAlert } from '../context/AlertMsgContext';


const OtpModel = ({ isOpen, closeModel, total, user, formData, token,products }) => {
  const {alertMsg}=useAlert()
    const {MakeOrder}=makeOrder()
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState({
    sending: false,
    verifying: false,
    payment: false
  });
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  // Send OTP when modal opens
  useEffect(() => {
    const sendOtpOnOpen = async () => {
      if (isOpen && user?.email) {
        setIsLoading(prev => ({ ...prev, sending: true }));
        setErrorMessage('');
        
        try {
          await axios.post(
            `https://goldfinch-backend.onrender.com/api/send-otp`,
            { email: user.email },
            { headers: { Authorization: `Bearer ${token}`} }
          );
          
          console.log("OTP sent successfully");
          
          // Reset OTP fields and focus first input
          resetOTP();
          // Start countdown timer
          startTimer();
        } catch (err) {
          console.error("Failed to send OTP on modal open:", err);
          setErrorMessage('Failed to send OTP. Please try again.');
        } finally {
          setIsLoading(prev => ({ ...prev, sending: false }));
        }
      }
    };
    
    sendOtpOnOpen();
    
    // Cleanup function to clear timer when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isOpen, user?.email, token]);

  // Reset OTP and timer state when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      // Reset states when modal opens
      setVerificationStatus(null);
      setErrorMessage('');
    } else {
      // Clear timers when modal closes
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isOpen]);

  // Start countdown timer
  const startTimer = () => {
    setTimer(60);
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Start new timer
    timerRef.current = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Reset OTP inputs and focus on first field
  const resetOTP = () => {
    setOtp(new Array(6).fill(''));
    setVerificationStatus(null);
    
    // Focus on first input after a short delay
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100);
  };

  const closeModal = () => {
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Reset states
    setOtp(new Array(6).fill(''));
    setVerificationStatus(null);
    setErrorMessage('');
    setIsLoading({
      sending: false,
      verifying: false,
      payment: false
    });
    
    // Call parent close function
    closeModel();
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Get the last character if multiple digits are entered
    const digit = value.slice(-1);
    
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    
    // Auto-focus to next input if current is filled
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Verify automatically if all digits are filled
    if (newOtp.every(d => d !== '') && !isLoading.verifying) {
      verifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Navigate between inputs with arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } 
    // Move to previous input on backspace if current input is empty
    else if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // Clear current digit
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    
    // Get pasted content
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content contains only digits
    if (!/^\d+$/.test(pastedData)) return;
    
    // Get up to 6 digits
    const digits = pastedData.substring(0, 6).split('');
    
    // Create new OTP array
    const newOtp = [...otp];
    
    // Fill in digits from pasted content
    digits.forEach((digit, i) => {
      if (i < 6) {
        newOtp[i] = digit;
      }
    });
    
    // Fill remaining slots with empty strings
    for (let i = digits.length; i < 6; i++) {
      newOtp[i] = '';
    }
    
    // Update state
    setOtp(newOtp);
    
    // Focus on appropriate input
    if (digits.length < 6) {
      inputRefs.current[digits.length]?.focus();
    } else {
      inputRefs.current[5]?.focus();
      // Automatically verify if all 6 digits are filled
      verifyOTP(newOtp.join(''));
    }
  };

  const verifyOTP = async (otpValue) => {
    // Validate OTP format
    if (!otpValue || otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      setVerificationStatus('error');
      setErrorMessage('Please enter a valid 6-digit OTP');
      return;
    }
    
    // Prevent multiple verification attempts
    if (isLoading.verifying) return;
    
    setIsLoading(prev => ({ ...prev, verifying: true }));
    setErrorMessage('');
    
    try {
      const verifyEndpoint = `https://goldfinch-backend.onrender.com/api/verify-otp`;
      
      const res = await axios.post(
        verifyEndpoint,
        { otp: otpValue, email: user?.email },
        { headers: { Authorization: `Bearer ${token}`} } 
      );
      
      // Check successful verification
      const isSuccess = res.data.success || res.data.message === 'OTP verified successfully';
      
      if (isSuccess) {
        setVerificationStatus('success');
        setErrorMessage('');
      } else {
        setVerificationStatus('error');
        setErrorMessage(res.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      setVerificationStatus('error');
      setErrorMessage(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, verifying: false }));
    }
  };

  const resendOTP = async () => {
    // Prevent resend if timer is still running or already sending
    if (timer > 0 || isLoading.sending) return;
    
    setIsLoading(prev => ({ ...prev, sending: true }));
    setErrorMessage('');
    
    try {
      await axios.post(
        "https://goldfinch-backend.onrender.com/api/send-otp",
        { email: user?.email },
        { headers: { Authorization: `Bearer ${token}`} }
      );
      
      // Reset OTP fields
      resetOTP();
      
      // Reset timer
      startTimer();
      
      // Reset verification status
      setVerificationStatus(null);
    } catch (err) {
      console.error('Failed to resend OTP:', err);
      setErrorMessage('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, sending: false }));
    }
  };
const handlePayment = async (total) => {
   try {
       // Step 1: Create the order
       const { data } = await axios.post('https://goldfinch-backend.onrender.com/api/create-order', {
           amount: total, // Amount in INR
       }, {
           headers: {
               Authorization: `Bearer ${token}`
           }
       }); // log the order data for debuggin
       // Step 2: Set up Razorpay options
       const options = {
           key: "rzp_test_cNG8AXPmxWUyej", // from Razorpay Dashboard
           amount: data.order.amount,
           currency: "INR",
           name: "Goldfinch Teas",
           description: "Tea Order Payment",
           order_id: data.order.id,
           handler: async (response) => {
               try {
                   // Step 3: Verify the payment
                   const verifyRes = await axios.post("https://goldfinch-backend.onrender.com/api/verify-payment", {
                       razorpay_order_id: response.razorpay_order_id,
                       razorpay_payment_id: response.razorpay_payment_id,
                       razorpay_signature: response.razorpay_signature,
                   }, {
                       headers: {
                           Authorization: `Bearer ${token}`
                       }
                   });

                   if (verifyRes.data.success) {
                       alertMsg("Order Confirmed !!!")
                       MakeOrder(formData,data.order.amount,products, response.razorpay_order_id,
                       response.razorpay_payment_id,
                       response.razorpay_signature,)
                      
                   } else {
                       alert("Payment verification failed ❌");
                   }
               } catch (error) {
                   console.error("Error during payment verification:", error);
                   alert("An error occurred while verifying the payment. Please try again.");
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

       // Step 4: Open Razorpay payment modal
       const rzp = new window.Razorpay(options);
       rzp.open();

   } catch (error) {
       console.error("Error during order creation or payment initialization:", error);
       alert("An error occurred while processing your payment. Please try again.");
   }
};


  // Don't render anything if modal is not open
  if (!isOpen) return null;

  const styles = {
    backdrop: {
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    modal: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      maxWidth: '400px',
      width: '100%',
      boxShadow: '0 0 20px rgba(0,0,0,0.25)',
      position: 'relative',
      textAlign: 'center',
      animation: 'fadeIn 0.3s ease-out'
    },
    header: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1.5rem'
    },
    title: {
      margin: 0, fontSize: '1.5rem', fontWeight: '600', color: '#333'
    },
    closeButton: {
      border: 'none', background: 'none', fontSize: '1.8rem', 
      cursor: 'pointer', color: '#666',
      width: '32px', height: '32px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: '50%',
      transition: 'background-color 0.2s ease'
    },
    closeButtonHover: {
      backgroundColor: '#f0f0f0'
    },
    body: {
      paddingBottom: '1.5rem'
    },
    message: {
      fontSize: '1rem', marginBottom: '1.5rem', color: '#444', lineHeight: '1.5'
    },
    highlight: {
      fontWeight: 'bold', color: '#333'
    },
    inputGroup: {
      display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem'
    },
    input: {
      width: '2.5rem', height: '2.75rem', fontSize: '1.25rem', fontWeight: '600',
      textAlign: 'center', border: '1px solid #ccc', borderRadius: '6px',
      transition: 'all 0.2s ease-in-out', outline: 'none',
      caretColor: '#4a6cf7'
    },
    inputFocused: {
      borderColor: '#4a6cf7',
      boxShadow: '0 0 0 3px rgba(74, 108, 247, 0.2)'
    },
    inputFilled: {
      borderColor: '#4a6cf7',
      backgroundColor: 'rgba(74, 108, 247, 0.05)'
    },
    inputDisabled: {
      backgroundColor: '#f5f5f5', 
      color: '#666',
      borderColor: '#ddd'
    },
    verifyButton: {
      padding: '0.75rem 1.5rem', backgroundColor: '#4a6cf7',
      color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600',
      cursor: 'pointer', width: '100%', fontSize: '1rem',
      transition: 'background-color 0.2s ease-in-out'
    },
    verifyButtonHover: {
      backgroundColor: '#3a5cd7'
    },
    verifyButtonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
      opacity: 0.7
    },
    footer: {
      borderTop: '1px solid #ddd', paddingTop: '1rem', marginTop: '1rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    },
    timerText: {
      fontSize: '0.9rem', color: '#666'
    },
    resendButton: {
      background: 'none', border: 'none', color: '#4a6cf7', 
      cursor: 'pointer', fontWeight: '500', padding: '0.5rem 1rem',
      borderRadius: '4px', transition: 'all 0.2s ease'
    },
    resendButtonHover: {
      backgroundColor: 'rgba(74, 108, 247, 0.1)'
    },
    resendButtonDisabled: {
      color: '#aaa',
      cursor: 'not-allowed'
    },
    statusMessage: {
      padding: '0.75rem', borderRadius: '6px', marginBottom: '1.5rem', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.95rem', fontWeight: '500'
    },
    success: {
      backgroundColor: 'rgba(40, 199, 111, 0.1)',
      color: '#28c76f', border: '1px solid rgba(40, 199, 111, 0.2)'
    },
    error: {
      backgroundColor: 'rgba(234, 84, 85, 0.1)',
      color: '#ea5455', border: '1px solid rgba(234, 84, 85, 0.2)'
    },
    errorMessage: {
      color: '#ea5455', fontSize: '0.85rem', marginTop: '-0.5rem', 
      marginBottom: '1rem', textAlign: 'center'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '18px',
      height: '18px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      borderTopColor: '#fff',
      animation: 'spin 0.8s linear infinite',
      marginRight: '8px'
    },
    '@keyframes spin': {
      to: { transform: 'rotate(360deg)' }
    },
    '@keyframes fadeIn': {
      from: { opacity: 0, transform: 'translateY(-10px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    }
  };

  return (
    <div 
      style={styles.backdrop} 
      onClick={closeModal}
    >
      <div 
        style={styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>Verify OTP</h2>
          <button 
            style={styles.closeButton} 
            onClick={closeModal}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            &times;
          </button>
        </div>
        <div style={styles.body}>
          <p style={styles.message}>
            Please enter the <span style={styles.highlight}>6-digit OTP</span> sent to your registered email
            {user?.email && <span style={styles.highlight}> ({user.email})</span>}.
          </p>
          <p style={styles.message}>(Check in Spam Email !)</p>
          
          {isLoading.sending ? (
            <div style={styles.statusMessage}>
              <div style={styles.loadingSpinner}></div>
              Sending OTP...
            </div>
          ) : (
            <div style={styles.inputGroup}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : null}
                  ref={(el) => (inputRefs.current[index] = el)}
                  disabled={verificationStatus === 'success' || isLoading.verifying}
                  style={{
                    ...styles.input,
                    ...(digit ? styles.inputFilled : {}),
                    ...(verificationStatus === 'success' || isLoading.verifying ? styles.inputDisabled : {})
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4a6cf7';
                    e.target.style.boxShadow = '0 0 0 3px rgba(74, 108, 247, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = digit ? '#4a6cf7' : '#ccc';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              ))}
            </div>
          )}
          
          {errorMessage && (
            <div style={styles.errorMessage}>
              {errorMessage}
            </div>
          )}
          
          {verificationStatus === 'success' && (
            <div style={{ ...styles.statusMessage, ...styles.success }}>
              ✓ OTP Verified Successfully
            </div>
          )}
          
          {verificationStatus === 'error' && !errorMessage && (
            <div style={{ ...styles.statusMessage, ...styles.error }}>
              ✗ Invalid OTP. Please try again.
            </div>
          )}
          
          {verificationStatus === 'success' ? (
            <button
              style={{
                ...styles.verifyButton,
                ...(isLoading.payment ? styles.verifyButtonDisabled : {})
              }}
              onMouseOver={(e) => {
                if (!isLoading.payment) e.target.style.backgroundColor = '#3a5cd7';
              }}
              onMouseOut={(e) => {
                if (!isLoading.payment) e.target.style.backgroundColor = '#4a6cf7';
              }}
              onClick={() => handlePayment(total)}
              disabled={isLoading.payment}
            >
              {isLoading.payment ? (
                <>
                  <span style={styles.loadingSpinner}></span> 
                  Processing...
                </>
              ) : (
                'Proceed to Payment'
              )}
            </button>
          ) : (
            <button 
              style={{
                ...styles.verifyButton,
                ...(isLoading.verifying || otp.join('').length !== 6 ? styles.verifyButtonDisabled : {})
              }}
              onMouseOver={(e) => {
                if (!isLoading.verifying && otp.join('').length === 6) {
                  e.target.style.backgroundColor = '#3a5cd7';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading.verifying && otp.join('').length === 6) {
                  e.target.style.backgroundColor = '#4a6cf7';
                }
              }}
              onClick={() => verifyOTP(otp.join(''))}
              disabled={isLoading.verifying || otp.join('').length !== 6}
            >
              {isLoading.verifying ? (
                <>
                  <span style={styles.loadingSpinner}></span> 
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
          )}
        </div>
        
        <div style={styles.footer}>
          <span style={styles.timerText}>
            {timer > 0 ? `Resend OTP in ${timer}s` : 'Didn\'t receive OTP?'}
          </span>
          <button 
            style={{
              ...styles.resendButton,
              ...(timer > 0 || isLoading.sending ? styles.resendButtonDisabled : {})
            }}
            onClick={resendOTP}
            disabled={timer > 0 || isLoading.sending}
            onMouseOver={(e) => {
              if (timer === 0 && !isLoading.sending) {
                e.target.style.backgroundColor = 'rgba(74, 108, 247, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            {isLoading.sending ? 'Sending...' : 'Resend'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModel;