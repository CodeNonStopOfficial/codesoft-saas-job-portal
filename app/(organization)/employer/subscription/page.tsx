
"use client";

import { useState } from "react";

type Plan = {
  id: "monthly" | "yearly" | "lifetime";
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: 999,
    period: "/month",
    description: "For flexible hiring needs.",
    features: [
      "10 job posts per month",
      "2 featured job listings",
      "Candidate search",
      "Hiring analytics",
      "Email support",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 9999,
    period: "/year",
    description: "Best value for growing teams.",
    features: [
      "120 job posts per year",
      "24 featured job listings",
      "Candidate search",
      "Advanced hiring analytics",
      "Priority support",
    ],
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: 29999,
    period: "one-time",
    description: "Pay once, no recurring renewal.",
    features: [
      "300 job posts lifetime",
      "60 featured job listings",
      "Candidate search",
      "Advanced hiring analytics",
      "Priority support",
    ],
  },
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>("yearly");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  function handleChoosePlan(plan: Plan) {
    setSelectedPlan(plan.id);

    // Replace this with your authenticated checkout API.
    // Never trust the price supplied by the client.
    window.location.href = `/checkout?plan=${plan.id}`;
  }

  return (
    <section className="subscription">
      <div className="subscription-header">
        <span className="eyebrow">RECRUITER PRICING</span>
        <h1>Choose Your Hiring Plan</h1>
        <p>
          Find the right talent with flexible plans designed
          for businesses of every size.
        </p>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => {
          const popular = plan.id === "yearly";

          return (
            <article
              key={plan.id}
              className={`plan-card ${
                popular ? "popular" : ""
              }`}
            >
              {popular && (
                <span className="popular-badge">
                  MOST POPULAR
                </span>
              )}

              <h2>{plan.name}</h2>
              <p className="plan-description">
                {plan.description}
              </p>

              <div className="plan-price">
                {formatPrice(plan.price)}
                <span>{plan.period}</span>
              </div>

              {plan.id === "yearly" && (
                <p className="saving">
                  Save ₹1,989 vs 12 monthly payments
                </p>
              )}

              <button
                type="button"
                className={`plan-button ${
                  popular ? "primary" : ""
                }`}
                onClick={() => handleChoosePlan(plan)}
                aria-pressed={selectedPlan === plan.id}
              >
                Choose {plan.name}
              </button>

              <div className="feature-divider" />

              <ul className="feature-list">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <p className="subscription-note">
        Prices are illustrative and may exclude applicable taxes.
        Monthly and yearly plans renew only according to the
        subscription terms you configure. Lifetime access is
        subject to the stated plan limits and terms.
      </p>
    </section>
  );
}
