import React, { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import Model from "./Model";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();
  const [token, setToken] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedin, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setToken(userToken);
    if (userToken) setLoggedIn(true);
  }, []);

  const handleLogin = (e) => {
    if (e.target.value === "login") {
      setIsOpen(true);
    } else {
      logout();
      setLoggedIn(false);
    }
  };

  const goToCart = () => {
    if (token) {
      navigate("/cart");
    } else {
      navigate("/");
      setIsOpen(true);
    }
  };

  // Professional Color Palette
  const colors = {
    primary: '#00A86B',       // Vibrant green
    background: '#FFFFFF',    // White
    text: '#333333',          // Dark gray
    textLight: '#666666',     // Light gray
  };

  // Comprehensive Styles
  const styles = {
    topBanner: {
      backgroundColor: colors.primary,
      color: colors.background,
      textAlign: 'center',
      padding: '8px 15px',
      fontSize: '14px',
      fontWeight: 500,
    },
    navbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: colors.background,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '24px',
      fontWeight: 700,
      color: colors.primary,
      letterSpacing: '-0.5px',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    link: {
      textDecoration: 'none',
      color: colors.text,
      fontSize: '15px',
      fontWeight: 500,
      transition: 'color 0.3s ease',
    },
    linkHover: {
      ':hover': {
        color: colors.primary,
      }
    },
    iconGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    iconButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    cartBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: colors.primary,
      color: colors.background,
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 700,
    },
    dropdown: {
      position: 'relative',
      display: 'inline-block',
    },
    dropdownContent: {
      display: 'none',
      position: 'absolute',
      backgroundColor: colors.background,
      minWidth: '160px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      zIndex: 1,
      top: '100%',
      left: 0,
      borderRadius: '4px',
      padding: '10px 0',
    },
    dropdownLink: {
      color: colors.text,
      padding: '10px 15px',
      textDecoration: 'none',
      display: 'block',
      ':hover': {
        backgroundColor: '#f1f1f1',
      }
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div style={styles.topBanner}>
        Trusted by 4 Lakh+ Customers over 9+ Years
      </div>

      {/* Main Navbar */}
      <nav style={styles.navbar}>
        {/* Brand */}
        <div style={styles.brand}>
          GOLDFINCH
        </div>

        {/* Navigation Links */}
        <div style={styles.navLinks}>
          <div style={styles.dropdown}>
            <a href="/offers" style={{...styles.link, ...styles.linkHover}}>OFFERS</a>
          </div>
          <div style={styles.dropdown}>
            <a href="/chai" style={{...styles.link, ...styles.linkHover}}>CHAI</a>
          </div>
          <div style={styles.dropdown}>
            <a href="/tea-plus" style={{...styles.link, ...styles.linkHover}}>
              TEA+ ▼
            </a>
          </div>
          <div style={styles.dropdown}>
            <a href="/trial-packs" style={{...styles.link, ...styles.linkHover}}>TRIAL PACKS</a>
          </div>
          <div style={styles.dropdown}>
            <a href="/gifts" style={{...styles.link, ...styles.linkHover}}>GIFTS</a>
          </div>
          <div style={styles.dropdown}>
            <a href="/teaware" style={{...styles.link, ...styles.linkHover}}>TEAWARE</a>
          </div>
          <div style={styles.dropdown}>
            <a href="/why-goldfinch" style={{...styles.link, ...styles.linkHover}}>WHY GOLDFINCH?</a>
          </div>
          <div style={styles.dropdown}>
            <a href="/reviews" style={{...styles.link, ...styles.linkHover}}>REVIEWS</a>
          </div>
        </div>

        {/* Icons */}
        <div style={styles.iconGroup}>
          {/* Currency Symbol */}
          <span style={{...styles.link, fontWeight: 600}}>₹</span>

          {/* Search */}
          <button style={styles.iconButton}>
            <Search size={20} color={colors.text} />
          </button>

          {/* User/Login */}
          <button 
            style={styles.iconButton}
            onClick={handleLogin}
          >
            <User size={20} color={colors.text} />
          </button>

          {/* Cart */}
          <button 
            style={styles.iconButton}
            onClick={goToCart}
          >
            <ShoppingCart size={20} color={colors.text} />
            <span style={styles.cartBadge}>3</span>
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      <Model isOpen={isOpen} closeMod={() => setIsOpen(false)} />
    </>
  );
}