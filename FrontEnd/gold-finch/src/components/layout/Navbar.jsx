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
  "Expects Some Discounts in Future"
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

  return (
    <>
      {/* Announcement Bar */}
      <div
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: isSmallMobile ? "6px 20px" : isMobile ? "6px 30px" : "8px 0",
          textAlign: "center",
          position: "sticky",
          top: "0",
          width: "100%",
          fontFamily: "Arial, sans-serif",
          fontSize: isSmallMobile ? "11px" : isMobile ? "12px" : "14px",
          fontWeight: "500",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "1001",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: isSmallMobile ? "5px" : isMobile ? "10px" : "20px",
            cursor: "pointer",
            color: "#ffffff",
            fontSize: isSmallMobile ? "14px" : isMobile ? "16px" : "18px",
          }}
          onClick={handlePrevAnnouncement}
        >
          ‹
        </span>
        <span
          style={{
            maxWidth: isSmallMobile ? "150px" : isMobile ? "200px" : "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {announcements[currentAnnouncementIndex]}
        </span>
        <span
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: isSmallMobile ? "5px" : isMobile ? "10px" : "20px",
            cursor: "pointer",
            color: "#ffffff",
            fontSize: isSmallMobile ? "14px" : isMobile ? "16px" : "18px",
          }}
          onClick={handleNextAnnouncement}
        >
          ›
        </span>
      </div>

      <nav
        style={{
          position: "sticky",
          top: isSmallMobile ? "28px" : isMobile ? "30px" : "36px", // Height of announcement bar
          backgroundColor: "#ffffff",
          boxShadow: isScrolled ? "0 2px 5px rgba(0,0,0,0.1)" : "none",
          padding: "0",
          zIndex: "1000",
          borderBottom: "1px solid #e0e0e0",
          width: "100%",
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
              padding: isSmallMobile ? "8px 10px" : isMobile ? "10px 15px" : "15px 20px",
              flexWrap: "wrap",
            }}
          >
            {/* Logo */}
            <div
              style={{
                fontSize: isSmallMobile ? "16px" : isMobile ? "18px" : "24px",
                fontWeight: "bold",
                color: "#37b24d",
                display: "flex",
                alignItems: "center",
                marginRight: isMobile ? "10px" : "0",
                flex: isSmallMobile ? "1" : "initial",
              }}
            >
              <img
                src="/Logo.png"
                alt="Goldfinch Logo"
                style={{
                  height: isSmallMobile ? "28px" : isMobile ? "32px" : "45px",
                  width: "auto",
                  objectFit: "contain",
                  marginRight: isSmallMobile ? "6px" : isMobile ? "8px" : "12px",
                  display: "inline-block",
                  verticalAlign: "middle",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                  backgroundColor: "transparent",
                }}
              />
              <NavLink 
                to="/" 
                style={{ 
                  textDecoration: "none",
                  display: isSmallMobile ? "block" : "inline-block",
                  maxWidth: isSmallMobile ? "100px" : "none",
                  overflow: isSmallMobile ? "hidden" : "visible",
                  textOverflow: isSmallMobile ? "ellipsis" : "initial",
                  whiteSpace: "nowrap"
                }}
              >
                <span style={{ 
                  color: "#37b24d",
                  fontSize: isSmallMobile ? "14px" : isMobile ? "16px" : "20px",
                }}>
                  GOLDFINCH TEAS
                </span>
              </NavLink>
            </div>

            {/* Desktop Nav Links */}
            <div
              style={{
                display: isMobile ? "none" : "flex",
                gap: "30px",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <NavLink
                to="/"
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "5px 0",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/allProducts"
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "5px 0",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                Shop
              </NavLink>
              <a
                href="#about"
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "5px 0",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={(e) => scrollToSection("about", e)}
              >
                About
              </a>
              <a
                href="#contact"
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "5px 0",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={(e) => scrollToSection("contact", e)}
              >
                Contact
              </a>
              <button
                onClick={navigateOrder}
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "5px 0",
                  position: "relative",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}
              >
                My Orders
              </button>
            </div>

            {/* Icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isSmallMobile ? "8px" : isMobile ? "10px" : "15px",
              }}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#333333",
                  position: "relative",
                  fontSize: isSmallMobile ? "12px" : isMobile ? "14px" : "16px",
                  padding: isSmallMobile ? "4px" : "5px",
                }}
                onClick={handleLogin}
                value={loggedin ? "logout" : "login"}
              >
                {loggedin ? "Logout" : "Login"}
              </button>

              <div style={{ position: "relative" }}>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#333333",
                    position: "relative",
                    padding: isSmallMobile ? "4px" : "5px",
                  }}
                  onClick={goToCart}
                >
                  <ShoppingCart size={isSmallMobile ? 18 : isMobile ? 20 : 22} />
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      backgroundColor: "#37b24d",
                      color: "white",
                      borderRadius: "50%",
                      width: isSmallMobile ? "18px" : "20px",
                      height: isSmallMobile ? "18px" : "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: isSmallMobile ? "10px" : "12px",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </div>
                </button>
              </div>

              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#333333",
                  position: "relative",
                  display: isMobile ? "block" : "none",
                  padding: isSmallMobile ? "4px" : "5px",
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
                gap: "15px",
                padding: isSmallMobile ? "12px 15px" : "15px 20px",
                borderTop: "1px solid #e0e0e0",
                backgroundColor: "#ffffff",
                width: "100%",
                transition: "height 0.3s ease",
                overflow: "hidden",
              }}
            >
              <NavLink
                to="/"
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  borderBottom: "1px solid #f0f0f0",
                  width: "100%",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/allProducts"
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  borderBottom: "1px solid #f0f0f0",
                  width: "100%",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </NavLink>
              <a
                href="#about"
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  borderBottom: "1px solid #f0f0f0",
                  width: "100%",
                }}
                onClick={(e) => scrollToSection("about", e)}
              >
                About
              </a>
              <a
                href="#contact"
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  borderBottom: "1px solid #f0f0f0",
                  width: "100%",
                }}
                onClick={(e) => scrollToSection("contact", e)}
              >
                Contact
              </a>
              <button
                onClick={() => {
                  navigateOrder();
                  setMobileMenuOpen(false);
                }}
                style={{
                  color: "#333333",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: isSmallMobile ? "14px" : "16px",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #f0f0f0",
                  width: "100%",
                  cursor: "pointer",
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