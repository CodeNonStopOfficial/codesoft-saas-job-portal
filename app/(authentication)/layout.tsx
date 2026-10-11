import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { auth } from "../utils/auth";
import { redirect } from "next/navigation";

export default async function AuthLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (session?.user){
     return redirect("/")
  }
  return (
    <div className=" relative max-w-full">
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
            className:
              "flex w-full items-center justify-center gap-2 px-4 py-4",
          })}
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </div>
      <main className="w-full mx-auto flex items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}
