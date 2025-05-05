
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import FeaturedProducts from "./components/sections/FeaturedProducts";
import AboutSection from "./components/sections/AboutSection";
import Testimonials from "./components/sections/Testimonials";
import Newsletter from "./components/sections/Newsletter";
import Footer from "./components/layout/Footer";
import "./App.css";

export default function TeaShopHomepage() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="app-container">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <Testimonials />
      <Newsletter
        email={email}
        setEmail={setEmail}
        handleSubscribe={handleSubscribe}
      />
      <Footer />
    </div>
  );
}
