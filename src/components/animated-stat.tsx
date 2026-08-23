'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedStatProps = {
  finalValue: number;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function AnimatedStat({ finalValue, label, prefix = '', suffix = '', className = '' }: AnimatedStatProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const value = Math.floor(progress * finalValue);
            setCurrentValue(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [finalValue]);
  
  const formattedValue = currentValue.toLocaleString();

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <p className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-primary via-pink-500 to-rose-400 bg-clip-text text-transparent">
        {prefix}{formattedValue}{suffix}
      </p>
      <p className="text-sm md:text-base text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
