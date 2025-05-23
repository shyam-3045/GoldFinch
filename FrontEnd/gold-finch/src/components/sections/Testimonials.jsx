import { useEffect } from "react";
import Rating from "../common/Rating";

const testimonialData = [
  {
    name: "Arun",
    rating: 5,
    comment:
      "Assam Delight is truly fresh and flavorful! The strong, bold taste reminds me of authentic Assam teas. Perfect for my morning cup.",
  },
  {
    name: "Meena",
    rating: 4,
    comment:
      "I love the Cardamom Wonder blend — aromatic and just the right spice. Makes a great chai without overpowering the tea flavor.",
  },
  {
    name: "Karthik",
    rating: 5,
    comment:
      "Masala Magic is fantastic! The spices are well balanced, and the tea feels so fresh, like it came directly from Assam farmers.",
  },
  {
    name: "Divya",
    rating: 4,
    comment:
      "Really enjoy the freshness and quality here. You can tell these teas are directly imported from Assam producers. Smooth and rich.",
  },
  {
    name: "Sundar",
    rating: 5,
    comment:
      "Assam Delight lives up to its name — bold, fresh, and invigorating. I can taste the difference from regular store-bought teas.",
  },
  {
    name: "Anjali",
    rating: 4,
    comment:
      "Cardamom Wonder adds a lovely aroma and flavor to my daily tea routine. Always fresh and never bitter.",
  },
];

export default function Testimonials() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section className="testimonials-section fade-in-on-scroll">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            See why Assam tea lovers choose our signature blends.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonialData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card fade-in-on-scroll">
      <div className="testimonial-header">
        <div className="testimonial-avatar">
          <span className="avatar-initial">{testimonial.name.charAt(0)}</span>
        </div>
        <div className="testimonial-info">
          <h4 className="testimonial-name">{testimonial.name}</h4>
          <Rating rating={testimonial.rating} />
        </div>
      </div>
      <p className="testimonial-comment">"{testimonial.comment}"</p>
    </div>
  );
}
