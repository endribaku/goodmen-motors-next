'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MultiTagDropdownProps {
  label: string;
  selected: string[];
  options: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  formatLabel?: (value: string) => string;
}

export function MultiTagDropdown({
  label,
  selected,
  options,
  onChange,
  placeholder = 'Select options',
  disabled = false,
  formatLabel: customFormatLabel,
}: MultiTagDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize and deduplicate options
  const normalizedOptions = useMemo(() => {
    if (!Array.isArray(options)) {
      console.warn(`MultiTagDropdown "${label}": options is not an array`, options);
      return [];
    }

    const validOptions = options
      .filter((opt): opt is string => {
        if (typeof opt !== 'string') {
          console.warn(`MultiTagDropdown "${label}": non-string option found`, opt);
          return false;
        }
        return opt.trim().length > 0;
      })
      .map((opt) => opt.trim());

    // Remove duplicates
    const unique = Array.from(new Set(validOptions));
    
    if (unique.length === 0) {
      console.warn(`MultiTagDropdown "${label}": no valid options after filtering`);
    }

    return unique;
  }, [options, label]);

  // Normalize selected values to only include valid options
  const normalizedSelected = useMemo(() => {
    if (!Array.isArray(selected)) {
      return [];
    }
    return selected.filter((value) => {
      const isValid = typeof value === 'string' && normalizedOptions.includes(value);
      if (!isValid && value) {
        console.warn(`MultiTagDropdown "${label}": selected value "${value}" is not in options`);
      }
      return isValid;
    });
  }, [selected, normalizedOptions, label]);

  // Sync selected values if they were invalid
  useEffect(() => {
    if (normalizedSelected.length !== selected.length) {
      onChange(normalizedSelected);
    }
  }, [normalizedSelected.length, selected.length, onChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOption = (value: string) => {
    if (normalizedSelected.includes(value)) {
      onChange(normalizedSelected.filter((v) => v !== value));
    } else {
      onChange([...normalizedSelected, value]);
    }
  };

  const removeTag = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(normalizedSelected.filter((v) => v !== value));
  };

  const formatLabel = (value: string) => {
    if (customFormatLabel) {
      return customFormatLabel(value);
    }
    return value
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex min-h-[44px] w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left text-sm transition-colors focus:border-gray-400 focus:outline-none',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <div className="flex flex-1 flex-wrap gap-2">
          {normalizedSelected.length > 0 ? (
            normalizedSelected.map((value) => (
              <Badge
                key={value}
                variant="muted"
                className="flex items-center gap-1 px-2 py-1 text-xs"
              >
                {formatLabel(value)}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => removeTag(value, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      removeTag(value, e as any);
                    }
                  }}
                  className="ml-1 cursor-pointer rounded-full px-1 text-xs hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label={`Remove ${value}`}
                >
                  ×
                </span>
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <img src="/helper-icons/listings/Icon/chevron-down.svg" alt="Arrow Down" className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-300 bg-white">
          <div className="max-h-60 overflow-y-auto p-2">
            {normalizedOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options available
              </div>
            ) : (
              <div className="space-y-1">
                {normalizedOptions.map((option) => {
                  const isSelected = normalizedSelected.includes(option);
                  return (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOption(option)}
                        className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-400"
                      />
                      <span className="flex-1 text-sm text-gray-700">
                        {formatLabel(option)}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
