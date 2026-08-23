"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PlusCircle } from "lucide-react";
import { Logo } from "@/components/logo";

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>Main navigation links for the Neuroscience Nation website.</SheetDescription>
            </SheetHeader>
            <Link href="/" className="mb-6" onClick={() => setIsMobileMenuOpen(false)}>
              <Logo />
            </Link>
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg p-2 rounded-md",
                    pathname === link.href ? "text-primary bg-secondary" : "text-muted-foreground hover:bg-secondary/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/portal"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg p-2 rounded-md",
                  pathname === "/portal" ? "text-primary bg-secondary" : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                Chapter Login
              </Link>
            </nav>
            <div className="mt-6">
              <Button asChild className="w-full" variant="default">
                <Link href="/start-a-chapter" onClick={() => setIsMobileMenuOpen(false)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Start a Chapter
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Header */}
      <header
        className={cn(
          "hidden md:flex fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4",
          "mt-4"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between w-full bg-background/80 backdrop-blur-md border shadow-soft px-6 md:px-8 py-2.5",
            "rounded-full"
          )}
        >
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <nav className="flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary px-4 py-2 rounded-full text-sm font-medium",
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground/70"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/portal"
              className={cn(
                "transition-colors hover:text-primary px-4 py-2 rounded-full text-sm font-medium text-center leading-tight flex flex-col items-center justify-center",
                pathname === "/portal"
                  ? "text-primary"
                  : "text-foreground/70"
              )}
            >
              <span>Chapter Login</span>
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="default" className="rounded-full px-5">
              <Link href="/start-a-chapter">
                <PlusCircle className="mr-2 h-4 w-4" /> Start a Chapter
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
