'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AnimatedStat } from "@/components/animated-stat";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { 
  ArrowRight, 
  Microscope, 
  Globe2, 
  Award,
  ChevronRight
} from "lucide-react";
import { FELLOWSHIP_APPLICATION_URL } from "@/lib/constants";

export default function HomePage() {
  const displayStats = [
    { value: 25, label: "States", suffix: "+" },
    { value: 100, label: "Chapters", suffix: "+" },
    { value: 10000, label: "Members", suffix: "+" },
    { value: 1000000, label: "Economic Impact", prefix: "$" },
  ];

  const pillars = [
    {
      icon: Microscope,
      title: "Structured Research Fellowships",
      description: "Direct mentorship pairing student fellows with collegiate labs, literature analysis workshops, and guided publication pipelines."
    },
    {
      icon: Globe2,
      title: "Global Chapter Network",
      description: "Student-run chapters organizing hands-on neurobiology workshops, EEG demonstrations, guest speaker series, and brain health awareness initiatives."
    },
    {
      icon: Award,
      title: "Competitions & Publications",
      description: "Comprehensive preparation cohorts for Brain Bee tournaments, research symposiums, and peer-reviewed youth neuroscience journal submissions."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Front Cover / Hero Section with Clean Light Background */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-pink-50/25 to-background text-foreground pt-32 pb-24 border-b border-border/40">
        {/* Subtle Ambient Light Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[850px] h-[420px] bg-gradient-to-tr from-pink-200/35 via-rose-100/30 to-amber-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-pink-100/40 blur-2xl -z-10 rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-rose-100/35 blur-2xl -z-10 rounded-full pointer-events-none" />

        {/* Hero Centered Content */}
        <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center">
          <AnimateOnScroll className="flex flex-col items-center">
            {/* Title: 'Neuroscience' centered on top, and 'Nation' underneath with vibrant gradient */}
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-cursive text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] text-primary font-normal select-none leading-none drop-shadow-xs">
                Neuroscience
              </span>
              <span className="font-headline font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-none mt-1 sm:mt-2">
                Nation
              </span>
            </div>

            {/* Subtitle */}
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-slate-700 max-w-3xl leading-relaxed font-normal">
              Empowering the next generation of thinkers, researchers, and changemakers through youth-led neuroscience education, structured research fellowships, and global chapters.
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
              <Button 
                asChild
                size="lg" 
                className="rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-pink-500/25 bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105"
              >
                <a href={FELLOWSHIP_APPLICATION_URL} target="_blank" rel="noopener noreferrer">
                  Join Fellowship <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              
              {/* Clickable Start a Chapter button */}
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-semibold border border-border/80 bg-background/90 hover:bg-muted text-foreground transition-all hover:scale-105 shadow-xs"
              >
                <Link href="/start-a-chapter">
                  Start a Chapter
                </Link>
              </Button>
            </div>

            {/* Secondary Chapter Exploration Link */}
            <div className="mt-8">
              <Link 
                href="/chapters" 
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span>Browse our chapters</span>
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Stats Section with Clean Solid Background */}
      <section className="py-14 bg-background border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {displayStats.map(stat => (
              <div 
                key={stat.label} 
                className="p-6 rounded-2xl bg-card border border-border/60 shadow-2xs text-center flex flex-col justify-center"
              >
                <AnimatedStat
                  finalValue={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 3 Core Pillars Section - Clean Subtle Solid Background */}
      <section className="py-20 md:py-28 bg-secondary/50 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 bg-primary/5">
              What We Do
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-headline">Advancing Youth Neuroscience</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Creating structured academic and community pathways for aspiring neuroscientists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Card 
                  key={idx} 
                  className="bg-card border border-border/70 rounded-2xl p-8 hover:shadow-soft transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-3 text-foreground">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 md:py-28 bg-background border-b border-border/40">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-bold font-headline">Our Founder</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Dedicated student leadership driving global access to neuroscience education and research opportunities.
            </p>
          </AnimateOnScroll>

          <div className="bg-secondary/60 border border-border/70 rounded-3xl p-8 md:p-12 shadow-soft grid md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-muted/80 border-4 border-background shadow-md">
                <Image
                  src="/simran.png"
                  alt="Simran Karir portrait"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                Founder & Executive Director
              </div>
              <h3 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
                Simran Karir
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Passionate about expanding global access to neuroscience education, structured research fellowships, and academic mentorship. Leading the initiative to bridge foundational neuroscience knowledge with real-world collegiate research and community impact.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                <Button asChild size="sm" className="rounded-full">
                  <Link href="/team">
                    Meet the Team <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lead a Movement / Join Section */}
      <section className="py-20 md:py-28 bg-secondary/60">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Image on left with no black opacity overlay */}
            <AnimateOnScroll className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-soft border border-border/60 bg-muted/60">
              <Image
                src="/nn4.png"
                alt="Student chapter workshop"
                fill
                className="object-cover"
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay="200ms" className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold font-headline">Lead a Neuroscience Movement</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Bring hands-on neuroscience workshops, academic competitions, and journal clubs to your community. Join an international network of student innovators.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/chapters">
                    View All Chapters <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Link href="/start-a-chapter">
                    Create Your Chapter
                  </Link>
                </Button>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
