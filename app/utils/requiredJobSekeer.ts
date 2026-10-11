import "server-only";
import { redirect } from "next/navigation";
import { requiredUser } from "./requiredUser";
import prisma from "@/lib/prisma";


export async function requireJobSeeker() {
  const session = await requiredUser();

  if (!session?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image : true
    },
  });

  if (!user || user.role !== "JOB_SEEKER") {
    redirect("/unauthorized");
  }

  return user;
}