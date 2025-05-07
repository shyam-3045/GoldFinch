import ScrollIndicator from "../layout/ScrollIndicator";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-background"></div>

      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover the Finest{" "}
            <span className="hero-highlight">Tea Collection</span>
          </h1>
          <p className="hero-subtitle">
            From traditional blends to exotic flavors, our premium tea selection
            will awaken your senses.
          </p>
          <div className="hero-buttons">
            <a href="#shop" className="btn btn-primary">
              Shop Now
            </a>
            <a href="#about" className="btn btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
