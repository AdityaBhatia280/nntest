import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SDG_GOALS } from '@/lib/sdg-data';
import { ExternalLink } from 'lucide-react';

type GoalDetailPageProps = {
  params: any;
};

export async function generateStaticParams() {
  return SDG_GOALS.map((goal) => ({
    id: goal.id.toString(),
  }));
}

export async function generateMetadata({ params }: any) {
  const resolvedParams = params && (typeof params.then === 'function' ? await params : params);
  const goal = SDG_GOALS.find((g) => g.id.toString() === resolvedParams?.id);
  if (!goal) {
    return { title: 'Goal Not Found' };
  }
  return {
    title: `${goal.name} | SDG Champions Hub`,
    description: goal.description,
  };
}

export default async function GoalDetailPage({ params }: any) {
  const resolvedParams = params && (typeof params.then === 'function' ? await params : params);
  const goal = SDG_GOALS.find((g) => g.id.toString() === resolvedParams?.id);

  if (!goal) {
    notFound();
  }

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Banner header using CSS and standard elements */}
        <header className="grid grid-cols-1 md:grid-cols-12 rounded-2xl overflow-hidden shadow-soft border border-border bg-card">
          <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="inline-flex items-center justify-center rounded-full h-16 w-16 font-bold text-3xl text-white shadow-sm"
                style={{ backgroundColor: goal.color }}
              >
                {goal.id}
              </div>
              <div className="h-1 w-12 rounded" style={{ backgroundColor: goal.color }} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
              {goal.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground font-medium leading-relaxed">
              {goal.description}
            </p>
          </div>
          <div className="md:col-span-5 relative min-h-[300px] md:min-h-full">
            {/* HTML standard img to prevent any complex hook issues in static export */}
            <img
              src={goal.imageUrl}
              alt={goal.name}
              className="object-cover absolute inset-0 w-full h-full"
              referrerPolicy="no-referrer"
              data-ai-hint={goal.aiHint}
            />
          </div>
        </header>

        <main className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Plain card wrapper */}
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <div className="p-6 border-b border-border">
                <h2 className="font-headline text-2xl font-semibold text-card-foreground">What this goal means</h2>
              </div>
              <div className="p-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>{goal.longDescription}</p>
                <p>Our chapters are actively working on projects that contribute to this goal, from organizing local food drives to advocating for policy changes. Every action, no matter how small, contributes to the larger movement.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Plain card wrapper */}
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <div className="p-6 border-b border-border">
                <h2 className="font-headline text-2xl font-semibold text-card-foreground">Learn More</h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">Visit the official United Nations page for this goal to explore targets, data, and more.</p>
                <a 
                  href={goal.unLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                >
                  View on UN.org <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Plain CTA card */}
            <div className="rounded-xl border border-transparent bg-primary text-primary-foreground shadow-sm">
              <div className="p-6 border-b border-white/10">
                <h2 className="font-headline text-2xl font-semibold">Get Involved</h2>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm leading-relaxed text-primary-foreground/95">Ready to make a difference? Find a chapter near you or start your own to begin contributing to this goal.</p>
                <Link 
                  href="/chapters"
                  className="inline-flex items-center justify-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 mt-4 rounded-full w-full"
                >
                  See What Chapters Are Doing
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
