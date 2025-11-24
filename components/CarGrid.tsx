import CarCard from './CarCard';
import { CarListing } from '@/sanity/queries';

interface CarGridProps {
  cars: CarListing[];
}

export default function CarGrid({ cars }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white/70 py-16 text-center text-gray-500 dark:border-gray-800 dark:bg-gray-900/60">
        No vehicles found. Adjust your filters or check back soon.
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
}

