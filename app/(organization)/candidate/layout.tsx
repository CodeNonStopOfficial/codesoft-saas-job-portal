import { requireJobSeeker } from "@/app/utils/requiredJobSekeer";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Hand, House } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";

interface iAppPros {
  children: ReactNode;
}

export default async function DashboardCandidateLayout({ children }: iAppPros) {
  const user = await requireJobSeeker();
  if (user.role !== "JOB_SEEKER") {
    return redirect("/");
  }
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
          <div className="flex w-full items-center gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 text-primary" />
              <Separator orientation="vertical" />
              <h1 className="flex items-center gap-2 text-lg font-semibold">
                Welcome to Dashboard
                <Hand className="h-5 w-5 text-green-500" />
              </h1>
            </div>

            <div className="ml-auto flex items-center justify-center gap-2">
              <Link
                href="/"
                className={buttonVariants({
                  variant: "secondary",
                  className: "flex items-center gap-2 justify-center",
                })}
              >
                <House className="size-4" />
                Home Page
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="max-w-full w-full px-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
