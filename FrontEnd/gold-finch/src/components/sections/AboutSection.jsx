import { useEffect } from "react";

export default function AboutSection() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-on-scroll");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <section id="about" className="about-section fade-in-on-scroll">
      <div className="container">
        <div className="about-content">
          <div className="about-image fade-in-on-scroll">
            <div className="image-placeholder">
              <img
                src="https://i.pinimg.com/474x/e7/11/f7/e711f7732b51b09b1b213b4101b8137a.jpg"
                alt=""
              />
            </div>
          </div>

          <div className="about-text fade-in-on-scroll">
            <h2 className="section-title">Our Tea Story</h2>
            <p className="about-paragraph">
              At the heart of every cup lies a story — a tale steeped in the
              rich traditions of Assam’s tea gardens. From the vibrant fields to
              your teapot, our journey begins with handpicked leaves cultivated
              by dedicated farmers across Assam.
            </p>
            <p className="about-paragraph">
              We bring you signature blends like <strong style={{color:"#d3b20d"}}>Assam Delight</strong>,
              the warming <strong style={{color:"#d3b20d"}}>Masala Magic</strong>, and the aromatic{" "}
              <strong style={{color:"#d3b20d"}}>Cardamom Wonder</strong>, each crafted to offer a burst of
              freshness and authenticity. All our teas are directly sourced from
              local producers, ensuring purity, fairness, and bold, unforgettable
              flavors.
            </p>

            <div className="feature-cards fade-in-on-scroll">
              <FeatureCard
                title="Fresh From Assam"
                description="Sourced directly from cultivators"
                iconPath="M5 13l4 4L19 7"
              />
              <FeatureCard
                title="Signature Blends"
                description="Assam Delight, Masala Magic, and more"
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
