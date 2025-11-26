'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FiltersProps {
  makes: string[];
}

const driveOptions = [
  { label: 'FWD', value: 'fwd' },
  { label: 'RWD', value: 'rwd' },
  { label: 'AWD', value: 'awd' },
  { label: '4MATIC', value: '4matic' },
  { label: 'xDrive', value: 'xdrive' },
  { label: 'quattro', value: 'quattro' },
];

export default function Filters({ makes }: FiltersProps) {
  const router = useRouter();
  const params = useSearchParams();

  const [filters, setFilters] = useState({
    make: params.get('make') || '',
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || '',
    minYear: params.get('minYear') || '',
    maxYear: params.get('maxYear') || '',
    minMileage: params.get('minMileage') || '',
    maxMileage: params.get('maxMileage') || '',
    driveType: params.get('driveType') || '',
  });

  const handleChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const search = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) search.set(key, value);
    });
    router.push(`/listings${search.toString() ? `?${search}` : ''}`);
  };

  const clearFilters = () => {
    setFilters({
      make: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      minMileage: '',
      maxMileage: '',
      driveType: '',
    });
    router.push('/listings');
  };

  return (
    <Card className="sticky top-20 z-30 border-gray-200/80 bg-white/90 backdrop-blur dark:border-gray-800/70 dark:bg-gray-950/70">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Refine Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <select
            value={filters.make}
            onChange={(e) => handleChange('make', e.target.value)}
            className="h-11 rounded-2xl border border-gray-200 bg-white/90 px-4 text-sm font-medium text-gray-700  focus-visible:outline-none focus-visible:ring-2 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-100"
          >
            <option value="">All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            ))}
          </select>
          <Input
            type="number"
            placeholder="Min Price (€)"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Price (€)"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Min Year"
            value={filters.minYear}
            onChange={(e) => handleChange('minYear', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Year"
            value={filters.maxYear}
            onChange={(e) => handleChange('maxYear', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Min Mileage"
            value={filters.minMileage}
            onChange={(e) => handleChange('minMileage', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Mileage"
            value={filters.maxMileage}
            onChange={(e) => handleChange('maxMileage', e.target.value)}
          />
          <select
            value={filters.driveType}
            onChange={(e) => handleChange('driveType', e.target.value)}
            className="h-11 rounded-2xl border border-gray-200 bg-white/90 px-4 text-sm font-medium text-gray-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-100"
          >
            <option value="">Drive Type</option>
            {driveOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={applyFilters} className="min-w-[140px]">
            Apply Filters
          </Button>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="min-w-[140px]"
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

