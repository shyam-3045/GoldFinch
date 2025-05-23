import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-title">TeaLeaf</h3>
            <p className="footer-text">
              Bringing the finest teas from around the world to your cup since
              2020.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61576109014467" target="_blank" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/goldfinchteas?igsh=MXE1cWVhdWxtdHhoYg==" target="_blank" className="social-link">
                <Instagram size={20} /> 
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="footer-link">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Customer Service</h3>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
  <h3 className="footer-title">Contact Us</h3>
  <address className="footer-address">
    <a
      href="https://www.instagram.com/goldfinchteas?igsh=MXE1cWVhdWxtdHhoYg=="
      target="_blank"
      rel="noopener noreferrer"
      className="footer-link"
      style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
    >
      <Instagram size={20} />
      @goldfinchteas
    </a>
    <a
      href="mailto:sealarkint@gmail.com"
      className="footer-link"
    >
      sealarkint@gmail.com
    </a>
    <p>+91 8190070009</p>
  </address>
</div>


        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TeaLeaf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
