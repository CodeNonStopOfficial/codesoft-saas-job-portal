
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  BriefcaseBusiness,
  Building2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Start hiring with essential tools.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: BriefcaseBusiness,
    popular: false,
    features: [
      "1 active job posting",
      "Basic candidate profiles",
      "Standard job visibility",
      "Basic applicant management",
      "Email support",
    ],
    buttonText: "Get Started",
    href: "/employer/post-jobs",
  },
  {
    name: "Professional",
    description: "For growing teams hiring regularly.",
    monthlyPrice: 1499,
    yearlyPrice: 14990,
    icon: Sparkles,
    popular: true,
    features: [
      "10 active job postings",
      "Advanced candidate search",
      "Featured job listings",
      "Applicant tracking tools",
      "Candidate shortlist",
      "Priority email support",
    ],
    buttonText: "Choose Professional",
    href: "/subscription/checkout?plan=professional",
  },
  {
    name: "Business",
    description: "Powerful hiring for larger teams.",
    monthlyPrice: 3999,
    yearlyPrice: 39990,
    icon: Building2,
    popular: false,
    features: [
      "Unlimited job postings",
      "Advanced candidate filters",
      "Featured job listings",
      "Team hiring tools",
      "Hiring analytics",
      "Priority support",
    ],
    buttonText: "Choose Business",
    href: "/subscription/checkout?plan=business",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(price);

export function SubscriptionComponent() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Subscription plans
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Choose the plan that fits your hiring goals.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                billing === "monthly"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                billing === "yearly"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs">Save ~17%</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price =
              billing === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice;

            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border p-6 transition-colors sm:p-8 ${
                  plan.popular
                    ? "border-indigo-500 bg-white shadow-xl shadow-indigo-100/60 ring-1 ring-indigo-500 dark:bg-slate-900 dark:shadow-none"
                    : "border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md">
                    MOST POPULAR
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      plan.popular
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight">
                      ₹{formatPrice(price)}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      /{billing === "monthly" ? "month" : "year"}
                    </span>
                  </div>

                  {billing === "yearly" && price > 0 && (
                    <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
                      Equivalent to ₹{formatPrice(Math.round(price / 12))}/month
                    </p>
                  )}
                </div>

                <Link
                  href={plan.href}
                  className={`mt-7 flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-slate-200 bg-white text-slate-900 hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="my-7 border-t border-slate-200 dark:border-slate-800" />

                <p className="mb-4 text-sm font-semibold">
                  What&apos;s included
                </p>

                <ul className="flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-indigo-100 bg-linear-to-r from-indigo-50 to-sky-50 p-6 dark:border-indigo-900 dark:from-indigo-950/50 dark:to-slate-900 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="text-xl font-bold">
              Not sure which plan to choose?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Start with the free plan and upgrade as your hiring needs grow.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Talk to our team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
