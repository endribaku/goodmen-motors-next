import Image from 'next/image';
import Link from 'next/link';

import { CarListing } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CarCardProps {
  car: CarListing;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(price);

const formatMileage = (value?: number, unit?: string) => {
  if (!value) return 'N/A';
  const formatted = new Intl.NumberFormat('en-US').format(value);
  return unit === 'km' ? `${formatted} km` : `${formatted} mi`;
};

export default function CarCard({ car }: CarCardProps) {
  const imageUrl = car.mainImage
    ? urlFor(car.mainImage).width(800).height(600).url()
    : '/placeholder.png';

  return (
    <Link href={`/cars/${car.slug.current}`}>
      <Card className="group border-none p-0 shadow-xl shadow-gray-200/40 transition hover:-translate-y-1 hover:shadow-2xl dark:shadow-black/30">
        <div className="relative h-64 overflow-hidden rounded-3xl">
          <Image
            src={imageUrl}
            alt={car.mainImage?.alt || car.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-lg font-semibold">{car.title}</p>
            <p className="text-sm text-white/80">
              {car.year} · {car.make} · {car.model}
            </p>
          </div>
        </div>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
              {formatPrice(car.price)}
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {formatMileage(car.mileage, car.mileageUnit)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {car.driveType && <span>{car.driveType}</span>}
            {car.transmission && <span>{car.transmission}</span>}
            {car.fuelType && <span>{car.fuelType}</span>}
          </div>

          
        </CardContent>
      </Card>
    </Link>
  );
}

