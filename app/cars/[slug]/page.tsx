import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  fetchAllCars,
  fetchCarBySlug,
  type CarListing,
} from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import ImageGallery from '@/components/ImageGallery';
import SpecsTable from '@/components/SpecsTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CarPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const cars = await fetchAllCars();
  return cars.map((car) => ({ slug: car.slug.current }));
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await fetchCarBySlug(slug);
  if (!car) {
    return { title: 'Vehicle not found – Goodmen Motors' };
  }

  const image = car.mainImage ? urlFor(car.mainImage).width(1200).height(630).url() : undefined;

  return {
    title: `${car.title} (${car.year}) – Goodmen Motors`,
    description: `${car.year} ${car.make} ${car.model} - Premium imported vehicle from Goodmen Motors`,
    openGraph: {
      title: `${car.title} – Goodmen Motors`,
      description: `${car.year} ${car.make} ${car.model} - Premium imported vehicle from Goodmen Motors`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(
    price,
  );

const formatMileage = (value?: number, unit?: string) => {
  if (!value) return 'N/A';
  const formatted = new Intl.NumberFormat('en-US').format(value);
  return unit === 'km' ? `${formatted} km` : `${formatted} mi`;
};

export default async function CarPage({ params }: CarPageProps) {
  const { slug } = await params;
  const car = await fetchCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-500">
            Home
          </Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-amber-500">
            Listings
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{car.title}</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{car.year}</Badge>
              {car.status === 'sold' && <Badge variant="danger">Sold</Badge>}
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">{car.title}</h1>
            <p className="text-lg text-gray-500">
              {car.year} · {car.make} · {car.model}
            </p>
          </div>
          <Card className="border-amber-200/60 bg-amber-50/60 px-8 py-6 text-right dark:border-amber-700/50 dark:bg-amber-900/20">
            <p className="text-3xl font-semibold text-amber-600 dark:text-amber-400">{formatPrice(car.price)}</p>
            <p className="text-sm text-amber-900/70 dark:text-amber-200">
              {formatMileage(car.mileage, car.mileageUnit)}
            </p>
          </Card>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ImageGallery car={car} />
          <SpecsTable car={car} />
        </div>

        <Card className="mt-8 border-amber-200/70 bg-amber-50/80 dark:border-amber-800/60 dark:bg-amber-900/20">
          <CardHeader>
            <CardTitle>Inspection Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line text-sm text-amber-900 dark:text-amber-100">
              All vehicles are thoroughly inspected before import. This listing includes full auction transparency with detailed condition reports, damage documentation, and mileage verification. Please contact us for complete inspection reports, shipping quotes, or to schedule a viewing.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-10 border-gray-200/70 bg-gray-50/80 dark:border-gray-800/70 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle>Interested in this vehicle?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Contact our concierge team for detailed inspection reports, shipping quotes, or to reserve the vehicle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Contact Concierge</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/listings">Back to Listings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

