import { ReactNode } from "react";
import { Navbar } from "@/components/layouts/Navbar";

interface SharedMainLayoutProps {
  children: ReactNode;
}

export default function SharedMainLayout({ children }: SharedMainLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
         <Navbar/>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-8 lg:px-12">
        {children}
      </main>
    </div>
  );
}
