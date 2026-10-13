"use client";

import Link from "next/link";
import { useState } from "react";
import { LogIn, LogOutIcon, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { signOut } from "next-auth/react";
import { UserRole } from "@/lib/generated/prisma/client";

const navItems = [
  { label: "Get Started", href: "/get-started" },
  { label: "Internship", href: "/internships" },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
];

interface iAppProps {
  user: {
    email: string;
    id: string;
    image: string | null;
    name: string | null;
    role: UserRole;
  } | null;
}

export function MobileNav({ user }: iAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted border"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b bg-background shadow-lg">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md px-4 py-3 text-[17px] font-medium transition-colors hover:bg-muted hover:text-primary cursor-pointer border "
              >
                {item.label}
              </Link>
            ))}
            <div className="items-center justify-between">
              {user ? (
                <>
                  <Button
                    onClick={() =>
                      signOut({
                        redirectTo: "/login",
                      })
                    }
                    variant="outline"
                    className="text-destructive flex items-center gap-2 w-full py-4.5"
                  >
                    <LogOutIcon className="size-4" />
                    LogOut
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: "outline",
                      className:
                        "px-6 py-4.5 text-primary w-full flex items-center gap-2 cursor-pointer hover:bg-primary",
                    })}
                  >
                    <LogIn />
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
