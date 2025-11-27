'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FiltersSidebar from './FiltersSidebar';

interface FiltersButtonProps {
  makes: string[];
  fuelTypes: string[];
  driveTypes: string[];
  transmissions: string[];
}

export default function FiltersButton({
  makes,
  fuelTypes,
  driveTypes,
  transmissions,
}: FiltersButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button - Fixed at bottom */}
      <div className="fixed bottom-6 right-6 z-30 lg:hidden">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 rounded-full shadow-lg border-none bg-[#0044FF] hover:bg-[#0044FF]/90 text-white transition hover:translate-y-[-5px] duration-500 pointer-coarse"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </Button>
      </div>

      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <FiltersSidebar
          makes={makes}
          fuelTypes={fuelTypes}
          driveTypes={driveTypes}
          transmissions={transmissions}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </>
  );
}

