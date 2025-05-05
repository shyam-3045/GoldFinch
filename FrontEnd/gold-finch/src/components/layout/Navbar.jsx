import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
              href="#"
              className={`nav-link ${isScrolled ? "nav-link-scrolled" : ""}`}
            >
              Home
            </a>
            <a
              href="#shop"
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
              href="#favorites"
              className={`nav-link ${isScrolled ? "nav-link-scrolled" : ""}`}
            >
              Favorites
            </a>
          </div>

          <div className="navbar-icons">
            <button
              className={`icon-button ${
                isScrolled ? "icon-button-scrolled" : ""
              }`}
            >
              <ShoppingCart size={22} />
            </button>
            <button
              className={`icon-button ${
                isScrolled ? "icon-button-scrolled" : ""
              }`}
            >
              <User size={22} />
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
              <a href="#" className="mobile-nav-link">
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
  );
}
