import { getDataPublicJob } from "@/app/services/candidata/get-public-jobpost";

export default async function InternshipPage() {
  const data = await getDataPublicJob();
  return (
    <div>
       <h1>Home Page</h1>
    </div>
  );
}
