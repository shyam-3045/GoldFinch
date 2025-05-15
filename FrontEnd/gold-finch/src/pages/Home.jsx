import { useEffect, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import Testimonials from "../components/sections/Testimonials";
import AboutSection from "../components/sections/AboutSection";
import TeaHeader from "../components/sections/TeaHeader";


export default function Home() {
  return (
    <div className="app-container">
      <HeroSection />
      <TeaHeader/>  
      <FeaturedProducts/>
      <AboutSection />
      <Testimonials />

      
    </div>
  );
}