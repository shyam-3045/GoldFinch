import React from 'react';


const TeaHeader = () => {
  // You can replace this URL with your own background image path
  const backgroundImageUrl = '../../../public/TeaHeader.png';
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      padding: '50px 0',
      marginTop: '60px', // Add margin-top to separate from components above
      backgroundImage: `url(${backgroundImageUrl})`, // Background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '500px' // Ensure minimum height for background to be visible
    }}>
      {/* Overlay to ensure text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text contrast
        zIndex: 1
      }} />
      
      <div style={{
        textAlign: 'center',
        padding: '40px 10px',
        position: 'relative',
        zIndex: 2 // Ensure content is above the overlay
      }}>
        <h1 style={{
          fontSize: '60px',
          fontWeight: 'bold',
          marginBottom: '20px',
          fontFamily: 'Georgia, serif',
          letterSpacing: '1px'
        }}>The Teabox Experience</h1>
        
        <p style={{
          fontSize: '24px',
          fontStyle: 'italic',
          marginBottom: '40px',
          color: '#FFEB3B'
        }}>Taste the Difference of Pure Freshness</p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <FeatureBox 
            icon="☕" 
            title="Shorter Supply Chain = Fresh Tea"
            description="From garden to cup in days, preserving natural flavors"
          />
          
          <FeatureBox 
            icon="🔍" 
            title="100% Product Traceability"
            description="Know exactly where your tea comes from"
          />
          
          <FeatureBox 
            icon="🤝" 
            title="Equitable Sourcing"
            description="Fair partnerships with local growers"
          />
          
          <FeatureBox 
            icon="🌱" 
            title="Recognition to over 3.5M Pluckers"
            description="Supporting artisan tea communities worldwide"
          />
        </div>
      </div>
    </div>
  );
};

// Feature box component
const FeatureBox = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      style={{
        width: '220px',
        textAlign: 'center',
        margin: '15px',
        padding: '20px 15px',
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(5px)',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ 
        fontSize: '48px',
        marginBottom: '15px',
        color: isHovered ? '#FFEB3B' : 'white',
        transition: 'color 0.3s ease' 
      }}>
        {icon}
      </div>
      <h3 style={{ 
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: isHovered ? '#FFEB3B' : 'white',
        transition: 'color 0.3s ease'
      }}>
        {title}
      </h3>
      <p style={{ 
        fontSize: '16px',
        lineHeight: '1.5'
      }}>
        {description}
      </p>
    </div>
  );
};

export default TeaHeader;