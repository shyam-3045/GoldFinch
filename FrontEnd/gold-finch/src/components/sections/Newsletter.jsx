export default function Newsletter({ email, setEmail, handleSubscribe }) {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Join Our Tea Club</h2>
          <p className="newsletter-description">
            Subscribe to our newsletter for exclusive offers, brewing tips, and
            early access to new tea releases.
          </p>

          <div className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="newsletter-input"
            />
            <button onClick={handleSubscribe} className="newsletter-button">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
