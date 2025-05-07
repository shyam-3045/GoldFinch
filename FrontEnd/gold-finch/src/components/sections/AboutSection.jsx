export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <div className="image-placeholder"></div>
          </div>

          <div className="about-text">
            <h2 className="section-title">Our Tea Story</h2>
            <p className="about-paragraph">
              Founded with a passion for exceptional tea, we've dedicated
              ourselves to bringing you the finest tea leaves from across the
              globe. Our journey began in the lush tea gardens of Darjeeling,
              where we discovered the art and science behind perfect tea
              cultivation.
            </p>
            <p className="about-paragraph">
              Every tea acket we offer is a result of careful selection,
              traditional processing methods, and a commitment to sustainable
              farming practices. We work directly with tea growers to ensure
              fair trade and the highest quality in every cup you brew.
            </p>

            <div className="feature-cards">
              <FeatureCard
                title="Organic Certified"
                description="100% natural ingredients"
                iconPath="M5 13l4 4L19 7"
              />
              <FeatureCard
                title="Ethically Sourced"
                description="Fair trade practices"
                iconPath="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, iconPath }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <svg
          className="feature-svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={iconPath}
          ></path>
        </svg>
      </div>
      <div className="feature-text">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  );
}
