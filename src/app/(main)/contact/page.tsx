
'use client';

import { Button } from '@/components/ui/button';
import { Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline">Get in Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions about neuroscience education, fellowship programs, or starting a chapter? We&apos;re here to help. Reach out to us through our direct channels.
          </p>
        </div>

        <div className="mt-16 max-w-lg mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Direct Contact</CardTitle>
              <CardDescription>Prefer to reach out directly? Here&apos;s how.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 text-foreground group">
                <div className="bg-secondary p-3 rounded-full group-hover:bg-primary/10 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">xyz</p>
                </div>
              </div>
               <a href="https://www.instagram.com/xyz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group">
                <div className="bg-secondary p-3 rounded-full group-hover:bg-primary/10 transition-colors">
                  <Instagram className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Instagram</h3>
                  <p className="text-muted-foreground">@xyz</p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
