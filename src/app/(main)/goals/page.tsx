import { SDG_GOALS } from '@/lib/sdg-data';
import { SdgCard } from '@/components/sdg-card';

export const metadata = {
  title: 'The 17 SDGs | SDG Champions Hub',
  description: 'Explore the 17 United Nations Sustainable Development Goals and see how our chapters are taking action.',
};

export default function GoalsPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">
            The 17 Goals
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The Sustainable Development Goals are the blueprint to achieve a better and more sustainable future for all. They address the global challenges we face, including poverty, inequality, climate change, environmental degradation, peace and justice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {SDG_GOALS.map((goal) => (
            <SdgCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
    </div>
  );
}
