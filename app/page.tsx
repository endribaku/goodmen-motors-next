import type { Metadata } from 'next';

import { fetchLatestArrivals } from '@/sanity/queries';
import CarGrid from '@/components/CarGrid';
import SectionTitle from '@/components/SectionTitle';

export const metadata: Metadata = {
  title: 'Goodmen Motors – Premium Imported Vehicles from USA',
  description:
    'Discover premium imported vehicles curated in the USA and delivered to the Balkans with full transparency.',
};

export default async function Home() {
  const latestArrivals = await fetchLatestArrivals();

  return (
    <div className="space-y-24 pb-24">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center blur-sm" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center text-white sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">
            Goodmen Motors
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Premium Imported Vehicles</h1>
          <p className="mt-3 text-base text-white/70">
            A refreshed hero banner is coming soon.
          </p>
        </div>
      </section>

      {latestArrivals.length > 0 && (
        <section className="bg-white/60 py-20 dark:bg-gray-900/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Latest Arrivals"
              subtitle="Fresh imports with full auction transparency"
              eyebrow="New Inventory"
            />
            <div className="mt-10">
              <CarGrid cars={latestArrivals} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
