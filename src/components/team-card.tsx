
'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { User } from 'lucide-react';
import { useState } from 'react';

type TeamCardProps = {
  member: {
    name: string;
    role: string;
    subRole?: string;
    image?: string;
    aiHint?: string;
  };
  isManagement?: boolean;
};

export function TeamCard({ member, isManagement = false }: TeamCardProps) {
  const [imgError, setImgError] = useState(false);

  const isPlaceholder = !member.image || member.image === '/placeholder.png' || member.image === '/apple-touch-icon.png' || imgError;

  return (
    <Card className="group text-center transition-all duration-300 hover:shadow-soft hover:-translate-y-1 bg-secondary border-none h-full">
      <CardContent className="p-6 flex flex-col items-center justify-center">
        <div className="relative h-28 w-28 mb-4 overflow-hidden rounded-full bg-muted/80 border-2 border-border/50 flex items-center justify-center">
          {isPlaceholder ? (
            <User className="h-14 w-14 text-muted-foreground/40" />
          ) : (
            <Image
              src={member.image!}
              alt={`Portrait of ${member.name}`}
              width={112}
              height={112}
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
              onError={() => setImgError(true)}
              data-ai-hint={member.aiHint}
            />
          )}
        </div>
        <h3 className="text-lg font-bold font-headline">{member.name}</h3>
        <p className="text-primary font-medium text-sm">{member.role}</p>
        {member.subRole && (
          <p className="text-muted-foreground font-medium text-xs mt-0.5">{member.subRole}</p>
        )}
      </CardContent>
    </Card>
  );
}
