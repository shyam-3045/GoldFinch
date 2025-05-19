import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Model from "./Model";
import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useAlert  } from "../../context/AlertMsgContext";


export default function Navbar() {
  const {alertMsg}=useAlert()
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loggedin, setLoggedIn] = useState(!!token);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  // Announcement messages
  const announcements = [
    "SAVE Extra 5% up to ₹100 on Prepaid Orders",
    "FREE Shipping on Orders Above ₹499",
    "NEW! Seasonal Blends Now Available",
    "Use Code WELCOME10 for 10% Off First Order"
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Media query handling
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync token changes
  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken !== token) {
        setToken(storedToken);
        setLoggedIn(!!storedToken);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [token]);

  const handleLogin = (e) => {
    if (e.target.value === "login") {
      setIsOpen(true);
    } else {
      logout();
      navigate("/")
      localStorage.removeItem("token");
      setToken("");
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

  const handlePrevAnnouncement = () => {
    setCurrentAnnouncementIndex((prevIndex) => 
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  };

  const handleNextAnnouncement = () => {
    setCurrentAnnouncementIndex((prevIndex) => 
      (prevIndex + 1) % announcements.length
    );
  };

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu if open
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Announcement bar styles
  const announcementBarStyles = {
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: isMobile ? "6px 30px" : "8px 0",
    textAlign: "center",
    position: "sticky",
    top: "0",
    width: "100%",
    fontFamily: "Arial, sans-serif",
    fontSize: isMobile ? "12px" : "14px",
    fontWeight: "500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1001",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const arrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#ffffff",
    fontSize: isMobile ? "16px" : "18px",
  };

  const leftArrowStyles = {
    ...arrowStyles,
    left: isMobile ? "10px" : "20px",
  };

  const rightArrowStyles = {
    ...arrowStyles,
    right: isMobile ? "10px" : "20px",
  };

  // Navbar styles
  const navStyles = {
    position: "sticky",
    top: isMobile ? "30px" : "36px", // Height of announcement bar - adjust for mobile
    backgroundColor: "#ffffff",
    boxShadow: isScrolled ? "0 2px 5px rgba(0,0,0,0.1)" : "none",
    padding: "0",
    zIndex: "1000",
    borderBottom: "1px solid #e0e0e0",
  };

  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };

  const navRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "10px 15px" : "15px 20px",
    flexWrap: "wrap",
  };

  const logoStyles = {
    fontSize: isMobile ? "20px" : "24px",
    fontWeight: "bold",
    color: "#37b24d",
    display: "flex",
    alignItems: "center",
    marginRight: isMobile ? "10px" : "0",
  };

  const navLinks = {
    display: "flex",
    gap: isMobile ? "15px" : "30px",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  };

  const navLink = {
    color: "#333333",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: isMobile ? "14px" : "16px",
    textTransform: "uppercase",
    padding: "5px 0",
    position: "relative",
    cursor: "pointer", // Add cursor pointer to indicate clickable
  };

  const iconSection = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "10px" : "15px",
  };

  const iconButton = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#333333",
    position: "relative",
  };

  const cartIndicator = {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "#37b24d",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  };

  const mobileMenuStyles = {
    display: mobileMenuOpen ? "flex" : "none",
    flexDirection: "column",
    gap: "15px",
    padding: "15px 20px",
    borderTop: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    width: "100%",
  };

  const announcementTextStyles = {
    maxWidth: isMobile ? "200px" : "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  return (
  <>
    {/* Announcement Bar */}
    <div style={announcementBarStyles}>
      <span style={leftArrowStyles} onClick={handlePrevAnnouncement}>‹</span>
      <span style={announcementTextStyles}>{announcements[currentAnnouncementIndex]}</span>
      <span style={rightArrowStyles} onClick={handleNextAnnouncement}>›</span>
    </div>

    <nav style={navStyles}>
      <div style={containerStyles}>
        <div style={navRow}>
          {/* Logo */}
          <div style={logoStyles}>
            <img 
              src="public/Logo.png" 
              alt="Goldfinch Logo" 
              style={{
                height: isMobile ? "32px" : "45px",
                width: "auto",
                objectFit: "contain",
                marginRight: isMobile ? "10px" : "12px",
                display: "inline-block",
                verticalAlign: "middle",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                backgroundColor: "transparent",
              }} 
            />
            <span style={{ color: "#37b24d" }}>GOLDFINCH TEAS</span>
          </div>

          {/* Desktop Nav Links */}
          <div style={{ ...navLinks, display: isMobile ? "none" : "flex" }}>
            <NavLink to="/" style={navLink}>Home</NavLink>
            <NavLink to="/allProducts" style={navLink}>Shop</NavLink>
            <a href="#about" style={navLink} onClick={(e) => scrollToSection('about', e)}>About</a>
            <a href="#contact" style={navLink} onClick={(e) => scrollToSection('contact', e)}>Contact</a>
            <NavLink to={token ? "/Myorder" : "/"} style={navLink}>My Orders</NavLink>
          </div>

          {/* Icons */}
          <div style={iconSection}>
            <button
              style={{
                ...iconButton,
                fontSize: isMobile ? "14px" : "16px",
              }}
              onClick={handleLogin}
              value={loggedin ? "logout" : "login"}
            >
              {loggedin ? "Logout" : "Login"}
            </button>

            <div style={{ position: "relative" }}>
              <button style={iconButton} onClick={goToCart}>
                <ShoppingCart size={isMobile ? 20 : 22} />
                <div style={cartIndicator}>1</div>
              </button>
            </div>

            <button
              style={{ ...iconButton, display: isMobile ? "block" : "none" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div style={mobileMenuStyles}>
            <a href="/" style={navLink}>Home</a>
            <a href="/allProducts" style={navLink}>Shop</a>
            <a href="#about" style={navLink} onClick={(e) => scrollToSection('about', e)}>About</a>
            <a href="#contact" style={navLink} onClick={(e) => scrollToSection('contact', e)}>Contact</a>
            <a href={token ? "/Myorder" : "/"} style={navLink}>My Orders</a>
          </div>
        )}
      </div>
    </nav>

    <Model isOpen={isOpen} closeMod={() => setIsOpen(false)} />
  </>
);
}