"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Lightbulb,
  Wrench,
  Search,
  MapPin,
  Code2,
  Rocket,
  FileText,
  Users,
  CheckCircle2,
  Bookmark,
  Star,
  Menu,
  X,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDataPublicJobTypeArray } from "@/app/services/candidata/get-public-jobpost";
import Image from "next/image";

const features = [
  {
    title: "Find Your Dream Job",
    description:
      "Explore full-time, part-time, and remote opportunities from leading companies.",
    href: "/get-started",
    icon: BriefcaseBusiness,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950",
  },
  {
    title: "Explore Internships",
    description:
      "Gain practical experience and start building your professional career.",
    href: "/internships",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950",
  },
  {
    title: "Learn New Skills",
    description:
      "Develop in-demand skills with learning resources and interview preparation.",
    href: "/learning",
    icon: Lightbulb,
    color: "bg-violet-100 text-violet-700 dark:bg-violet-950",
  },
  {
    title: "Career Tools",
    description:
      "Prepare your resume, improve your profile, and get ready for interviews.",
    href: "/career-tools",
    icon: Wrench,
    color: "bg-orange-100 text-orange-700 dark:bg-orange-950",
  },
];



const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up and build your professional profile.",
    icon: Users,
  },
  {
    number: "02",
    title: "Explore Opportunities",
    description: "Find jobs, internships, and courses that match your goals.",
    icon: Search,
  },
  {
    number: "03",
    title: "Apply & Learn",
    description: "Apply for opportunities and develop valuable skills.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Grow Your Career",
    description: "Gain experience and move closer to your dream career.",
    icon: Rocket,
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    quote:
      "CareerHub made my job search easier and helped me discover opportunities that matched my skills.",
  },
  {
    name: "Priya Singh",
    role: "Product Intern",
    quote:
      "I found an internship and improved my interview preparation using the learning resources.",
  },
  {
    name: "Amit Verma",
    role: "UI/UX Designer",
    quote:
      "The career resources helped me improve my portfolio and feel more confident in interviews.",
  },
];

const popularSearches = [
  "React Developer",
  "Python",
  "Frontend Developer",
  "Data Analyst",
  "UI/UX Design",
];

interface iAppPross {
  data: getDataPublicJobTypeArray;
}

export function LeandingPageComponent({ data }: iAppPross) {
  const [search, setSearch] = useState("");
 
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b ">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 left-1/3 size-80 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
          <div>
            <Badge className="mb-6 rounded-full px-3 py-1">
              YOUR CAREER PARTNER
            </Badge>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find Your <span className="text-primary">Dream Job.</span>
              <br />
              Build a Better Future.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Discover exciting job opportunities, gain in-demand skills,
              prepare for interviews, and grow your career — all in one place.
            </p>


            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium text-muted-foreground">
                Popular:
              </span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearch(term)}
                  className="rounded-full border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-8">
              {[
                ["10k+", "Career opportunities"],
                ["500+", "Hiring companies"],
                ["Free", "Career resources"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-md py-8 lg:py-0">
            <div className="absolute inset-8 rounded-full bg-primary/10 blur-2xl" />

            <div className="relative rounded-4xl border bg-background/80 p-5 shadow-xl backdrop-blur sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Your next chapter
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    Career opportunities
                  </h2>
                </div>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Rocket className="size-6" />
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: BriefcaseBusiness,
                    title: "Find Jobs",
                    subtitle: "Explore career opportunities",
                    color: "bg-blue-100 text-blue-700",
                    href: "/get-started",
                  },
                  {
                    icon: GraduationCap,
                    title: "Get Experience",
                    subtitle: "Discover internships",
                    color: "bg-emerald-100 text-emerald-700",
                    href: "/internships",
                  },
                  {
                    icon: Code2,
                    title: "Build Skills",
                    subtitle: "Learn and practice",
                    color: "bg-violet-100 text-violet-700",
                    href: "/learning",
                  },
                ].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-4 rounded-2xl border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <item.icon className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{item.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {item.subtitle}
                      </span>
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-primary/5 p-4">
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  One platform to discover, learn, and grow.
                </p>
              </div>
            </div>

            <div className="absolute -left-5 top-0 hidden items-center gap-2 rounded-xl border bg-background p-3 shadow-lg sm:flex">
              <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Keep growing</p>
                <p className="text-xs text-muted-foreground">
                  Your journey starts here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company strip */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Explore opportunities across leading industries and companies
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {["Microsoft", "Google", "Amazon", "TCS", "Infosys", "Adobe"].map(
              (company) => (
                <span
                  key={company}
                  className="text-lg font-bold tracking-tight text-muted-foreground/80"
                >
                  {company}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            ONE PLATFORM, MORE POSSIBILITIES
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to grow your career
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            From your first internship to your next big opportunity, CareerHub
            helps you move forward with confidence.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="group">
              <Card className="h-full border-border/70 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                <CardContent className="p-6">
                  <span
                    className={`mb-5 flex size-12 items-center justify-center rounded-2xl ${feature.color}`}
                  >
                    <feature.icon className="size-6" />
                  </span>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                    Explore
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Jobs and internships */}
      <section className="border-y bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Jobs */}
            <div>
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-primary">
                    CAREER OPPORTUNITIES
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">Popular jobs</h2>
                </div>
                <div>
                  <Link
                    href="/get-started"
                    className={buttonVariants({
                      variant: "outline",
                      className: "flex items-center gap-2",
                    })}
                  >
                    <ArrowRight className="size-4" />
                    <span>View All</span>
                  </Link>
                </div>
              </div>

              <Card className="overflow-hidden border-border/70">
                <CardContent className="p-0">
                  {data.map((job, index) => (
                    <div
                      key={job.title}
                      className={`flex items-center gap-3 p-4 transition-colors hover:bg-muted/50 sm:gap-4 sm:p-5 ${
                        index !== data.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl font-bold`}
                      >
                        <Image
                          src={job.company.logo}
                          alt="logo"
                          width={40}
                          height={40}
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/job-information/${job.id}`}
                          className="font-semibold hover:text-primary"
                        >
                          {job.title}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {job.company.name}
                        </p>
                        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3" />
                            {job.location}
                          </span>
                          <span>·</span>
                          <span>{job.workplaceType}</span>
                          <span>·</span>
                          <span>
                            {job.salaryCurrency} : {job.salaryMin} to{" "}
                            {job.salaryMax}
                          </span>
                        </p>
                      </div>
                      <div>
                        <Link
                          href={`/job-information/${job.id}`}
                          className={buttonVariants({
                            variant: "outline",
                            className: "flex items-center gap-2",
                          })}
                        >
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Internships */}
            <div>
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-primary">
                    START YOUR JOURNEY
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">Top internships</h2>
                </div>
                <div>
                  <Link
                    href="/internships"
                    className={buttonVariants({
                      variant: "outline",
                      className: "flex items-center gap-2",
                    })}
                  >
                    <ArrowRight className="size-4" />
                    View All
                  </Link>
                </div>
              </div>

              <Card className="overflow-hidden border-border/70">
                <CardContent className="p-0">
                  {data.map((jobs, index) => (
                    <div
                      key={jobs.title}
                      className={`flex items-center gap-3 p-4 transition-colors hover:bg-muted/50 sm:gap-4 sm:p-5 ${
                        index !== data.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl font-bold`}
                      >
                        <Image
                          src={jobs.company.logo}
                          alt="logo"
                          width={40}
                          height={40}
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href="/internships"
                          className="font-semibold hover:text-primary"
                        >
                          {jobs.title}
                        </Link>
                        <div className="flex items-center gap-2">
                          <p className="mt-1 text-sm text-muted-foreground">
                            {jobs.company.name}
                          </p>
                          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="size-3" />
                              {jobs.location}
                            </span>
                            <span>·</span>
                            <span>3 Mounths</span>
                          </p>
                          <p className="mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                            {jobs.salaryCurrency}:{jobs.salaryMin}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Link
                          href="/internships"
                          className={buttonVariants({
                            variant: "outline",
                            className: "flex items-center gap-2",
                          })}
                        >
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Learning CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-700 via-primary to-indigo-600 px-6 py-10 text-primary-foreground sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full border-40 border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 size-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <Badge className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                <GraduationCap className="mr-1 size-3.5" />
                Career development
              </Badge>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Your next opportunity starts with your next skill.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/80">
                Practice coding, prepare for interviews, explore courses, and
                become a stronger candidate with CareerHub Learning.
              </p>
              <Link
                href="/learning"
                className={buttonVariants({
                  variant: "outline",
                  className: "px-4 py-4.5 flex items-center gap-2 mt-4",
                })}
              >
                Explore learning resources
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>

            <div className="hidden rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur sm:block">
              <GraduationCap className="size-20" />
              <p className="mt-5 text-xl font-bold">Learn. Practice. Grow.</p>
              <p className="mt-2 max-w-52 text-sm text-white/75">
                Make every learning experience count.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <Badge variant="secondary" className="mb-4">
              YOUR JOURNEY
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              Get started in four simple steps
            </h2>
            <p className="mt-4 text-muted-foreground">
              A clearer path from discovering opportunities to growing your
              career.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <Card className="h-full border-border/70 bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <step.icon className="size-6" />
                      </span>
                      <span className="text-3xl font-bold text-muted-foreground/25">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-6 font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <Badge variant="secondary" className="mb-4">
            COMMUNITY
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">
            Built for your next big step
          </h2>
          <p className="mt-4 text-muted-foreground">
            Make the most of tools and opportunities designed to support your
            career journey.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-border/70">
              <CardContent className="p-6">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border bg-muted/30 px-6 py-12 text-center sm:px-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to take the next step?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Discover opportunities, learn new skills, and start building the
            career you want.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/jobs"
              className={buttonVariants({
                variant: "outline",
                className: "px-4 py-4.5 flex items-center gap-2",
              })}
            >
              Explore jobs
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/register"
              className={buttonVariants({
                variant: "default",
                className: "px-4 py-4.5 flex items-center gap-2",
              })}
            >
              Create your account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
