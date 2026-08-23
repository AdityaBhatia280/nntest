'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { CHAPTERS_DATA } from '@/lib/team-data';

export default function ChaptersPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-6xl font-bold font-headline">Our Chapters</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our expanding student-led neuroscience chapters driving research, education, and community impact worldwide.
          </p>
        </div>

        {/* 3 Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {CHAPTERS_DATA.map((chapter, index) => (
            <div key={`${chapter.name}-${index}`} className="group text-left">
              <Card className="relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/11] transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5 border-border/60 bg-muted/40 flex flex-col justify-end">
                {/* Background Image */}
                <Image
                  src={chapter.image}
                  alt={chapter.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Balanced dark overlay and gradient for excellent text readability */}
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/15" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />

                {/* Chapter Name */}
                <div className="relative z-10 p-5 text-white w-full">
                  <h3 className="text-xl font-bold font-headline leading-tight tracking-tight text-white group-hover:text-pink-100 transition-colors drop-shadow-md">
                    {chapter.name}
                  </h3>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
