import { z } from "zod";

const uploadedFileSchema = z.object({
  url: z.string().url(),
  key: z.string(),
  name: z.string().optional(),
  size: z.number().optional(),
  type: z.string().optional(),
});

export const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  about: z
    .string()
    .min(10, "Please provide more information about your company"),
  logo: uploadedFileSchema.nullable(),
  website: z.string().url("Please enter a valid website URL"),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(10, "Please provide more information about yourself"),
  resume: uploadedFileSchema.nullable(),
});

export const createJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Job title must be at least 3 characters")
    .max(150, "Job title cannot exceed 150 characters"),
  department: z
    .string()
    .trim()
    .max(100, "Department cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .trim()
    .min(2, "Location is required")
    .max(150, "Location cannot exceed 150 characters"),

  workplaceType: z.enum(["ONSITE", "REMOTE", "HYBRID"]),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "TEMPORARY",
    "FREELANCE",
  ]),

  experienceLevel: z.enum([
    "ENTRY_LEVEL",
    "JUNIOR",
    "MID_LEVEL",
    "SENIOR",
    "LEAD",
    "EXECUTIVE",
  ]),
  salaryMin: z.number().min(1, "Salary from is required"),
  salaryMax: z.number().min(1, "Salary to is required"),
  benefits: z.array(z.string()).min(1, "Please select at least one benefit"),
  status: z.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "DRAFT",
    "PUBLISHED",
    "CLOSED",
    "ARCHIVED",
  ]),
  salaryCurrency: z.string().length(3, "Currency must be a 3-letter code"),
  openings: z.number().int().min(1, "At least one opening is required"),
  description: z
    .string()
    .trim()
    .min(30, "Description must be at least 30 characters")
    .max(1000, "Description cannot exceed 10000 characters"),
  salaryPeriod: z.string().min(1, "Salarey Period Requried"),
  skills: z
    .array(z.string().trim().min(1).max(50))
    .max(30, "You can add up to 30 skills"),
  requirements: z
    .string()
    .trim()
    .min(10, "Requirements must be at least 10 characters")
    .max(300, "Requirements cannot exceed 200 characters"),
});

export type CreateJobInputType = z.infer<typeof createJobSchema>;
