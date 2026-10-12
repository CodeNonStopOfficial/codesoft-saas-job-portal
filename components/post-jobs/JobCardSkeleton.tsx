
export function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-black sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {/* Company logo */}
          <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800" />

          <div className="min-w-0 flex-1 space-y-3">
            {/* Job title */}
            <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800" />

            {/* Company name */}
            <div className="h-4 w-1/2 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Status badge */}
        <div className="h-6 w-16 shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-950" />
      </div>

      {/* Job details */}
      <div className="mt-5 flex flex-wrap gap-3">
        <div className="h-7 w-24 rounded-full bg-slate-100 dark:bg-slate-800" />
        <div className="h-7 w-28 rounded-full bg-slate-100 dark:bg-slate-800" />
        <div className="h-7 w-20 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Description */}
      <div className="mt-5 space-y-2">
        <div className="h-4 w-full rounded-md bg-slate-100 dark:bg-slate-800" />
        <div className="h-4 w-11/12 rounded-md bg-slate-100 dark:bg-slate-800" />
        <div className="h-4 w-2/3 rounded-md bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Skills */}
      <div className="mt-5 flex flex-wrap gap-2">
        <div className="h-6 w-16 rounded-md bg-slate-100 dark:bg-slate-800" />
        <div className="h-6 w-20 rounded-md bg-slate-100 dark:bg-slate-800" />
        <div className="h-6 w-14 rounded-md bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="h-5 w-28 rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-10 w-28 rounded-xl bg-indigo-100 dark:bg-indigo-950" />
      </div>
    </div>
  );
}
