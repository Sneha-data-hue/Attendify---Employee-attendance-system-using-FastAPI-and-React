import logo from "../assets/logo.jpeg";
import { useEffect } from "react";
import "./Landing.css";
import dashboardImg from "../assets/dashboard.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {

const navigate = useNavigate();
const [showContact, setShowContact] = useState(false);
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".fade-in, .fade-up, .product-image img"
    );

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
}, []);

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
  <img src={logo} alt="Attendify Logo" />
</div>

        <div className="nav-links">
          {/* 👇 Scroll to Features */}
          <a href="#features">Features</a>

          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>

          <button
  className="nav-btn"
  onClick={() => navigate("/login")}
>
  Sign In
</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero fade-in">
        <h1>Attendance. Reinvented.</h1>
        <p>
          A universal attendance platform for companies,
          schools, colleges, and organizations.
        </p>

        <div className="hero-buttons">
          <button className="primary"  onClick={() => navigate("/signup?plan=starter")} >
            Get Started</button>
          <a href="#about" className="secondary">Learn More</a>
        </div>

        <div className="product-image">
          <img src={dashboardImg} alt="Attendify Dashboard" />
        </div>
      </section>

     {/* ABOUT SECTION */}
<section id="about" className="about">
  <div className="about-container">

    <h2 className="about-title">
      Smart attendance for the modern world.
    </h2>

    <p className="about-text">
      Attendify is a universal attendance platform designed for
      companies, schools, colleges, and events. Using AI-powered
      technologies like face recognition, GPS validation, and
      real-time analytics, Attendify eliminates manual tracking
      and brings accuracy to attendance management.
    </p>

    <p className="about-text">
      From startups to enterprises, Attendify adaps to your
      organization’s workflow — making attendance seamless,
      automated, and reliable.
    </p>

  </div>
</section>

      {/* FEATURES SECTION */}
      {/* 👇 IMPORTANT ID ADDED */}
      <section id="features" className="features">
        <div className="features-container">

          <h2 className="features-title">
            Powerful features.
            <br />
            Built for every organization.
          </h2>

          <p className="features-subtitle">
            From startups to enterprises — Attendify adapts to your workflow.
          </p>

          <div className="features-grid">

            <div className="feature-card">
              <h3>Face Recognition</h3>
              <p>Automatic attendance using AI-powered face detection.</p>
            </div>

            <div className="feature-card">
              <h3>Real-time Dashboard</h3>
              <p>Monitor attendance, analytics, and reports instantly.</p>
            </div>

            <div className="feature-card">
              <h3>GPS Tracking</h3>
              <p>Ensure attendance from valid locations only.</p>
            </div>

            <div className="feature-card">
              <h3>Multi-Organization</h3>
              <p>Manage companies, schools, or events in one platform.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
<section id="solutions" className="solutions ">

  <div className="solutions-container">

    <h2 className="solutions-title">
      Solutions for every organization.
    </h2>

    <p className="solutions-subtitle">
      From startups to universities — Attendify adapts to your needs.
    </p>

    <div className="solutions-grid">

      <div className="solution-card">
        <h3>For Companies</h3>
        <p>Track employee attendance, shifts, and productivity in real time.</p>
      </div>

      <div className="solution-card">
        <h3>For Colleges</h3>
        <p>Manage student attendance with automated reporting.</p>
      </div>

      <div className="solution-card">
        <h3>For Schools</h3>
        <p>Ensure accurate attendance with easy monitoring tools.</p>
      </div>

      <div className="solution-card">
        <h3>For Events</h3>
        <p>Handle large-scale attendance for seminars and conferences.</p>
      </div>

    </div>

  </div>

</section>

{/* PRICING SECTION */}
<section id="pricing" className="pricing">

  <div className="pricing-container">

    <h2 className="pricing-title">
      Simple pricing.
      <br />
      For every organization.
    </h2>

    <p className="pricing-subtitle">
      Start free. Upgrade as you grow.
    </p>

    <div className="pricing-grid">

      {/* STARTER */}
      <div className="price-card">
        <h3>Starter</h3>
        <p className="price">Free</p>
        <ul>
          <li>Up to 5 users</li>
          <li>Basic attendance</li>
          <li>Email support</li>
        </ul>

        <button
          className="price-btn"
          onClick={() => navigate("/signup?plan=starter")} >
          Start Free Trial
        </button>
      </div>

      {/* PROFESSIONAL */}
      <div className="price-card highlight">
        <h3>Professional</h3>
        <p className="price">₹999 / month</p>
        <ul>
          <li>Unlimited users</li>
          <li>Face recognition</li>
          <li>Analytics dashboard</li>
          <li>Priority support</li>
        </ul>

        <button
          className="price-btn"
          onClick={() => navigate("/pricingpage?plan=professional")}
        >
          Choose Plan
        </button>
      </div>

      {/* ENTERPRISE */}
      <div className="price-card">
        <h3>Enterprise</h3>
        <p className="price">Custom</p>
        <ul>
          <li>Multi-organization</li>
          <li>Custom integrations</li>
          <li>Dedicated support</li>
        </ul>

        <button
          className="price-btn"
          onClick={() => setShowContact(true)}
        >
          Contact Us
        </button>
      </div>

    </div>
  </div>
</section>

      {/* BLACK SECTION */}
      <section className="section dark fade-up">
        <h2>One platform. Every organization.</h2>
        <p>
          From startups to universities — Attendify adapts
          to your workflow.
        </p>
      </section>

      {showContact && (
  <div className="modal">
    <div className="modal-content">
      <h2>Contact Sales</h2>

      <input placeholder="Name" /><br /><br />
      <input placeholder="Organization" /><br /><br />
      <input placeholder="Email" /><br /><br />
      <textarea placeholder="Requirements"></textarea><br /><br />

      <button>Send Request</button>
      <button onClick={() => setShowContact(false)}>Close</button>
    </div>
  </div>
)}

      <footer className="footer">
        <p>© 2026 Attendify</p>
      </footer>

    </div>
  );
}