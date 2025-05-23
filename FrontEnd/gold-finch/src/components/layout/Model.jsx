import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useAlert } from '../../context/AlertMsgContext';

export default function AuthModal({isOpen, closeMod}) {
  const {alertMsg} = useAlert();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState("");
  const {login} = useAuth();
  
  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const endPoint = (isLogin) ? "login" : 'signup';
    const msg = await login(endPoint, name, password, email);

    
    if(msg !== "success") {
      setError(msg);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      closeMod();
      alertMsg("Login Successful!");
      
    }
  };

  if(!isOpen) {
    return null;
  }

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(17, 24, 39, 0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      animation: 'fadeIn 0.4s ease-out'
    },
    container: {
      width: '90%',
      maxWidth: '450px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(139, 92, 246, 0.1)',
      zIndex: 1001,
      animation: 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
      color: '#ffffff',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    headerTitle: {
      margin: 0,
      fontSize: '20px',
      fontWeight: '600',
      letterSpacing: '0.5px'
    },
    closeButton: {
      background: 'rgba(255, 255, 255, 0.15)',
      border: 'none',
      color: '#ffffff',
      fontSize: '22px',
      cursor: 'pointer',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      transition: 'all 0.2s',
      outline: 'none',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    },
    body: {
      padding: '28px 24px',
      background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)'
    },
    form: {
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px'
    },
    fieldContainer: {
      display: 'flex', 
      flexDirection: 'column', 
      gap: '8px'
    },
    label: {
      fontWeight: '500', 
      color: '#4B5563',
      fontSize: '14px',
      letterSpacing: '0.3px'
    },
    input: {
      padding: '14px 16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '15px',
      transition: 'all 0.2s ease',
      outline: 'none',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      backgroundColor: '#ffffff'
    },
    submitButton: {
      marginTop: '16px',
      padding: '14px 20px',
      background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
      letterSpacing: '0.3px',
      position: 'relative',
      overflow: 'hidden'
    },
    toggleContainer: {
      marginTop: '24px', 
      textAlign: 'center', 
      fontSize: '14px', 
      color: '#6B7280',
      padding: '0 12px'
    },
    toggleButton: {
      background: 'none',
      border: 'none',
      color: '#7c3aed',
      fontWeight: '600',
      cursor: 'pointer',
      padding: '4px',
      marginLeft: '4px',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.2s'
    },
    errorMessage: {
      color: '#ef4444',
      padding: '10px 14px',
      backgroundColor: '#fef2f2',
      borderRadius: '8px',
      marginBottom: '12px',
      fontSize: '14px',
      borderLeft: '3px solid #ef4444',
      animation: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both'
    }
  };

  return (
    <>
      <div style={modalStyles.overlay} onClick={closeMod}>
        <div 
          style={modalStyles.container} 
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {/* Modal Header */}
          <div style={modalStyles.header}>
            <h3 style={modalStyles.headerTitle}>
              {isLogin ? "Login to Your Account" : "Create an Account"}
            </h3>
            <button 
              onClick={closeMod} 
              style={modalStyles.closeButton}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
          
          {/* Modal Body */}
          <div style={modalStyles.body}>
            <form onSubmit={handleSubmit} style={modalStyles.form}>
              {error && <div style={modalStyles.errorMessage}>{error}</div>}
              
              {!isLogin && (
                <div style={modalStyles.fieldContainer}>
                  <label htmlFor="name" style={modalStyles.label}>Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    style={modalStyles.input}
                  />
                </div>
              )}
              
              <div style={modalStyles.fieldContainer}>
                <label htmlFor="email" style={modalStyles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={modalStyles.input}
                />
              </div>
              
              <div style={modalStyles.fieldContainer}>
                <label htmlFor="password" style={modalStyles.label}>Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={modalStyles.input}
                />
              </div>
              
              <button 
                type="submit" 
                style={modalStyles.submitButton}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            
            {/* Toggle Mode */}
            <div style={modalStyles.toggleContainer}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={toggleAuthMode} 
                style={modalStyles.toggleButton}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}