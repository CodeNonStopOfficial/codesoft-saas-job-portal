import { ReactNode } from "react";
import { Navbar } from "@/components/layouts/Navbar";

interface SharedMainLayoutProps {
  children: ReactNode;
}

export default function SharedMainLayout({ children }: SharedMainLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto w-full max-w-7xl">
        <Navbar />
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-8 lg:px-12">
        {children}
      </main>
    </div>
  );
}
