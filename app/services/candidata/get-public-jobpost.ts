import "server-only"
import prisma from "@/lib/prisma";

export async function getDataPublicJob() {
  const data = await prisma.job.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      salaryMin: true,
      salaryMax: true,
      employmentType: true,
      workplaceType: true,
      location: true,
      createdAt: true,
      salaryCurrency : true,
      company: {
        select: {
          id: true,
          logo: true,
          about: true,
          name: true,
          location: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export type getDataPublicJobType = Awaited<ReturnType<typeof getDataPublicJob>>[0];
export type getDataPublicJobTypeArray = Awaited<ReturnType<typeof getDataPublicJob>>