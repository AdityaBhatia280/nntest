import * as React from 'react';
import Image from 'next/image';
import { Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  textColor = 'text-foreground',
}: {
  className?: string;
  textColor?: string;
}) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className={cn('inline-flex items-center gap-2.5', className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden shrink-0">
        {!hasError ? (
          <Image
            src="/logo.png"
            alt="Neuroscience Nation Logo"
            width={36}
            height={36}
            className="h-full w-full object-contain"
            onError={() => setHasError(true)}
            priority
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <Brain className="h-5 w-5" />
          </div>
        )}
      </div>
      <span className={cn('font-headline font-bold text-xl tracking-tight', textColor)}>
        Neuroscience Nation
      </span>
    </div>
  );
}
