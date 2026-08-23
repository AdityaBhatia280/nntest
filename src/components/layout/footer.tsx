"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { Logo } from "@/components/logo";
import { Button } from "../ui/button";

export function Footer() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Instagram":
        return <Instagram className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/">
              <Logo textColor="text-white" />
            </Link>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Empowering students through neuroscience education, research fellowships, and student-led chapters worldwide.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-white tracking-wider">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white tracking-wider">Follow Us</h3>
              <ul className="mt-4 space-y-2">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                      {getIcon(link.name)}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white tracking-wider">Contact & Support</h3>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                Have questions about starting a chapter, research fellowships, or partnerships? Reach out to us anytime.
              </p>
              <div className="mt-3 space-y-1">
                <a href="mailto:neuroscience.nation@gmail.com" className="text-sm text-primary hover:underline font-medium block">
                  neuroscience.nation@gmail.com
                </a>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors block">
                  Contact page &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Neuroscience Nation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
