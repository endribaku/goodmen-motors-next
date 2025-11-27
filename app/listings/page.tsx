import type { Metadata } from 'next';

import {
  fetchAllCars,
  fetchAllMakes,
  fetchAllFuelTypes,
  fetchAllDriveTypes,
  fetchAllTransmissions,
  fetchCarsByFilters,
  fetchCarsCountByFilters,
} from '@/sanity/queries';
import FiltersSidebar from '@/components/FiltersSidebar';
import FiltersButton from '@/components/FiltersButton';
import CarGrid from '@/components/CarGrid';
import Pagination from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'All Listings – Goodmen Motors',
  description:
    'Browse every imported vehicle in our collection. Filter by make, price, year, mileage, and drivetrain.',
};

interface ListingsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const sanitizeOptions = (values?: (string | null)[]) =>
  (values || []).filter(
    (value): value is string => typeof value === 'string' && value.trim().length > 0,
  );

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const searchParam = await searchParams;
  const search = Object.fromEntries(
    Object.entries(searchParam)
      .filter(([, value]) => typeof value === 'string')
      .map(([key, value]) => [key, value as string]),
  );

  // Parse pagination params
  const page = Math.max(1, Number(search.page) || 1);
  const pageSize = Number(search.pageSize) || 24;
  const validPageSizes = [12, 24, 48, 96];
  const validPageSize = validPageSizes.includes(pageSize) ? pageSize : 24;
  const sort = search.sort || 'latest';

  // Parse filter state from search params
  const filters = {
    keyword: search.keyword,
    makes: search.makes?.split(',').filter(Boolean) || 
           (search.make ? [search.make] : []), // Support old 'make' param for backward compatibility
    models: search.models?.split(',').filter(Boolean),
    minPrice: search.minPrice ? Number(search.minPrice) : undefined,
    maxPrice: search.maxPrice ? Number(search.maxPrice) : undefined,
    minMileage: search.minMileage ? Number(search.minMileage) : undefined,
    maxMileage: search.maxMileage ? Number(search.maxMileage) : undefined,
    fuelTypes: search.fuelTypes?.split(',').filter(Boolean),
    driveTypes: search.driveTypes?.split(',').filter(Boolean),
    transmissions: search.transmissions?.split(',').filter(Boolean),
  };

  const hasFilters = Object.values(filters).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== '';
  });

  // Fetch all filter options, cars, and total count in parallel
  const [cars, totalCount, makes, fuelTypes, driveTypes, transmissions] = await Promise.all([
    hasFilters
      ? fetchCarsByFilters(filters, { page, pageSize: validPageSize, sort })
      : fetchAllCars().then((allCars) => {
          // Apply sorting and pagination to all cars if no filters
          let sortedCars = [...allCars];
          switch (sort) {
            case 'price_asc':
              sortedCars.sort((a, b) => a.price - b.price);
              break;
            case 'price_desc':
              sortedCars.sort((a, b) => b.price - a.price);
              break;
            case 'year_desc':
              sortedCars.sort((a, b) => b.year - a.year);
              break;
            case 'year_asc':
              sortedCars.sort((a, b) => a.year - b.year);
              break;
            case 'latest':
            default:
              sortedCars.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());
              break;
          }
          const start = (page - 1) * validPageSize;
          const end = start + validPageSize;
          return sortedCars.slice(start, end);
        }),
    hasFilters
      ? fetchCarsCountByFilters(filters)
      : fetchAllCars().then((allCars) => allCars.length),
    fetchAllMakes(),
    fetchAllFuelTypes(),
    fetchAllDriveTypes(),
    fetchAllTransmissions(),
  ]);

  const totalPages = Math.ceil(totalCount / validPageSize);

  const sanitizedMakes = sanitizeOptions(makes);
  const sanitizedFuelTypes = sanitizeOptions(fuelTypes);
  const sanitizedDriveTypes = sanitizeOptions(driveTypes);
  const sanitizedTransmissions = sanitizeOptions(transmissions);

  return (
    <div className="min-h-screen pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="mb-24 mt-24 text-center text-3xl font-light tracking-wide text-black michroma">
          Zgjidh makinën tënde
        </h1>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden w-80 shrink-0 lg:block">
            <FiltersSidebar
              makes={sanitizedMakes}
              fuelTypes={sanitizedFuelTypes}
              driveTypes={sanitizedDriveTypes}
              transmissions={sanitizedTransmissions}
            />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <CarGrid cars={cars} />

            
            {totalCount > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={totalCount}
                  pageSize={validPageSize}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Button */}
      <FiltersButton
        makes={sanitizedMakes}
        fuelTypes={sanitizedFuelTypes}
        driveTypes={sanitizedDriveTypes}
        transmissions={sanitizedTransmissions}
      />
    </div>
  );
}

