import Image from 'next/image';
import Link from 'next/link';

import { CarListing } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';

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
  return unit === 'km' ? `${formatted}km` : `${formatted}mi`;
};

export default function CarCard({ car }: CarCardProps) {
  const imageUrl = car.mainImage
    ? urlFor(car.mainImage).width(800).height(600).url()
    : '/placeholder.png';

  return (
    <Link href={`/cars/${car.slug.current}`}>
      <div className="group w-full overflow-hidden bg-white transition hover:shadow-lg">
        
        {/* Image box with fixed height */}
        <div className="relative h-[240px] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={car.mainImage?.alt || car.title}
            fill
            sizes="368px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        {/* Card content */}
        <div className="py-4 ">
          <p className="text-sm text-[#4E4E4E] flex gap-2">
            <span className="text-[15px] font-light headline underline decoration-dotted">{car.year}</span>
            <span className="text-[15px] font-light headline underline decoration-dotted">{formatMileage(car.mileage, car.mileageUnit)}</span>
          </p>
          <p className="text-[18px] font-normal text-black headline">{car.title}</p>
          <p className="mt-4 text-[18px] font-normal text-black headline">{formatPrice(car.price)}</p>
        </div>
      </div>
    </Link>
  );
}

