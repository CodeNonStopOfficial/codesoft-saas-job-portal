import { requireCompany } from "@/app/utils/requiredCompany";
import prisma from "@/lib/prisma";
import "server-only";

export async function getSingleJobDetalsPage(jobId: string) {
  await requireCompany();

  const singlejob = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });
  return singlejob;
}

export type GetSingleJobDetalsType = NonNullable<
  Awaited<ReturnType<typeof getSingleJobDetalsPage>>
>;
