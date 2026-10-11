"use server";

import { z } from "zod";
import { requiredUser } from "./utils/requiredUser";
import { companySchema, jobSeekerSchema } from "./utils/zodSchema";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCompany(data: z.infer<typeof companySchema>) {
  const user = await requiredUser();
  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboadingCompleted: true,
      userType: "COMPANY",
      role: "COMPANY",
      company: {
        create: {
          ...validateData,
          logo: validateData.logo?.url ?? "",
          xAccount: validateData.xAccount ?? "",
        },
      },
    },
  });
  return redirect("/");
}

export async function createJobSeekerOnboading(
  data: z.infer<typeof jobSeekerSchema>,
) {
  const user = await requiredUser();
  const validateData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboadingCompleted: true,
      userType: "JOB_SEEKER",
      role: "JOB_SEEKER",
      jobSeeker: {
        create: {
          ...validateData,
          resume: validateData.resume?.url ?? "",
        },
      },
    },
  });
  return redirect("/");
}
