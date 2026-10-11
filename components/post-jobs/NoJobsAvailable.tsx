"use client";

import { BriefcaseBusiness, SearchX, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function NoJobsAvailable() {
  const router = useRouter();

  return (
    <section
      role="status"
      aria-labelledby="no-jobs-title"
      className="relative flex min-h-80 w-full flex-col items-center justify-center
        overflow-hidden rounded-2xl border border-gray-200
        bg-white px-4 py-10 text-center shadow-sm
        transition-colors duration-300
        dark:border-gray-800 dark:bg-gray-950
        sm:min-h-90 sm:rounded-3xl sm:px-8 sm:py-14
        lg:min-h-100 lg:px-12"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40
          rounded-full bg-blue-100/60 blur-3xl
          dark:bg-blue-500/10 sm:h-56 sm:w-56"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40
          rounded-full bg-indigo-100/60 blur-3xl
          dark:bg-indigo-500/10 sm:h-56 sm:w-56"
      />

      {/* Icon */}
      <div
        className="relative mb-5 flex h-16 w-16 items-center justify-center
          rounded-2xl border border-blue-100 bg-blue-50 text-blue-600
          shadow-sm dark:border-blue-900/60 dark:bg-blue-950/60
          dark:text-blue-400 sm:mb-6 sm:h-20 sm:w-20 sm:rounded-3xl"
      >
        <SearchX
          className="h-8 w-8 sm:h-10 sm:w-10"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {/* Heading */}
      <h2
        id="no-jobs-title"
        className="relative mb-2 text-xl font-bold tracking-tight
          text-gray-900 dark:text-gray-100
          sm:mb-3 sm:text-2xl md:text-3xl"
      >
        No Jobs Available
      </h2>

      {/* Description */}
      <p
        className="relative mb-6 max-w-md text-sm leading-6
          text-gray-500 dark:text-gray-400
          sm:mb-8 sm:text-base sm:leading-7"
      >
        We couldn&apos;t find any job listings right now. New opportunities may
        be available soon. Please check back later.
      </p>

      {/* Refresh button */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          type="button"
          onClick={() => router.refresh()}
          className="relative inline-flex min-h-11 w-full max-w-xs items-center
          justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3
          text-sm font-semibold text-white shadow-sm
          transition-all duration-200
          hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-blue-500 focus-visible:ring-offset-2
          dark:focus-visible:ring-offset-gray-950
          active:translate-y-0
          sm:w-auto sm:min-w-44"
        >
          <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
          <span>Refresh Jobs</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Button>
        <Button
          type="button"
          onClick={() => router.push("post-jobs")}
          className="relative inline-flex min-h-11 w-full max-w-xs items-center
          justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3
          text-sm font-semibold text-white shadow-sm
          transition-all duration-200
          hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-blue-500 focus-visible:ring-offset-2
          dark:focus-visible:ring-offset-gray-950
          active:translate-y-0
          sm:w-auto sm:min-w-44"
        >
          <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
          <span>Post Jobs</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Button>
      </div>

      {/* Supporting text */}
      <p className="relative mt-4 text-xs text-gray-400 dark:text-gray-500">
        We&apos;re always looking for new opportunities.
      </p>
    </section>
  );
}
