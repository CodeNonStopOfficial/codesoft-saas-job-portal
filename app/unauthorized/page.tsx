import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, LogIn } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlert
            className="h-10 w-10 text-destructive"
            aria-hidden="true"
          />
        </div>

        {/* Error message */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-destructive">
          Error 403
        </p>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Access Denied
        </h1>

        <p className="mb-8 text-muted-foreground">
          Sorry, you don&apos;t have permission to access this page. Please make
          sure you&apos;re signed in with an account that has the required
          permissions.
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
