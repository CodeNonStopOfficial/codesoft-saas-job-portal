import Link from "next/link";
import { getSingleJobDetalsPage } from "@/app/services/employer/getjob-details";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  DollarSign,
  MapPin,
  Users,
  Wallet,
  GraduationCap,
  Laptop,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface IAppProps {
  params: Promise<{ slug: string }>;
}

const cardClass =
  "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors sm:p-8 dark:border-slate-800 dark:bg-[#191919]";

const headingClass =
  "text-xl font-bold text-slate-950 sm:text-2xl dark:text-slate-100";

const mutedTextClass = "text-sm text-slate-500 dark:text-slate-400";

export default async function PostDetailsPage({ params }: IAppProps) {
  const { slug } = await params;
  const data = await getSingleJobDetalsPage(slug);

  if (!data) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <BriefcaseBusiness className="mx-auto mb-4 h-12 w-12 text-slate-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Job not found
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            This job may have been removed or is no longer available.
          </p>
          <Link
            href="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            <ArrowLeft size={16} />
            Browse jobs
          </Link>
        </div>
      </main>
    );
  }

  const skills = data.skills ?? [];
  const benefits = data.benefits ?? [];

  const salary =
    data.salaryMin != null && data.salaryMax != null
      ? `${data.salaryCurrency ?? ""} ${data.salaryMin.toLocaleString()} – ${data.salaryMax.toLocaleString()}`.trim()
      : data.salaryMin != null
        ? `${data.salaryCurrency ?? ""} ${data.salaryMin.toLocaleString()}+`.trim()
        : data.salaryMax != null
          ? `Up to ${data.salaryCurrency ?? ""} ${data.salaryMax.toLocaleString()}`.trim()
          : "Not disclosed";

  const jobFacts = [
    {
      label: "Employment type",
      value: data.employmentType || "Not specified",
      icon: BriefcaseBusiness,
    },
    {
      label: "Workplace",
      value: data.workplaceType || "Not specified",
      icon: Laptop,
    },
    {
      label: "Experience level",
      value: data.experienceLevel || "Not specified",
      icon: GraduationCap,
    },
    {
      label: "Open positions",
      value: data.openings ?? "Not specified",
      icon: Users,
    },
  ];

  return (
    <main className="min-h-screen text-slate-900 transition-colors duration-300  dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Job overview */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#191919]">
          <div className="h-1.5 bg-linear-to-r from-indigo-600 via-violet-500 to-sky-400" />

          <div className="bg-slate-50 p-5 sm:p-8 lg:p-10 dark:bg-[#191919]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                    {data.department || "General"}
                  </span>

                  {data.workplaceType && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                      {data.workplaceType}
                    </span>
                  )}
                </div>

                <h1 className="wrap-break-word text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                  {data.title}
                </h1>

                <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 dark:text-slate-300">
                  <span className="flex items-center gap-2">
                    <MapPin
                      size={17}
                      className="shrink-0 text-indigo-600 dark:text-indigo-400"
                    />
                    {data.location || "Location not specified"}
                  </span>

                  <span className="flex items-center gap-2">
                    <BriefcaseBusiness
                      size={17}
                      className="shrink-0 text-indigo-600 dark:text-indigo-400"
                    />
                    {data.employmentType || "Employment not specified"}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3
                      size={17}
                      className="shrink-0 text-indigo-600 dark:text-indigo-400"
                    />
                    {data.experienceLevel || "Experience not specified"}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <Wallet
                      size={16}
                      className="shrink-0 text-indigo-600 dark:text-indigo-400"
                    />
                    <span className="wrap-break-word">{salary}</span>
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Users
                      size={16}
                      className="shrink-0 text-indigo-600 dark:text-indigo-400"
                    />
                    {data.openings ?? "—"} opening(s)
                  </span>
                </div>
              </div>

              <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 sm:flex dark:bg-indigo-500/15">
                <Building2
                  size={38}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main content and sidebar */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="min-w-0 space-y-6 lg:col-span-2">
            {/* Job requirements */}
            <section className={cardClass}>
              <div className="mb-6">
                <h2 className={headingClass}>Job Requirements</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Job description and responsibilities
                </p>
              </div>

              <div className="w-full min-w-0 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-slate-700 dark:text-slate-300">
                {data.requirements || "No job description provided."}
              </div>
            </section>

            {/* Skills */}
            <section className={cardClass}>
              <div className="mb-5">
                <h2 className={headingClass}>Required Skills</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Skills relevant to this position
                </p>
              </div>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border border-indigo-100 bg-indigo-50/70 px-3.5 py-2 text-sm font-medium text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className={mutedTextClass}>No specific skills listed.</p>
              )}
            </section>

            {/* Benefits */}
            <section className={cardClass}>
              <div className="mb-5">
                <h2 className={headingClass}>Benefits &amp; Perks</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  What you can expect from this opportunity
                </p>
              </div>

              {benefits.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={mutedTextClass}>
                  No benefits listed for this position.
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-6 lg:sticky lg:top-6">
            {/* Apply card */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors sm:p-6 dark:border-slate-800 dark:bg-[#191919]">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Salary range
              </p>

              <div className="mt-2 flex items-start gap-2">
                <DollarSign
                  size={24}
                  className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400"
                />
                <p className="wrap-break-word text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {salary}
                </p>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Compensation details are based on the information provided for
                this position.
              </p>

              <div className="my-6 border-t border-slate-100 dark:border-slate-800" />

              <Link
                href={`/jobs/${slug}/apply`}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-slate-900"
              >
                Apply for this job
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <p className="mt-3 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                Review the job details before submitting your application.
              </p>
            </section>

            {/* Job facts */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors sm:p-6 dark:border-slate-800 dark:bg-[#191919]">
              <h2 className="text-lg font-bold text-slate-950 dark:text-slate-100">
                Job Overview
              </h2>

              <div className="mt-5 space-y-5">
                {jobFacts.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                      <Icon
                        size={19}
                        className="text-indigo-600 dark:text-indigo-400"
                      />
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {label}
                      </p>
                      <p className="mt-1 wrap-break-word text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors sm:p-6 dark:border-slate-800 dark:bg-[#191919]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/15">
                  <MapPin
                    size={21}
                    className="text-indigo-600 dark:text-indigo-400"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-slate-950 dark:text-slate-100">
                    Job Location
                  </h2>
                  <p className="mt-1 wrap-break-word text-sm text-slate-600 dark:text-slate-300">
                    {data.location || "Location not specified"}
                  </p>
                </div>
              </div>

              {data.workplaceType && (
                <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Workplace arrangement
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {data.workplaceType}
                  </p>
                </div>
              )}
            </section>
          </aside>
        </div>
        <section className={`max-w-full px-4 mt-3 ${cardClass}`}>
          <div className="mb-6">
            <h2 className={headingClass}>Job Requirements</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Job description and responsibilities
            </p>
          </div>

          <div className="w-full min-w-0 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-slate-700 dark:text-slate-300">
            {data.description || "No job description provided."}
          </div>
        </section>
        {/* Bottom navigation */}
        <div className="mt-8">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            <ArrowLeft size={16} />
            Explore more opportunities
          </Link>
        </div>
      </div>
    </main>
  );
}
