'use client';

import { TeamCard } from '@/components/team-card';
import { FOUNDER_DATA, TEAM_GROUPS } from '@/lib/team-data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';

export default function TeamPage() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-6xl font-bold font-headline">Meet our Team</h1>
        </div>

        {/* Founder Spotlight */}
        <div className="max-w-5xl mx-auto mb-20">
          <Card className="bg-secondary/70 border border-border/80 rounded-3xl overflow-hidden shadow-soft">
            <CardContent className="p-8 md:p-14 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden bg-muted/80 border-4 border-background shadow-lg flex items-center justify-center">
                  {!imgError && FOUNDER_DATA.image ? (
                    <Image
                      src={FOUNDER_DATA.image}
                      alt={FOUNDER_DATA.name}
                      fill
                      className="object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <User className="h-28 w-28 text-muted-foreground/40" />
                  )}
                </div>
              </div>
              <div className="md:col-span-7 space-y-5 text-center md:text-left">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground tracking-tight">
                    {FOUNDER_DATA.name}
                  </h2>
                  <p className="text-primary font-semibold text-lg mt-1">
                    {FOUNDER_DATA.role}
                  </p>
                </div>
                <div className="space-y-3 text-muted-foreground text-base leading-relaxed">
                  <p>
                    Passionate about expanding global access to neuroscience education, research opportunities, and academic mentorship for aspiring student researchers across the globe.
                  </p>
                  <p>
                    Leading the initiative to bridge foundational neuroscience knowledge with real-world collegiate research, community brain health awareness, and interdisciplinary student collaborations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Team Section */}
        <div className="mt-16">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Management Team</h2>
            <div className="w-16 h-1 bg-primary/40 mx-auto mt-4 rounded-full" />
          </div>

          {/* Grouped by Requested Order */}
          <div className="space-y-16 max-w-6xl mx-auto">
            {TEAM_GROUPS.map((group) => (
              <div key={group.categoryName} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-bold font-headline text-foreground">
                    {group.categoryName}
                  </h3>
                  <div className="h-[1px] flex-1 bg-border" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {group.members.map((member) => (
                    <TeamCard key={member.name} member={member} isManagement={true} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
