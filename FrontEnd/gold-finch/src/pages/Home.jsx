import { useEffect, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import Testimonials from "../components/sections/Testimonials";
import AboutSection from "../components/sections/AboutSection";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="app-container">
      <HeroSection />
      <FeaturedProducts/>
      <AboutSection />
      <Testimonials />

      
    </div>
  );
}