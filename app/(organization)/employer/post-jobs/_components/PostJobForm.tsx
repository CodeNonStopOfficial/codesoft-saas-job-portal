"use client";

import { createJobSchema } from "@/app/utils/zodSchema";
import { BenefitsInput } from "@/components/post-jobs/BanifitsInputBox";
import { SkillsInput } from "@/components/post-jobs/SkiilsInputBox";
import { TiptapRichTextEditor } from "@/components/tiptap/TipTapRichTextEditor";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Wallet,
  FileText,
  Send,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createJobPostMethod, updateJobPostMethod } from "../actions";
import { tryCatch } from "@/hooks/try-catchs";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { GetSingleJobDetalsType } from "@/app/services/employer/getjob-details";

type JobFormInput = z.input<typeof createJobSchema>;
type JobFormOutput = z.output<typeof createJobSchema>;

const employmentOptions = [
  { value: "FULL_TIME", label: "Full-time" },
  { value: "PART_TIME", label: "Part-time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "FREELANCE", label: "Freelance" },
] as const;

const experienceOptions = [
  { value: "ENTRY_LEVEL", label: "Entry level" },
  { value: "JUNIOR", label: "Junior" },
  { value: "MID_LEVEL", label: "Mid level" },
  { value: "SENIOR", label: "Senior" },
  { value: "LEAD", label: "Lead" },
  { value: "EXECUTIVE", label: "Executive" },
] as const;

export const jobStatusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Closed", value: "CLOSED" },
  { label: "Archived", value: "ARCHIVED" },
] as const;

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-tight sm:text-lg">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

type PostJobFormProps = {
  mode: "create" | "update";
  initialData?: GetSingleJobDetalsType;
  jobId?: string;
};

export function PostJobForm({ mode, initialData, jobId }: PostJobFormProps) {
  const isEdit = mode === "update";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<JobFormInput, unknown, JobFormOutput>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      department: initialData?.department ?? "",
      location: initialData?.location ?? "",
      workplaceType: initialData?.workplaceType ?? "REMOTE",
      employmentType: initialData?.employmentType ?? "FULL_TIME",
      experienceLevel: initialData?.experienceLevel ?? "ENTRY_LEVEL",
      salaryMin: initialData?.salaryMin ?? undefined,
      salaryMax: initialData?.salaryMax ?? undefined,
      benefits: initialData?.benefits ?? [],
      status: initialData?.status ?? "DRAFT",
      salaryCurrency: initialData?.salaryCurrency ?? "INR",
      openings: initialData?.openings ?? 1,
      description: initialData?.description ?? "",
      salaryPeriod: initialData?.salaryPeriod ?? "YEARLY",
      skills: initialData?.skills ?? [],
      requirements: initialData?.requirements ?? "",
    },
  });

  function onSubmit(value: JobFormOutput) {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        isEdit
          ? updateJobPostMethod(value, initialData!.id)
          : createJobPostMethod(value),
      );
      if (error) {
        toast.add({
          type: "error",
          title: "Unexpected Error Please Try Again",
        });
        return;
      }
      if (data.status === "success") {
        toast.add({
          type: "success",
          title: data?.message,
        });
        if (isEdit) {
          router.push("/employer/manage-jobs");
        } else {
          form.reset();
          router.push("/employer/manage-jobs");
        }
      } else if (data.status === "error") {
        toast.add({
          type: "error",
          title: data?.message,
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <BriefcaseBusiness className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {isEdit ? "Edit Job Post" : "Create Job Post"}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Find your next great hire. Add the job details below to create
              your listing on CareerHub.
            </p>
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-500" />
          Job listing form
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic details */}
        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
          <CardContent className="p-5 sm:p-7 lg:p-8">
            <SectionHeading
              icon={Building2}
              title="Basic Information"
              description="Start with the role name and where the job is based."
            />

            <FieldGroup className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Job Title <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      id={field.name}
                      placeholder="e.g. Full Stack Developer"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      className="h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="department"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Department</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      id={field.name}
                      placeholder="e.g. Engineering"
                      aria-invalid={fieldState.invalid}
                      className="h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="location"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Job Location <span className="text-destructive">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={field.name}
                        placeholder="Patna, Bihar"
                        aria-invalid={fieldState.invalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Job preferences */}
        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
          <CardContent className="p-5 sm:p-7 lg:p-8">
            <SectionHeading
              icon={BriefcaseBusiness}
              title="Job Preferences"
              description="Define the employment arrangement and experience level."
            />

            <FieldGroup className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <Controller
                name="workplaceType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Workplace Type</FieldLabel>
                    <Select
                      value={field.value ?? "REMOTE"}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select workplace" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ONSITE">On-site</SelectItem>
                        <SelectItem value="REMOTE">Remote</SelectItem>
                        <SelectItem value="HYBRID">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="employmentType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Employment Type</FieldLabel>
                    <Select
                      value={field.value ?? "FULL_TIME"}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="experienceLevel"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Experience Level</FieldLabel>
                    <Select
                      value={field.value ?? "ENTRY_LEVEL"}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="openings"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Number of Openings
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      type="number"
                      min={1}
                      value={field.value ?? 1}
                      onChange={(event) => {
                        const value = event.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value),
                        );
                      }}
                      className="h-11"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Salary */}
        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
          <CardContent className="p-5 sm:p-7 lg:p-8">
            <SectionHeading
              icon={Wallet}
              title="Salary & Compensation"
              description="Share a salary range to help candidates understand the opportunity."
            />

            <FieldGroup className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {(["salaryMin", "salaryMax"] as const).map((name) => (
                <Controller
                  key={name}
                  name={name}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        {name === "salaryMin"
                          ? "Minimum Salary"
                          : "Maximum Salary"}
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        type="number"
                        min={0}
                        value={field.value ?? ""}
                        onChange={(event) => {
                          const value = event.target.value;
                          field.onChange(
                            value === "" ? undefined : Number(value),
                          );
                        }}
                        placeholder={name === "salaryMin" ? "300000" : "800000"}
                        className="h-11"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ))}

              <Controller
                name="salaryCurrency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Currency</FieldLabel>
                    <Select
                      value={field.value ?? "INR"}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="salaryPeriod"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Salary Period</FieldLabel>
                    <Select
                      value={field.value || "YEARLY"}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YEARLY">Per year</SelectItem>
                        <SelectItem value="MONTHLY">Per month</SelectItem>
                        <SelectItem value="PER_DAY">Per day</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <p className="mt-4 text-xs text-muted-foreground">
              Leave salary fields empty if compensation is negotiable.
            </p>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
          <CardContent className="p-5 sm:p-7 lg:p-8">
            <SectionHeading
              icon={FileText}
              title="Job Description"
              description="Explain the role and what candidates need to bring."
            />

            <FieldGroup className="space-y-5">
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Job Description
                    </FieldLabel>

                    <TiptapRichTextEditor field={field as any} />
                    <FieldDescription>
                      Provide a clear overview of the position.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="requirements"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Requirements</FieldLabel>
                    <TiptapRichTextEditor field={field as any} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
          <CardContent className="p-5 sm:p-7 lg:p-8">
            <SectionHeading
              icon={BriefcaseBusiness}
              title="Skills & Benefits"
              description="Add the skills and benefits associated with this role."
            />

            <FieldGroup className="space-y-6">
              <Controller
                name="skills"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Required Skills</FieldLabel>

                    <SkillsInput
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="e.g. React, Node.js, SQL"
                      maxSkills={30}
                    />
                    <FieldDescription>
                      Separate skills with commas.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="benefits"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Benefits</FieldLabel>
                    <BenefitsInput
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="e.g. Health Insurance, Remote Work"
                      maxBenefits={30}
                    />
                    <FieldDescription>
                      Enter benefits separated by commas.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Job Status</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full py-5 h-11">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobStatusOptions.map((data) => (
                            <SelectItem key={data.label} value={data.value}>
                              {data.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Form actions */}
        <div className="sticky bottom-0 z-10 -mx-4 flex flex-col gap-3 border-t bg-background/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:flex-row sm:justify-end sm:rounded-xl sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <button
            type="button"
            onClick={() => form.reset()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                {isEdit ? <span>Update</span> : <span>Submit</span>}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
