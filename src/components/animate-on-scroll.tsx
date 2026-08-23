
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimateOnScrollProps = {
  children: ReactNode;
  className?: string;
  animationClass?: string;
  delay?: string;
  threshold?: number;
  triggerOnce?: boolean;
};

export function AnimateOnScroll({
  children,
  className,
  animationClass = 'animate-fade-in',
  delay,
  threshold = 0.1,
  triggerOnce = true,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  return (
    <div
      ref={ref}
      className={cn(className, isVisible ? animationClass : 'opacity-0')}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}
