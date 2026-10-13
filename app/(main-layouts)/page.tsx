import { getDataPublicJob } from "../services/candidata/get-public-jobpost";
import { LeandingPageComponent } from "./_components/LeandingPageComponent";

export default async function HomePage(){
  const data = await getDataPublicJob();
  return (
     <div>
        <LeandingPageComponent data={data}/>
     </div>
  )
}