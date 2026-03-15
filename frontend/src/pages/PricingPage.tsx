import { useState } from "react";
import "./PricingPage.css";

export default function PricingPage() {

  const [yearly, setYearly] = useState(false);

  return (
    <div className="pricing-page">

      <h1>Choose your plan</h1>
      <p>Select the best option for your organization</p>

      {/* TOGGLE */}
      <div className="billing-toggle">
        <span className={!yearly ? "active" : ""}>Monthly</span>

        <label className="switch">
          <input
            type="checkbox"
            onChange={() => setYearly(!yearly)}
          />
          <span className="slider"></span>
        </label>

        <span className={yearly ? "active" : ""}>Yearly</span>
      </div>


      {/* PLANS */}
      <div className="plans">

        {/* BASIC */}
        <div className="plan-card">
          <h2>Basic</h2>
          <p className="price">
            {yearly ? "₹2999 / year" : "₹299 / month"}
          </p>

          <p className="best-for">Best for Events & Small Teams</p>

          <ul>
            <li>Up to 50 users</li>
            <li>Basic attendance</li>
            <li>Email support</li>
            <li>{yearly ? "12 months validity" : "Monthly renewal"}</li>
          </ul>

          <button>Choose Plan</button>
        </div>


        {/* PROFESSIONAL */}
        <div className="plan-card highlight">
          <h2>Professional</h2>
          <p className="price">
            {yearly ? "₹9999 / year" : "₹999 / month"}
          </p>

          <p className="best-for">Best for Colleges & Companies</p>

          <ul>
            <li>Unlimited users</li>
            <li>Face recognition</li>
            <li>Analytics dashboard</li>
            <li>{yearly ? "Priority support" : "Standard support"}</li>
          </ul>

          <button>Choose Plan</button>
        </div>


        {/* ENTERPRISE */}
        <div className="plan-card">
          <h2>Enterprise</h2>
          <p className="price">Custom Pricing</p>

          <p className="best-for">Best for Large Organizations</p>

          <ul>
            <li>Multi-organization</li>
            <li>Custom integrations</li>
            <li>Dedicated support</li>
            <li>Contract-based renewal</li>
          </ul>

          <button>Contact Sales</button>
        </div>

      </div>

    </div>
  );
}