"use client";
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LayoutDashboard,
  LogOutIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { UserRole } from "@/lib/generated/prisma/client";

interface iAppProps {
  user: {
    email: string;
    id: string;
    image: string | null;
    name: string | null;
    role: UserRole;
  } | null;
}

export function UserProfileToggle({ user }: iAppProps) {
  const userTypeRole =
    user?.role === "ADMIN"
      ? "/admin/dashboard"
      : user?.role === "COMPANY"
        ? "/employer/dashboard"
        : user?.role === "JOB_SEEKER"
          ? "/candidate/dashboard"
          : null;
  const userType =
    user?.role === "ADMIN"
      ? "/admin/"
      : user?.role === "COMPANY"
        ? "/employer/"
        : user?.role === "JOB_SEEKER"
          ? "/candidate/"
          : null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage
                src={`${user?.image ?? "https://github.com/shadcn.png"}`}
                alt="shadcn"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="center">
        <DropdownMenuGroup>
          <Link href={`${userType}/profile`}>
            <DropdownMenuItem>
              <BadgeCheckIcon />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href={`${userType}/billing`}>
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
          </Link>
          <Link href={`${userType}/notification`}>
            <DropdownMenuItem>
              <BellIcon />
              Notification
            </DropdownMenuItem>
          </Link>
          {userTypeRole && (
            <Link href={userTypeRole}>
              <DropdownMenuItem>
                <LayoutDashboard />
                Dashboard
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              redirectTo: "/login",
            })
          }
        >
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
