import type { Metadata } from 'next';
import Link from 'next/link';

import { fetchAllCars } from '@/sanity/queries';
import HomeCarGrid from '@/components/HomeCarGrid';
import ContactSection from '@/components/ContactSection';
import HowItWorksSection from '@/components/HowItWorksSection';

export const metadata: Metadata = {
  title: 'Goodmen Motors – Premium Imported Vehicles from USA',
  description:
    'Discover premium imported vehicles curated in the USA and delivered to the Balkans with full transparency.',
};

export default async function Home() {
  // Use fetchAllCars and slice to ensure consistency with listings page
  const allCars = await fetchAllCars();
  const latestArrivals = allCars.slice(0, 8);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/home/homepage-hero.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <h1 className="text-[40px] font-normal michroma leading-tight text-white ">
              Bli makinën tënde të ëndrrave.
            </h1>
            <p className="mt-2 headline font-light text-white text-[18px]">
              Makina me porosi nga SHBA, Korea e Jugut dhe Kanada. Të gjitha me kontroll teknik dhe transport të sigurt.
            </p>
            <Link
              href="/listings"
              className="mt-8 headline tracking-[0.15em] text-[15px] inline-flex items-center gap-2 border-2 border-white bg-white text-black px-7 py-2.5 text-base font-normal"
            >
              SHIKO MAKINAT
              <img src="/helper-icons/navbar/stroke.svg" alt="" className="" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Listings Section */}
      {latestArrivals.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-[32px] font-normal text-gray-900 michroma">Listimet e fundit</h2>
              <Link
                href="/listings"
                className="inline-flex headline items-center gap-2 border-2 border-black bg-transparent px-4 py-2 text-base font-normal text-gray-900 transition tracking-[0.15em] text-[15px]"
              >
                TË GJITHA
                <img src="/helper-icons/navbar/stroke.svg" alt="" className="" />
              </Link>
            </div>
            <div className="mt-10">
              <HomeCarGrid cars={latestArrivals.slice(0, 4)} />
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <HowItWorksSection showAboutButton={true} />


      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
