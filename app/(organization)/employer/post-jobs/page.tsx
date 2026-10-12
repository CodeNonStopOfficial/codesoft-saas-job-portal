import { Suspense } from "react";
import { PostJobForm } from "./_components/PostJobForm";

export default function PostJobPage() {
  return (
    <div className="max-w-full">
      <div className="w-full px-2 py-5">
         <Suspense fallback={<p>Loading...</p>}>
          <PostJobForm mode="create"/>
         </Suspense>
      </div>
    </div>
  );
}