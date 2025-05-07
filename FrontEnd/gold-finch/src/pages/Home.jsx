import { useEffect, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import Testimonials from "../components/sections/Testimonials";
import AboutSection from "../components/sections/AboutSection";
import axios from "axios";

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