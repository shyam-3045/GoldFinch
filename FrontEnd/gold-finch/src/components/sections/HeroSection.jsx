import React from 'react';
import { useNavigate } from 'react-router-dom';


const 
HeroSection = () => {
  const navigate=useNavigate()
  // Hero section styles
  const styles = {
    heroContainer: {
      position: 'relative',
      width: '100%',
      height: '650px', // Increased height for better fit
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url("/Bg-image.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      boxShadow: 'inset 0 0 50px rgba(0,0,0,0.4)', // Inner shadow for depth
    },
    contentContainer: {
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 2,
    },
    titleContainer: {
      marginBottom: '20px',
    },
    mainTitle: {
      fontSize: '72px', // Increased font size
      fontWeight: '800',
      color: '#ffffff',
      lineHeight: '1.1',
      letterSpacing: '1px',
      marginBottom: '16px',
      fontFamily: 'Arial, sans-serif',
      textTransform: 'uppercase',
      textShadow: '2px 2px 8px rgba(0,0,0,0.5)', // Text shadow for better visibility
    },
    subtitle: {
      fontSize: '22px', // Increased font size
      fontWeight: '400',
      color: '#ffffff',
      lineHeight: '1.5',
      marginBottom: '32px',
      maxWidth: '650px',
      textShadow: '1px 1px 4px rgba(0,0,0,0.5)', // Text shadow for better visibility
    },
    buttonContainer: {
      marginTop: '24px',
    },
    shopButton: {
      display: 'inline-block',
      padding: '16px 42px', // Increased padding
      fontSize: '18px',
      fontWeight: '600',
      textTransform: 'uppercase',
      color: '#ffffff',
      backgroundColor: '#00c853',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      letterSpacing: '1px',
      boxShadow: '0 4px 10px rgba(0, 200, 83, 0.3)',
      transition: 'all 0.3s ease',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)', // Radial gradient overlay
      zIndex: 1,
    }
  };

  return (
    <div style={styles.heroContainer}>
      <div style={styles.overlay}></div>
      <div style={styles.contentContainer}>
        <div style={styles.titleContainer}>
          <h1 style={styles.mainTitle}>
            ASSAM' S<br />FIRST FLUSH
          </h1>
          <p style={styles.subtitle}>
            Sip the essence of spring with our First Flush Assam Teas
          </p>
        </div>
        <div style={styles.buttonContainer}>
          <button 

          onClick={()=>{navigate("/allProducts")}}
            style={styles.shopButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00a844';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 200, 83, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00c853';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 200, 83, 0.3)';
            }}
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;