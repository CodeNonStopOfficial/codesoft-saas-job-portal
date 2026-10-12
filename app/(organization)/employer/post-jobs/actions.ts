"use server";

import { requireCompany } from "@/app/utils/requiredCompany";
import { createJobSchema } from "@/app/utils/zodSchema";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createJobPostMethod(
  data: z.infer<typeof createJobSchema>,
): Promise<ApiResponse> {
  const user = await requireCompany();
  try {
    const validateData = createJobSchema.safeParse(data);


    if(!validateData.success){
         return {
             status : "error",
             message : "Job Schema Invalide Error..?"
         }
    }
    const company = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        user: {
          select: {
            onboadingCompleted: true,
          },
        },
      },
    });

    if (!company?.id) {
      redirect("/");
    }

    await prisma.job.create({
      data: {
        ...validateData.data,
        company: {
          connect: {
            id: company.id,
          },
        },
      },
    });
    return {
      status: "success",
      message: "Job Post Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Internal Job Creation Error",
    };
  }
}
export async function updateJobPostMethod(
  data: z.infer<typeof createJobSchema>,
  jobId:string
): Promise<ApiResponse> {
  const user = await requireCompany();
  try {
    const validateData = createJobSchema.safeParse(data);


    if(!validateData.success){
         return {
             status : "error",
             message : "Job Schema Invalide Error..?"
         }
    }
    const company = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        user: {
          select: {
            onboadingCompleted: true,
          },
        },
      },
    });

    if (!company?.id) {
      redirect("/");
    }

    await prisma.job.update({
      where : {
        id : jobId
      },
      data: {
        ...validateData.data,
        company: {
          connect: {
            id: company.id,
          },
        },
      },
    });
    return {
      status: "success",
      message: "Job Updated Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Internal Job Update Error",
    };
  }
}
