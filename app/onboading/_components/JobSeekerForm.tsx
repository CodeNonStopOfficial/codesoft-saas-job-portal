"use client";

import { jobSeekerSchema } from "@/app/utils/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { MediaUploader } from "@/components/common/media-uploader";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { createJobSeekerOnboading } from "@/app/actions";

export function JobSeekerForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: "",
      about: "",
      resume: null,
    },
  });
  async function onSubmit(data: z.infer<typeof jobSeekerSchema>) {
    try {
      setPending(true);
      await createJobSeekerOnboading(data);
      console.log(data);
      toast.add({
        type: "success",
        title: "Company Created Sucessfully",
      });
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.add({
          type: "error",
          title: "Something Wrong",
        });
      }
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="max-w-5xl">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="space-y-2">
          <div className="max-w-full">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter a Name"
                    autoComplete="off"
                    className="flex w-full"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="about"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>User About</FieldLabel>{" "}
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Tell us a little about yourself, what you do, and what makes you unique..."
                  className="min-h-22 resize-none"
                />
                <FieldDescription>
                  A short description that helps people understand your
                  information.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="resume"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Company Logo</FieldLabel>
                <MediaUploader
                  endpoint="pdfUploader"
                  accept="application/pdf"
                  maxSize="Maximum 8MB"
                  value={field.value}
                  onChange={field.onChange}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex items-center justify-start gap-2">
            <Button
              type="button"
              variant="outline"
              className="px-6 py-4.5"
              onClick={() => router.back()}
            >
              Skip
            </Button>
            <Button disabled={pending} type="submit" className="px-6 py-4.5">
              {pending ? "Loading..." : "Onboading"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
