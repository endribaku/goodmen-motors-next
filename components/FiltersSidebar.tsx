'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MultiTagDropdown } from '@/components/ui/multi-tag-dropdown';
import { cn } from '@/lib/utils';

export interface FilterState {
  keyword: string;
  make: string;
  models: string[];
  minPrice: string;
  maxPrice: string;
  minMileage: string;
  maxMileage: string;
  fuelTypes: string[];
  driveTypes: string[];
  transmissions: string[];
}

interface FiltersSidebarProps {
  makes: string[];
  fuelTypes: string[];
  driveTypes: string[];
  transmissions: string[];
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FiltersSidebar({
  makes,
  fuelTypes,
  driveTypes,
  transmissions,
  isOpen = true,
  onClose,
}: FiltersSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    keyword: searchParams.get('keyword') || '',
    make: searchParams.get('make') || '',
    models: searchParams.get('models')?.split(',').filter(Boolean) || [],
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minMileage: searchParams.get('minMileage') || '',
    maxMileage: searchParams.get('maxMileage') || '',
    fuelTypes: searchParams.get('fuelTypes')?.split(',').filter(Boolean) || [],
    driveTypes: searchParams.get('driveTypes')?.split(',').filter(Boolean) || [],
    transmissions: searchParams.get('transmissions')?.split(',').filter(Boolean) || [],
  });

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['search', 'basics', 'price', 'powertrain']),
  );

  const [availableModels, setAvailableModels] = useState<string[]>([]);

  // Fetch models when make changes
  useEffect(() => {
    async function fetchModelsByMake() {
      if (filters.make) {
        try {
          const response = await fetch(`/api/models?make=${encodeURIComponent(filters.make)}`);
          const data = await response.json();
          setAvailableModels(data.models || []);
        } catch (error) {
          console.error('Error fetching models:', error);
          setAvailableModels([]);
        }
      } else {
        setAvailableModels([]);
      }
    }

    fetchModelsByMake();
  }, [filters.make]);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      // Clear models when make changes
      if (key === 'make' && value !== prev.make) {
        next.models = [];
      }
      return next;
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.make) params.set('make', filters.make);
    if (filters.models.length > 0) params.set('models', filters.models.join(','));
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minMileage) params.set('minMileage', filters.minMileage);
    if (filters.maxMileage) params.set('maxMileage', filters.maxMileage);
    if (filters.fuelTypes.length > 0) params.set('fuelTypes', filters.fuelTypes.join(','));
    if (filters.driveTypes.length > 0) params.set('driveTypes', filters.driveTypes.join(','));
    if (filters.transmissions.length > 0)
      params.set('transmissions', filters.transmissions.join(','));

    router.push(`/listings?${params.toString()}`);
    // Close mobile drawer after applying
    if (onClose) onClose();
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      make: '',
      models: [],
      minPrice: '',
      maxPrice: '',
      minMileage: '',
      maxMileage: '',
      fuelTypes: [],
      driveTypes: [],
      transmissions: [],
    });
    router.push('/listings');
  };

  const hasActiveFilters =
    filters.keyword ||
    filters.make ||
    filters.models.length > 0 ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minMileage ||
    filters.maxMileage ||
    filters.fuelTypes.length > 0 ||
    filters.driveTypes.length > 0 ||
    filters.transmissions.length > 0;

  const sidebarContent = (
    <Card className="h-full border-gray-200/80 bg-white/95 backdrop-blur dark:border-gray-800/70 dark:bg-gray-950/95">
      <CardHeader className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Refine Search</CardTitle>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
              aria-label="Close filters"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto p-6">
        <div className="space-y-6">
          {/* GROUP 1: Search */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => toggleGroup('search')}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Search</h3>
              <svg
                className={cn(
                  'h-4 w-4 text-gray-500 transition-transform',
                  expandedGroups.has('search') && 'rotate-180',
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedGroups.has('search') && (
              <div>
                <Input
                  type="text"
                  placeholder="Search by keyword..."
                  value={filters.keyword}
                  onChange={(e) => updateFilter('keyword', e.target.value)}
                />
              </div>
            )}
          </div>

          {/* GROUP 2: Vehicle Basics */}
          <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-800">
            <button
              type="button"
              onClick={() => toggleGroup('basics')}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Vehicle Basics</h3>
              <svg
                className={cn(
                  'h-4 w-4 text-gray-500 transition-transform',
                  expandedGroups.has('basics') && 'rotate-180',
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedGroups.has('basics') && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Make
                  </label>
                  <select
                    value={filters.make}
                    onChange={(e) => updateFilter('make', e.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
                  >
                    <option value="">All Makes</option>
                    {makes.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>
                <MultiTagDropdown
                  label="Model"
                  selected={filters.models}
                  options={availableModels}
                  onChange={(values) => updateFilter('models', values)}
                  placeholder="Select models"
                  disabled={!filters.make}
                />
              </div>
            )}
          </div>

          {/* GROUP 3: Price & Mileage */}
          <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-800">
            <button
              type="button"
              onClick={() => toggleGroup('price')}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Price & Mileage
              </h3>
              <svg
                className={cn(
                  'h-4 w-4 text-gray-500 transition-transform',
                  expandedGroups.has('price') && 'rotate-180',
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedGroups.has('price') && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Min Price (€)
                  </label>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Max Price (€)
                  </label>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Min Mileage
                  </label>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minMileage}
                    onChange={(e) => updateFilter('minMileage', e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Max Mileage
                  </label>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxMileage}
                    onChange={(e) => updateFilter('maxMileage', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* GROUP 4: Powertrain */}
          <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-800">
            <button
              type="button"
              onClick={() => toggleGroup('powertrain')}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Powertrain</h3>
              <svg
                className={cn(
                  'h-4 w-4 text-gray-500 transition-transform',
                  expandedGroups.has('powertrain') && 'rotate-180',
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedGroups.has('powertrain') && (
              <div className="space-y-4">
                <MultiTagDropdown
                  label="Fuel Type"
                  selected={filters.fuelTypes}
                  options={fuelTypes}
                  onChange={(values) => updateFilter('fuelTypes', values)}
                  placeholder="Select fuel types"
                />
                <MultiTagDropdown
                  label="Drive Type"
                  selected={filters.driveTypes}
                  options={driveTypes}
                  onChange={(values) => updateFilter('driveTypes', values)}
                  placeholder="Select drive types"
                />
                <MultiTagDropdown
                  label="Transmission"
                  selected={filters.transmissions}
                  options={transmissions}
                  onChange={(values) => updateFilter('transmissions', values)}
                  placeholder="Select transmissions"
                />
              </div>
            )}
          </div>

          {/* Apply Button */}
          <div className="sticky bottom-0 border-t border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-gray-950">
            <Button onClick={applyFilters} className="w-full" size="lg">
              Apply Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Mobile: Overlay + Drawer */}
      {onClose && (
        <>
          <div
            className={cn(
              'fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden',
              isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            onClick={onClose}
          />
          <aside
            className={cn(
              'fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] transform overflow-hidden bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-gray-950 lg:hidden',
              isOpen ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            {sidebarContent}
          </aside>
        </>
      )}

      {/* Desktop: Persistent Sidebar */}
      <aside className={cn('hidden lg:block', onClose && 'lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]')}>
        {sidebarContent}
      </aside>
    </>
  );
}

