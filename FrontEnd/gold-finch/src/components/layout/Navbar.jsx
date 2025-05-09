import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import Model from "./Model"
import { useAuth } from "../../context/authContext";
import {  useNavigate } from "react-router-dom";

export default function Navbar() {
  const {logout}=useAuth()
  const [token,setToken]=useState("")
  const navigate=useNavigate()

  useEffect(()=>
  {
    const userToken=localStorage.getItem("token")
    setToken(localStorage.getItem("token"))
    if(userToken)
    {
      setLoggedIn(true)
    }
  })
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedin, setLoggedIn] = useState(false);
  const [isOpen,setIsOpen]=useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin=(e)=>
  {
    if(e.target.value === "login"){
      setIsOpen(true)
    }
    else{
      logout()
      setLoggedIn(false)
    }
    
  }

  const goToCart=()=>
  {
    if(token)
    {
      navigate("/cart")
    }
    else{
      navigate("/")
      setIsOpen(true)
    }
    
  }
  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1 className={`brand-name ${isScrolled ? "brand-scrolled" : ""}`}>
              GOLDFINCH TEAS
            </h1>
          </div>

          <div className="desktop-menu">
            <a
              href="/"
              className={`nav-link ${isScrolled ? "nav-link-scrolled" : ""}`}
            >
              Home
            </a>
            <a
              href="/allProducts"
              className={`nav-link ${isScrolled ? "nav-link-scrolled" : ""}`}
            >
              Shop
            </a>
            <a
              href="#about"
              className={`nav-link ${isScrolled ? "nav-link-scrolled" : ""}`}
            >
              About
            </a>
            <a
              href="#contact"
              className={`nav-link ${isScrolled ? "nav-link-scrolled" : ""}`}
            >
              Contact
            </a>
            <a
              href="/Myorder"
              className={`nav-link ${isScrolled ? "nav-link-scrolled" : ""}`}
            >
              My Orders
            </a>
          </div>

          <div className="navbar-icons">
            <button className={`icon-button ${isScrolled ? "icon-button-scrolled" : ""}`} onClick={goToCart}>
              <ShoppingCart size={22} />
            </button>

            <button onClick={handleLogin}
              className={`icon-button ${isScrolled ? "icon-button-scrolled" : ""}`}
              value={(loggedin)?"logout":"login"}
            > {(loggedin)?"Logout":"Login"}
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X
                  size={24}
                  className={isScrolled ? "icon-scrolled" : "icon-default"}
                />
              ) : (
                <Menu
                  size={24}
                  className={isScrolled ? "icon-scrolled" : "icon-default"}
                />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-links">
              <a href="/" className="mobile-nav-link">
                Home
              </a>
              <a href="#shop" className="mobile-nav-link">
                Shop
              </a>
              <a href="#about" className="mobile-nav-link">
                About
              </a>
              <a href="#contact" className="mobile-nav-link">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
      
    </nav>
    <Model isOpen={isOpen} closeMod={() => setIsOpen(false)}  />
    </>
    
    
  );
}