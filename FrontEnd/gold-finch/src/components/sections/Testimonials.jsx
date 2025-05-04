import { testimonials } from "../../data/testimonials";
import Rating from "../common/Rating";

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            Discover why tea enthusiasts choose our premium tea collections.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-avatar">
          <span className="avatar-initial">{testimonial.name.charAt(0)}</span>
        </div>
        <div className="testimonial-info">
          <h4 className="testimonial-name">{testimonial.name}</h4>
          <Rating rating={5} />
        </div>
      </div>
      <p className="testimonial-comment">"{testimonial.comment}"</p>
    </div>
  );
}
