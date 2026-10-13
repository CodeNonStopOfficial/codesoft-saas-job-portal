import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { getDataPublicJobType } from "@/app/services/candidata/get-public-jobpost";
import {
  MapPin,
  User2,
  BriefcaseBusiness,
  Clock3,
  Wallet,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { buttonVariants } from "../ui/button";

interface iAppPros {
  data: getDataPublicJobType;
}

export function PublicPerCardJobComponent({ data }: iAppPros) {
  const formatSalary = () => {
    if (data.salaryMin == null && data.salaryMax == null) {
      return null;
    }

    const formatAmount = (amount: number) =>
      new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
      }).format(amount);

    if (data.salaryMin != null && data.salaryMax != null) {
      return `${data.salaryCurrency}${formatAmount(data.salaryMin)} - ${
        data.salaryCurrency
      }${formatAmount(data.salaryMax)}`;
    }

    const amount = data.salaryMin ?? data.salaryMax;

    return amount != null
      ? `${data.salaryCurrency}${formatAmount(amount)}`
      : null;
  };

  const salary = formatSalary();

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/70 via-primary to-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row">
          {/* Company logo */}
          <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
            {data.company.logo ? (
              <Image
                src={data.company.logo}
                alt={`${data.company.name} logo`}
                width={56}
                height={56}
                className="size-full object-cover"
              />
            ) : (
              <User2 className="size-7 text-muted-foreground" />
            )}
          </div>

          {/* Main job information */}
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <Link
                href={`/job-information/${data.id}`}
                className="inline-flex items-center gap-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <h2 className="text-lg font-bold tracking-tight transition-colors hover:text-primary sm:text-xl">
                  {data.title}
                </h2>
                <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>

              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {data.company.name}
              </p>
            </div>

            {/* Job details */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1.5 text-xs font-medium capitalize">
                <BriefcaseBusiness className="size-3.5" />
                {data.workplaceType}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1.5 text-xs font-medium capitalize">
                <Clock3 className="size-3.5" />
                {data.employmentType}
              </span>

              {salary && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Wallet className="size-3.5" />
                  {salary}
                </span>
              )}
            </div>

            {/* Company description */}
            {data.company.about && (
              <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                {data.company.about}
              </p>
            )}
          </div>

          {/* Location, date, and application */}
          <div className="flex flex-col items-start justify-between gap-4 sm:min-w-40 sm:items-end">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground sm:justify-end">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span className="line-clamp-2 sm:text-right">
                  {data.location}
                </span>
              </div>

              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="size-4 shrink-0 text-primary" />
                {new Date(data.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <Link
              href={`/${data.id}/apply-jobs`}
              className={buttonVariants({
                variant: "outline",
                className: "px-6 py-4.5",
              })}
            >
              Apply Job
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
