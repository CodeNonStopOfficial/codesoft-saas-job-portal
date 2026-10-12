import { getAlljobEmployer } from "@/app/services/employer/getjob-all-peruser";
import NoJobsAvailable from "@/components/post-jobs/NoJobsAvailable";
import { Card, CardContent } from "@/components/ui/card";
import { PublicJobPostCard } from "../_components/PublicJobPostCard";
import { Suspense } from "react";
import { JobCardSkeleton } from "@/components/post-jobs/JobCardSkeleton";

export const dynamic = "force-dynamic";

export default function GetAllEmployerJobs() {
  return (
    <>
      <Card className="max-w-full mt-6 md:mt-4">
        <CardContent>
          <Suspense fallback={<LoadingSkeleton/>}>
            <JobPostCard />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
}

async function JobPostCard() {
  const data = await getAlljobEmployer();
  if (data.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <NoJobsAvailable />
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((data) => (
        <PublicJobPostCard key={data.id} data={data} />
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
}
