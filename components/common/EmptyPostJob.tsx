
import { BriefcaseBusiness, Plus, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function PostJobEmpaty() {
  return (
    <Card className="flex min-h-80 flex-col items-center justify-center rounded-2xl border-dashed p-8 text-center shadow-sm">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-500/10">
        <BriefcaseBusiness className="h-8 w-8 text-violet-600 dark:text-violet-400" />
      </div>

      <h2 className="text-xl font-semibold tracking-tight">
        No jobs posted yet
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Start building your team by publishing your first job.
        Connect with talented candidates and find the right fit.
      </p>

      <Link
        href="/employer/jobs/create"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
      >
        <Plus className="h-4 w-4" />
        Post your first job
        <ArrowRight className="h-4 w-4" />
      </Link>

      <p className="mt-4 text-xs text-muted-foreground">
        It only takes a few minutes to get started.
      </p>
    </Card>
  );
}
