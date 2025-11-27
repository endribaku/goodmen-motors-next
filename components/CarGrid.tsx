import CarCard from './CarCard';
import { CarListing } from '@/sanity/queries';

interface CarGridProps {
  cars: CarListing[];
}

export default function CarGrid({ cars }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="text-gray-500 headline font-light text-center text-[16px]">
        No vehicles found. Adjust your filters or check back soon.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
}

