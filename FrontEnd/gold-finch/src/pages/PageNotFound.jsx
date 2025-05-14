import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const [floatPosition, setFloatPosition] = useState(0);
  const navigate=useNavigate()
  
  useEffect(() => {
    const floatInterval = setInterval(() => {
      setFloatPosition(prev => (prev === 0 ? -5 : 0));
    }, 1500);
    
    return () => clearInterval(floatInterval);
  }, []);
  
  const styles = {
    container: {
      fontFamily: "'Montserrat', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(to bottom right, #f4f9f1, #e8f5e4)',
      color: '#2c5e1a',
      textAlign: 'center'
    },
    teaPacketContainer: {
      position: 'relative',
      width: '220px',
      height: '260px',
      marginBottom: '2rem',
      transform: `translateY(${floatPosition}px)`,
      transition: 'transform 1.5s ease-in-out'
    },
    teaPacket: {
      position: 'relative',
      width: '180px',
      height: '220px',
      background: 'linear-gradient(to right, #8bc34a, #689f38)',
      borderRadius: '8px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #558b2f'
    },
    teaPacketLabel: {
      position: 'absolute',
      width: '160px',
      height: '180px',
      background: '#f1f8e9',
      borderRadius: '4px',
      top: '20px',
      left: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)'
    },
    teaPacketLogo: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#33691e'
    },
    teaLeaves: {
      display: 'flex',
      marginBottom: '15px'
    },
    teaLeaf: {
      width: '20px',
      height: '40px',
      background: '#7cb342',
      borderRadius: '50% 10% 50% 10%',
      margin: '0 5px',
      transform: 'rotate(45deg)'
    },
    labelText: {
      fontSize: '0.8rem',
      color: '#33691e',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    shadow: {
      position: 'absolute',
      bottom: '-10px',
      width: '160px',
      height: '20px',
      background: 'rgba(0,0,0,0.05)',
      borderRadius: '50%',
      zIndex: 1
    },
    errorCode: {
      fontSize: '5rem',
      fontWeight: 'bold',
      margin: '0',
      color: '#33691e'
    },
    heading: {
      fontSize: '2rem',
      margin: '0.5rem 0 1.5rem',
      color: '#558b2f'
    },
    text: {
      fontSize: '1.1rem',
      maxWidth: '600px',
      lineHeight: '1.6',
      marginBottom: '2rem',
      color: '#3e5926'
    },
    button: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      background: '#7cb342',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
      fontFamily: 'inherit',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    buttonHover: {
      background: '#558b2f'
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.teaPacketContainer}>
        <div style={styles.teaPacket}>
          <div style={styles.teaPacketLabel}>
            <div style={styles.teaPacketLogo}>GREEN TEA</div>
            <div style={styles.teaLeaves}>
              <div style={styles.teaLeaf}></div>
              <div style={{...styles.teaLeaf, transform: 'rotate(20deg)'}}></div>
              <div style={{...styles.teaLeaf, transform: 'rotate(70deg)'}}></div>
            </div>
            <div style={styles.labelText}>Premium Quality</div>
            <div style={{...styles.labelText, marginTop: '5px'}}>404 Blend</div>
          </div>
        </div>
        <div style={styles.shadow}></div>
      </div>
      
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.heading}>This tea blend is out of stock!</h2>
      <p style={styles.text}>
        We couldn't find the tea you were looking for. It might have been moved,
        sold out, or perhaps it's still being harvested. Please check the URL or
        browse our collection for other premium tea packets.
      </p>
      
      <button 
        style={isHovered ? {...styles.button, ...styles.buttonHover} : styles.button}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate("/")}
      >
        Back To HomePage
      </button>
    </div>
  );
}