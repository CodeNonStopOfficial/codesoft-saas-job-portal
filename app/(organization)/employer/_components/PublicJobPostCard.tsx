import { getEmployerAlljobsType } from "@/app/services/employer/getjob-all-peruser";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Users,
  Wallet,
  CalendarDays,
  Eye,
  Building2,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: getEmployerAlljobsType;
}

function formatLabel(value?: string | null) {
  if (!value) return "Not specified";

  return value
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatSalary(
  min?: number | null,
  max?: number | null,
  currency = "INR"
) {
  if (min == null && max == null) return "Not disclosed";

  const formatter = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);

  if (min != null && max != null) {
    return `${formatter(min)} – ${formatter(max)}`;
  }

  if (min != null) return `From ${formatter(min)}`;

  return `Up to ${formatter(max!)}`;
}

export function PublicJobPostCard({ data }: iAppProps) {
  const salary = formatSalary(
    data.salaryMin,
    data.salaryMax,
    data.salaryCurrency || "INR"
  );

  const updatedDate = data.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  return (
    <Card className="group w-full min-w-0 overflow-hidden rounded-xl border-border bg-card shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md dark:bg-black/40">
      <CardContent className="space-y-4 p-4 sm:p-5">
        {/* Company Header */}
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted sm:size-11">
              {data.company.logo ? (
                <Image
                  src={data.company.logo}
                  width={44}
                  height={44}
                  alt={`${data.company.name} logo`}
                  className="size-full object-contain p-1"
                />
              ) : (
                <Building2 className="size-5 text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {data.company.name}
              </p>

              <p className="mt-1 flex items-start gap-1 text-xs text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <span className="line-clamp-2 wrap-break-word">
                  {data.location || "Location not specified"}
                </span>
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className="shrink-0 text-[10px] font-medium sm:text-xs"
          >
            {formatLabel(data.status)}
          </Badge>
        </div>

        {/* Job Title */}
        <div className="space-y-1.5">
          <h2 className="line-clamp-2 text-base font-bold leading-snug text-primary sm:text-lg">
            {data.title}
          </h2>

          {data.department && (
            <p className="truncate text-xs text-muted-foreground">
              {formatLabel(data.department)}
            </p>
          )}
        </div>

        {/* Job Information */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1 font-normal">
            <BriefcaseBusiness className="size-3.5" />
            {formatLabel(data.employmentType)}
          </Badge>

          <Badge variant="outline" className="gap-1 font-normal">
            <Clock3 className="size-3.5" />
            {formatLabel(data.experienceLevel)}
          </Badge>

          <Badge variant="outline" className="font-normal">
            {formatLabel(data.workplaceType)}
          </Badge>
        </div>

        {/* Salary and Openings */}
        <div className="grid grid-cols-1 gap-2 justify-between rounded-lg bg-muted/50 p-1 sm:grid-cols-2">
          <div className="flex min-w-0 items-start gap-2">
            <Wallet className="mt-0.5 size-4 shrink-0 text-primary" />

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Salary Range</p>
              <p className="wrap-break-word text-sm font-semibold text-foreground">
                {salary}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Users className="mt-0.5 size-4 shrink-0 text-primary" />

            <div>
              <p className="text-xs text-muted-foreground">Openings</p>
              <p className="text-sm font-semibold text-foreground">
                {data.openings ?? "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer and Actions */}
        <div className="space-y-3 border-t border-border pt-3">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5 shrink-0" />
            Last updated: {updatedDate}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/employer/manage-jobs/${data.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "w-full px-4 py-4 gap-1.5",
              })}
            >
              <Eye className="size-4" />
              View Details
            </Link>

            <Link
              href={`/employer/manage-jobs/${data.id}/edit-post`}
              className={buttonVariants({
                variant:"default",
                size: "sm",
                className: "w-full px-4 py-4 gap-1.5",
              })}
            >
             <SquarePen className="size-4" />
              Edit Post
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}