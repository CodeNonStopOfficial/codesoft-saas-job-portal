import { PostJobForm } from "@/app/(organization)/employer/post-jobs/_components/PostJobForm";
import { getSingleJobDetalsPage } from "@/app/services/employer/getjob-details";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface iAppPros {
  params: Promise<{ slug: string }>;
}

export default async function PostJobPage({ params }: iAppPros) {
  const { slug } = await params;
  const jobdate = await getSingleJobDetalsPage(slug);
  if (!jobdate) {
    return null;
  }
  return (
    <div className="max-w-full">
      <div className="w-full px-2 py-5">
        <Suspense fallback={<p>Loading...</p>}>
          <PostJobForm mode="update" initialData={jobdate} />
        </Suspense>
      </div>
    </div>
  );
}
