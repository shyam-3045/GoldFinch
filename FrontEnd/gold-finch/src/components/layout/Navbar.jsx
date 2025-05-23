import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Model from "./Model";
import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertMsgContext";

export default function Navbar() {
  const { alertMsg } = useAlert();
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
    "Savor Luxury in Every Sip – Explore Our Premium Tea Collection",
    "Complimentary Shipping on All Orders Above ₹499 In Future",
    "Now Brewing: Limited Edition Seasonal Tea Blends",
    "Discounts Will Be Available In Future"
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
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 480);
      
      // Close mobile menu on resize to desktop
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

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
      navigate("/");
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

  const navigateOrder = () => {
    if (token) {
      navigate("/Myorder");
    } else {
      alertMsg("Login First");
      navigate("/");
    }
  };

  // Hover effect styles
  const navLinkStyle = {
    color: "#45035b",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "16px",
    textTransform: "uppercase",
    padding: "8px 0",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.3s ease",
    letterSpacing: "0.5px",
  };

  const navLinkHoverStyle = {
    ...navLinkStyle,
    color: "#d3b20d",
  };

  const underlineStyle = {
    content: '""',
    position: "absolute",
    width: "0",
    height: "2px",
    bottom: "0",
    left: "50%",
    backgroundColor: "#d3b20d",
    transition: "all 0.3s ease",
    transform: "translateX(-50%)",
  };

  const underlineHoverStyle = {
    ...underlineStyle,
    width: "100%",
  };

  return (
    <>
      {/* Announcement Bar */}
      <div
        style={{
          background: "black",
          color: "white",
          padding: isSmallMobile ? "8px 20px" : isMobile ? "8px 30px" : "10px 0",
          textAlign: "center",
          position: "sticky",
          top: "0",
          width: "100%",
          fontFamily: "Arial, sans-serif",
          fontSize: isSmallMobile ? "11px" : isMobile ? "12px" : "14px",
          fontWeight: "600",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "1001",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
          boxShadow: "0 2px 10px rgba(69, 3, 91, 0.3)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: isSmallMobile ? "8px" : isMobile ? "15px" : "25px",
            cursor: "pointer",
            color: "white",
            fontSize: isSmallMobile ? "16px" : isMobile ? "18px" : "20px",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
          onClick={handlePrevAnnouncement}
          onMouseEnter={(e) => e.target.style.transform = "translateY(-50%) scale(1.2)"}
          onMouseLeave={(e) => e.target.style.transform = "translateY(-50%) scale(1)"}
        >
          ‹
        </span>
        <span
          style={{
            maxWidth: isSmallMobile ? "150px" : isMobile ? "200px" : "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {announcements[currentAnnouncementIndex]}
        </span>
        <span
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: isSmallMobile ? "8px" : isMobile ? "15px" : "25px",
            cursor: "pointer",
            color: "white",
            fontSize: isSmallMobile ? "16px" : isMobile ? "18px" : "20px",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
          onClick={handleNextAnnouncement}
          onMouseEnter={(e) => e.target.style.transform = "translateY(-50%) scale(1.2)"}
          onMouseLeave={(e) => e.target.style.transform = "translateY(-50%) scale(1)"}
        >
          ›
        </span>
      </div>

      <nav
        style={{
          position: "sticky",
          top: isSmallMobile ? "32px" : isMobile ? "34px" : "40px",
          background: "linear-gradient(to right, #ffffff 0%, #fafafa 100%)",
          boxShadow: isScrolled ? "0 4px 20px rgba(69, 3, 91, 0.15)" : "0 2px 10px rgba(69, 3, 91, 0.08)",
          padding: "0",
          zIndex: "1000",
          borderBottom: `2px solid ${isScrolled ? '#d3b20d' : 'transparent'}`,
          width: "100%",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: isSmallMobile ? "12px 15px" : isMobile ? "15px 20px" : "20px 30px",
              flexWrap: "wrap",
            }}
          >
            {/* Logo */}
            <div
              style={{
                fontSize: isSmallMobile ? "16px" : isMobile ? "18px" : "26px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                marginRight: isMobile ? "10px" : "0",
                flex: isSmallMobile ? "1" : "initial",
                transition: "all 0.3s ease",
              }}
            >
              <img
                src="/favicon.png"
                alt="Goldfinch Logo"
                style={{
                  height: isSmallMobile ? "32px" : isMobile ? "36px" : "40px",
                  width: "auto",
                  objectFit: "contain",
                  marginRight: isSmallMobile ? "8px" : isMobile ? "10px" : "15px",
                  display: "inline-block",
                  verticalAlign: "middle",
                  filter: "drop-shadow(0 2px 4px rgba(69, 3, 91, 0.2))",
                  backgroundColor: "transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              />
              <NavLink 
                to="/" 
                style={{ 
                  textDecoration: "none",
                  display: isSmallMobile ? "block" : "inline-block",
                  maxWidth: isSmallMobile ? "120px" : "none",
                  overflow: isSmallMobile ? "hidden" : "visible",
                  textOverflow: isSmallMobile ? "ellipsis" : "initial",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                <span style={{ 
                  background: "linear-gradient(135deg, #d3b20d 0%, #f4d03f 50%, #d3b20d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: isSmallMobile ? "14px" : isMobile ? "16px" : "22px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  textShadow: "0 2px 4px rgba(211, 178, 13, 0.3)",
                  fontFamily: "serif",
                }}>
                  GOLDFINCH TEAS
                </span>
              </NavLink>
            </div>

            {/* Desktop Nav Links */}
            <div
              style={{
                display: isMobile ? "none" : "flex",
                gap: "40px",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                padding: "0 20px",
              }}
            >
              <NavLink
                to="/"
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, navLinkHoverStyle);
                  e.target.querySelector('.underline').style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, navLinkStyle);
                  e.target.querySelector('.underline').style.width = "0";
                }}
              >
                Home
                <span className="underline" style={underlineStyle}></span>
              </NavLink>
              <NavLink
                to="/allProducts"
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, navLinkHoverStyle);
                  e.target.querySelector('.underline').style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, navLinkStyle);
                  e.target.querySelector('.underline').style.width = "0";
                }}
              >
                Shop
                <span className="underline" style={underlineStyle}></span>
              </NavLink>
              <a
                href="#about"
                style={navLinkStyle}
                onClick={(e) => scrollToSection("about", e)}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, navLinkHoverStyle);
                  e.target.querySelector('.underline').style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, navLinkStyle);
                  e.target.querySelector('.underline').style.width = "0";
                }}
              >
                About
                <span className="underline" style={underlineStyle}></span>
              </a>
              <a
                href="#contact"
                style={navLinkStyle}
                onClick={(e) => scrollToSection("contact", e)}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, navLinkHoverStyle);
                  e.target.querySelector('.underline').style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, navLinkStyle);
                  e.target.querySelector('.underline').style.width = "0";
                }}
              >
                Contact
                <span className="underline" style={underlineStyle}></span>
              </a>
              <button
                onClick={navigateOrder}
                style={{
                  ...navLinkStyle,
                  background: "none",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, {...navLinkHoverStyle, background: "none", border: "none"});
                  e.target.querySelector('.underline').style.width = "100%";
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {...navLinkStyle, background: "none", border: "none"});
                  e.target.querySelector('.underline').style.width = "0";
                }}
              >
                My Orders
                <span className="underline" style={underlineStyle}></span>
              </button>
            </div>

            {/* Icons */}
            {/* Icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isSmallMobile ? "12px" : isMobile ? "15px" : "20px",
              }}
            >
              {/* Cart Button */}
              <div style={{ position: "relative" }}>
                <button
                  style={{
                    background: "none",
                    border: "1px solid #45035b",
                    cursor: "pointer",
                    color: "#45035b",
                    position: "relative",
                    padding: isSmallMobile ? "8px" : "8px",

                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={goToCart}
                  
                 
                >
                  <ShoppingCart size={isSmallMobile ? 18 : isMobile ? 18 : 18} />
        
                </button>
              </div>
              {/* Login/Logout Button */}
              <button
                style={{
                  background: "#45035b",
                  border: "1px solid #45035b",
                  cursor: "pointer",
                  color: "#d3b20d ",
                  position: "relative",
                  fontSize: isSmallMobile ? "11px" : isMobile ? "12px" : "11px",
                  padding: isSmallMobile ? "6px 10px" : "7px 12px",
                  borderRadius: "6px",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.3px",
                  transition: "all 0.2s ease",
                }}
                onClick={handleLogin}
                value={loggedin ? "logout" : "login"}
        
              >
                {loggedin ? "Logout" : "Login"}
              </button>

              

              {/* Mobile Menu Button */}
              <button
                style={{
                  background: "none",
                  border: "1px solid #45035b",
                  cursor: "pointer",
                  color: "#45035b",
                  position: "relative",
                  display: isMobile ? "flex" : "none",
                  padding: isSmallMobile ? "8px" : "10px",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                

              >
                {mobileMenuOpen ? (
                  <X size={isSmallMobile ? 20 : 22} />
                ) : (
                  <Menu size={isSmallMobile ? 20 : 22} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobile && (
            <div
              style={{
                display: mobileMenuOpen ? "flex" : "none",
                flexDirection: "column",
                gap: "0",
                padding: "0",
                borderTop: "2px solid #d3b20d",
                background: "linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)",
                width: "100%",
                transition: "all 0.3s ease",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(69, 3, 91, 0.1)",
              }}
            >
              <NavLink
                to="/"
                style={{
                  color: "#45035b",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "15px 20px",
                  borderBottom: "1px solid rgba(69, 3, 91, 0.1)",
                  width: "100%",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                }}
                onClick={() => setMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(211, 178, 13, 0.1)";
                  e.target.style.color = "#d3b20d";
                  e.target.style.paddingLeft = "30px";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#45035b";
                  e.target.style.paddingLeft = "20px";
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/allProducts"
                style={{
                  color: "#45035b",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "15px 20px",
                  borderBottom: "1px solid rgba(69, 3, 91, 0.1)",
                  width: "100%",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                }}
                onClick={() => setMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(211, 178, 13, 0.1)";
                  e.target.style.color = "#d3b20d";
                  e.target.style.paddingLeft = "30px";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#45035b";
                  e.target.style.paddingLeft = "20px";
                }}
              >
                Shop
              </NavLink>
              <a
                href="#about"
                style={{
                  color: "#45035b",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "15px 20px",
                  borderBottom: "1px solid rgba(69, 3, 91, 0.1)",
                  width: "100%",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                }}
                onClick={(e) => scrollToSection("about", e)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(211, 178, 13, 0.1)";
                  e.target.style.color = "#d3b20d";
                  e.target.style.paddingLeft = "30px";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#45035b";
                  e.target.style.paddingLeft = "20px";
                }}
              >
                About
              </a>
              <a
                href="#Contact"
                style={{
                  color: "#45035b",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "15px 20px",
                  borderBottom: "1px solid rgba(69, 3, 91, 0.1)",
                  width: "100%",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                }}
                onClick={(e) => scrollToSection("Contact", e)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(211, 178, 13, 0.1)";
                  e.target.style.color = "#d3b20d";
                  e.target.style.paddingLeft = "30px";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#45035b";
                  e.target.style.paddingLeft = "20px";
                }}
              >
                Contact
              </a>
              <button
                onClick={() => {
                  navigateOrder();
                  setMobileMenuOpen(false);
                }}
                style={{
                  color: "#45035b",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "15px 20px",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(69, 3, 91, 0.1)",
                  width: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(211, 178, 13, 0.1)";
                  e.target.style.color = "#d3b20d";
                  e.target.style.paddingLeft = "30px";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#45035b";
                  e.target.style.paddingLeft = "20px";
                }}
              >
                My Orders
              </button>
            </div>
          )}
        </div>
      </nav>

      <Model isOpen={isOpen} closeMod={() => setIsOpen(false)} />
    </>
  );
}