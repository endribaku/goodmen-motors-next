import { CarListing } from '@/sanity/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SpecsTableProps {
  car: CarListing;
}

const rows = (car: CarListing) => [
  { label: 'Year', value: car.year },
  { label: 'Make', value: car.make },
  { label: 'Model', value: car.model },
  {
    label: 'Mileage',
    value: car.mileage
      ? `${new Intl.NumberFormat('en-US').format(car.mileage)}mi`
      : 'N/A',
  },
  { label: 'Engine', value: car.engineDisplacement ? `${car.engineDisplacement}L ${car.engineLayout || ''}` : 'N/A' },
  { label: 'Fuel', value: car.fuelType || 'N/A' },
  { label: 'Drive', value: car.driveType || 'N/A' },
  { label: 'Transmission', value: car.transmission || 'N/A' },
  { label: 'Origin Country', value: car.originCountry || 'N/A' },
  { label: 'Delivery Regions', value: car.deliveryRegions?.join(', ') || 'Upon request' },
];

export default function SpecsTable({ car }: SpecsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows(car).map((row) => (
          <div
            key={row.label}
            className="flex flex-col rounded-2xl bg-gray-50/70 px-4 py-3 text-sm dark:bg-gray-900/60 sm:flex-row sm:items-center"
          >
            <span className="w-48 text-gray-500">{row.label}</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{row.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

