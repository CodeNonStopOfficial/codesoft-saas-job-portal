import prisma from "@/lib/prisma";
import { requiredUser } from "../utils/requiredUser";
import OnboardingForm from "./_components/OnboardingForm";
import { redirect } from "next/navigation";


async function checkIfUserHasOnboadingCompleted(userId:string){

  const user = await prisma.user.findUnique({
     where : {
       id : userId
     },
     select : {
       onboadingCompleted : true
     }
  });
  if(user?.onboadingCompleted === true){
     return redirect("/")
  };
  return user;
}

export default async function OnboadingPage() {
  const user = await requiredUser();
  await checkIfUserHasOnboadingCompleted(user.id as string);
  return (
    <div className="max-w-full px-4 py-10 flex flex-col items-center justify-center">
      <OnboardingForm />
    </div>
  );
}
