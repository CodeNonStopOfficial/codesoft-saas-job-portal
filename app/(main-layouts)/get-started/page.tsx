import { JobFilterComponent } from "@/components/common/JobPostFilter";
import {GetJobPostPublicHome} from "@/app/(main-layouts)/_components/GetJobPostPublicHome"

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <JobFilterComponent/>
       <div className="col-span-2 flex flex-col gap-6">
         <GetJobPostPublicHome/>
       </div>
    </div>
  );
}
