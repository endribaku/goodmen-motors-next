'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MultiTagDropdown } from '@/components/ui/multi-tag-dropdown';
import { cn, translateFuelType } from '@/lib/utils';

export interface FilterState {
  keyword: string;
  makes: string[];
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
    makes: searchParams.get('makes')?.split(',').filter(Boolean) || 
           (searchParams.get('make') ? [searchParams.get('make')!] : []), // Support old 'make' param for backward compatibility
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
  const isInitialMount = useRef(true);

  // Fetch models when makes change
  useEffect(() => {
    async function fetchModelsByMakes() {
      if (filters.makes.length > 0) {
        try {
          const makesParam = filters.makes.map(m => encodeURIComponent(m)).join(',');
          const response = await fetch(`/api/models?makes=${makesParam}`);
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

    fetchModelsByMakes();
  }, [filters.makes]);

  // Mark initial mount as complete after first render
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

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
      // Clear models when makes change
      if (key === 'makes') {
        const prevMakes = prev.makes || [];
        const newMakes = value as string[];
        // Check if makes actually changed
        if (prevMakes.length !== newMakes.length || 
            !prevMakes.every((make, idx) => make === newMakes[idx])) {
          next.models = [];
        }
      }
      return next;
    });
  };

  // Helper function to build URL params from current filters
  const buildURLParams = () => {
    const params = new URLSearchParams();

    // Preserve sort and pageSize
    const currentSort = searchParams.get('sort');
    const currentPageSize = searchParams.get('pageSize');
    if (currentSort) params.set('sort', currentSort);
    if (currentPageSize) params.set('pageSize', currentPageSize);

    // Add filters
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.makes.length > 0) params.set('makes', filters.makes.join(','));
    if (filters.models.length > 0) params.set('models', filters.models.join(','));
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minMileage) params.set('minMileage', filters.minMileage);
    if (filters.maxMileage) params.set('maxMileage', filters.maxMileage);
    if (filters.fuelTypes.length > 0) params.set('fuelTypes', filters.fuelTypes.join(','));
    if (filters.driveTypes.length > 0) params.set('driveTypes', filters.driveTypes.join(','));
    if (filters.transmissions.length > 0)
      params.set('transmissions', filters.transmissions.join(','));

    // Reset to page 1 when filters change
    params.set('page', '1');

    return params;
  };

  // Auto-apply filters when dropdown selections change (immediate)
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) return;

    const params = buildURLParams();
    router.push(`/listings?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.makes, filters.models, filters.fuelTypes, filters.driveTypes, filters.transmissions]);

  // Auto-apply filters for text inputs with debounce
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) return;

    const timer = setTimeout(() => {
      const params = buildURLParams();
      router.push(`/listings?${params.toString()}`);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.minPrice, filters.maxPrice, filters.minMileage, filters.maxMileage, filters.keyword]);

  const applyFilters = () => {
    // Filters are now auto-applied, but keep this for manual trigger if needed
    const params = buildURLParams();
    router.push(`/listings?${params.toString()}`);
    // Close mobile drawer after applying
    if (onClose) onClose();
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      makes: [],
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
    filters.makes.length > 0 ||
    filters.models.length > 0 ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minMileage ||
    filters.maxMileage ||
    filters.fuelTypes.length > 0 ||
    filters.driveTypes.length > 0 ||
    filters.transmissions.length > 0;

  const sortOrder = searchParams.get('sort') || 'latest';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'latest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    router.push(`/listings?${params.toString()}`);
  };

  const sidebarContent = (
    <div className="h-full rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Filtro</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close filters"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Sorting Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Renditja</label>
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 pr-10 text-sm text-gray-700 focus:border-gray-400 focus:outline-none"
            >
              <option value="latest">Të fundit</option>
              <option value="price_asc">Çmimi: Nga më i ulët</option>
              <option value="price_desc">Çmimi: Nga më i lartë</option>
              <option value="year_desc">Viti: Nga më i ri</option>
              <option value="year_asc">Viti: Nga më i vjetër</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <img src="/helper-icons/listings/Icon/chevron-down.svg" alt="Arrow Down" className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Marka */}
        <div>
          <MultiTagDropdown
            label="Marka"
            selected={filters.makes}
            options={makes}
            onChange={(values) => updateFilter('makes', values)}
            placeholder="Zgjidh markën"
          />
        </div>

        {/* Modeli */}
        <div>
          <MultiTagDropdown
            label="Modeli"
            selected={filters.models}
            options={availableModels}
            onChange={(values) => updateFilter('models', values)}
            placeholder="Zgjidh modelin"
            disabled={filters.makes.length === 0}
          />
        </div>

        {/* Çmimi */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Çmimi</label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Nga"
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              className="h-11 rounded-lg border-gray-300 bg-white focus:border-gray-400"
            />
            <Input
              type="number"
              placeholder="Deri"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              className="h-11 rounded-lg border-gray-300 bg-white focus:border-gray-400"
            />
          </div>
        </div>

        {/* Kilometrazhi */}
        <div>
          <label className="mb-2 block text-sm font-medium">Kilometrazhi</label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Nga"
              value={filters.minMileage}
              onChange={(e) => updateFilter('minMileage', e.target.value)}
              className="h-11 rounded-lg border-gray-300 focus:border-gray-400 bg-white text-black"
            />
            <Input
              type="number"
              placeholder="Deri"
              value={filters.maxMileage}
              onChange={(e) => updateFilter('maxMileage', e.target.value)}
              className="h-11 rounded-lg border-gray-300 bg-white focus:border-gray-400 text-black"
            />
          </div>
        </div>

        {/* Karburanti */}
        <div>
          <MultiTagDropdown
            label="Karburanti"
            selected={filters.fuelTypes}
            options={fuelTypes}
            onChange={(values) => updateFilter('fuelTypes', values)}
            placeholder="Zgjidh karburantin"
            formatLabel={translateFuelType}
          />
        </div>

        {/* Transmisioni */}
        <div>
          <MultiTagDropdown
            label="Transmisioni"
            selected={filters.transmissions}
            options={transmissions}
            onChange={(values) => updateFilter('transmissions', values)}
            placeholder="Zgjidh transmisionin"
          />
        </div>

        {/* Apply Button */}
        <Button onClick={applyFilters} className="w-full bg-[#0044FF] border border-gray-300 text-white headline hover:bg-[#0044FF]/80" size="lg">
          Apliko Filtra
        </Button>

        {hasActiveFilters && (
          <Button onClick={clearFilters} className="w-full bg-white text-black hover:bg-gray-50 border-gray-300 shadow-none headline" size="sm">
            Pastro Filtra
          </Button>
        )}
      </div>
    </div>
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

