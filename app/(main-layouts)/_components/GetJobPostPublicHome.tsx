
import { getDataPublicJob } from "@/app/services/candidata/get-public-jobpost";
import { PostJobEmpaty } from "@/components/common/EmptyPostJob";
import { PublicPerCardJobComponent } from "@/components/common/PublicPerCardJob";

export async function GetJobPostPublicHome() {
  const data = await getDataPublicJob();

  return (
    <div>
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((data) => (
            <PublicPerCardJobComponent key={data.id} data={data}/>
          ))}
        </div>
      ) : (
        <div>
          <PostJobEmpaty />
        </div>
      )}
    </div>
  );
}
