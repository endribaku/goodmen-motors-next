'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/listings?${params.toString()}`);
  };

  const handlePageSizeChange = (newSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', newSize.toString());
    params.set('page', '1'); // Reset to first page when changing page size
    router.push(`/listings?${params.toString()}`);
  };

  const pageSizeOptions = [12, 24, 48, 96];

  // Calculate range of items shown
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start
      if (currentPage <= 3) {
        end = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row">
      {/* Results info */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-medium text-gray-900 dark:text-white">{startItem}</span> to{' '}
        <span className="font-medium text-gray-900 dark:text-white">{endItem}</span> of{' '}
        <span className="font-medium text-gray-900 dark:text-white">{totalItems}</span> vehicles
      </div>

      {/* Page size selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Show:</label>
        <select
          value={pageSize}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            handlePageSizeChange(newSize);
          }}
          className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9"
        >
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                size="sm"
                onClick={() => goToPage(pageNum)}
                className={cn(
                  'h-9 min-w-[36px]',
                  currentPage === pageNum && 'bg-gray-900 text-white hover:bg-gray-800',
                )}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

