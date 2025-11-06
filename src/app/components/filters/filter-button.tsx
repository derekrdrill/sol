'use client';

import { useState, useRef, useEffect } from 'react';
import type { AdvocateFilters } from './types';
import { getActiveFilterCount } from './utils';
import FilterPanel from './filter-panel';

interface FilterButtonProps {
  filters: AdvocateFilters;
  onFiltersChange: (filters: AdvocateFilters) => void;
  availableDegrees: string[];
  availableSpecialties: string[];
}

function FilterButton({
  filters,
  onFiltersChange,
  availableDegrees,
  availableSpecialties,
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCount = getActiveFilterCount(filters);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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

  return (
    <div ref={containerRef} className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors'
      >
        <span>Filters</span>
        {activeCount > 0 && (
          <span className='bg-blue-600 text-white text-xs rounded-full px-2 py-0.5'>
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <FilterPanel
          filters={filters}
          onFiltersChange={onFiltersChange}
          availableDegrees={availableDegrees}
          availableSpecialties={availableSpecialties}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default FilterButton;
