"use client";

import { companySchema } from "@/app/utils/zodSchema";
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
import { createCompany } from "@/app/actions";
import { toast } from "@/components/ui/toast";

export function CompanyForm() {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      location: "",
      about: "",
      logo: null,
      website: "",
      xAccount: "",
    },
  });
  async function onSubmit(data: z.infer<typeof companySchema>) {
    try {
      setPending(true);
      await createCompany(data);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Company Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter a Company Name"
                    autoComplete="off"
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
                  <FieldLabel htmlFor={field.name}>Company Location</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter a Company Location"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="website"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Company Website</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="https://www.website.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="xAccount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    X (Twitter Account)
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="https://www.x-account.com"
                    autoComplete="off"
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
                <FieldLabel htmlFor={field.name}>
                  Company Information
                </FieldLabel>{" "}
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Tell us a little about your company, what you do, and what makes you unique..."
                  className="min-h-32 resize-none"
                />
                <FieldDescription>
                  A short description that helps people understand your company.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="logo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Company Logo</FieldLabel>
                <MediaUploader
                  endpoint="imageUploader"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  maxSize="Maximum 4MB"
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
              {pending ? "Loading..." : "Create Company"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
