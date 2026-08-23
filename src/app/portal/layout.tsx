export const dynamic = 'force-dynamic';

import { Logo } from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Back to Website</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
