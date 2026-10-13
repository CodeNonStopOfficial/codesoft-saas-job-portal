import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { UserProfileToggle } from "../common/UserProfileToggle";
import { ThemeToggle } from "../shared/ThemeToggle";
import { MobileNav } from "./MobileNav";
import { cn } from "cn";
import { requireAuthUser } from "@/app/utils/requiredAuth";

export async function Navbar() {
  const user = await requireAuthUser();
  const userTypeRole =
    user?.role === "ADMIN"
      ? "/admin/dashboard"
      : user?.role === "COMPANY"
        ? "/employer/dashboard"
        : user?.role === "JOB_SEEKER"
          ? "/candidate/dashboard"
          : null;
  return (
    <div className="max-w-full py-4 border-b sticky top-0 z-50">
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image src={Logo} width={35} height={35} alt="Logo" />
            <h1 className="text-2xl font-bold text-blue-800">
              Carrer
              <span className="text-[25px] font-bold text-primary">Hub</span>
            </h1>
          </Link>
        </div>
        <div className=" hidden md:flex items-center justify-center gap-5 text-[16px] font-medium">
          <Link
            className={cn("hover:text-primary text-primary cursor-pointer")}
            href="/get-started"
          >
            Get Started
          </Link>
          <Link className="hover:text-primary cursor-pointer" href="/">
            Learning
          </Link>
          <Link
            className="hover:text-primary cursor-pointer"
            href="/"
          >
            Internship
          </Link>
          <Link
            className="hover:text-primary cursor-pointer"
            href="/saved-jobs"
          >
            Saved Jobs
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2">
          <ThemeToggle />
          <MobileNav user={user} />
          {userTypeRole ? (
            <>
              <div className="items-center gap-3 flex justify-center">
                <div className="hidden md:block">
                  <Link
                    href={userTypeRole}
                    className={buttonVariants({
                      variant: "outline",
                      className: "px-5 py-4 text-primary",
                    })}
                  >
                    Dashboard
                  </Link>
                </div>

                <UserProfileToggle user={user}/>
              </div>
            </>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "outline",
                  className: "px-5 py-4 text-primary",
                })}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
