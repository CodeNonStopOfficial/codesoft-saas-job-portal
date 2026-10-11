import "server-only";
import { requireCompany } from "@/app/utils/requiredCompany";
import prisma from "@/lib/prisma";


export async function getAlljobEmployer() {
  const user = await requireCompany();

  const jobs = await prisma.job.findMany({
    where: {
      company: {
        userId: user.id,
      },
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          location: true,
          logo: true,
          xAccount: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return jobs;
}
export type getEmployerAlljobsType = Awaited<
  ReturnType<typeof getAlljobEmployer>
>[0];
