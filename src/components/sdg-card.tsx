'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SdgGoal } from '@/lib/sdg-data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type SdgCardProps = {
  goal: SdgGoal;
};

export function SdgCard({ goal }: SdgCardProps) {
  return (
    <Link href={`/goals/${goal.id}`} className="group block h-full">
      <Card
        className="overflow-hidden h-full transition-all duration-300 ease-in-out group-hover:shadow-soft group-hover:-translate-y-1 flex flex-col"
        style={{ '--goal-color': goal.color } as React.CSSProperties}
      >
        <div className="relative">
          <Image
            src={goal.imageUrl}
            alt={goal.name}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={goal.aiHint}
          />
          <div
            className="absolute top-4 left-4 h-12 w-12 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-md"
          >
            <span className="text-2xl font-bold" style={{ color: goal.color }}>
              {goal.id}
            </span>
          </div>
        </div>
        <CardContent className="p-6 flex flex-col flex-grow">
          <div>
            <h3 className="font-headline text-xl font-bold" style={{ color: goal.color }}>
              {goal.name}
            </h3>
            <p className="mt-2 text-muted-foreground">{goal.description}</p>
          </div>
          <div className="mt-auto pt-4">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-primary font-semibold">
              Explore Goal <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
