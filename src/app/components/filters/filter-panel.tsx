'use client';

import { useState, useEffect } from 'react';
import type { AdvocateFilters } from './types';
import { EXPERIENCE_RANGES } from './types';
import { getDefaultFilters } from './utils';

interface FilterPanelProps {
  filters: AdvocateFilters;
  onApplyFilters: (filters: AdvocateFilters) => void;
  availableDegrees: string[];
  availableSpecialties: string[];
  onClose: () => void;
}

function FilterPanel({
  filters,
  onApplyFilters,
  availableDegrees,
  availableSpecialties,
  onClose,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<AdvocateFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleDegreeToggle = (degree: string) => {
    const newDegrees = localFilters.degrees.includes(degree)
      ? localFilters.degrees.filter((d) => d !== degree)
      : [...localFilters.degrees, degree];
    setLocalFilters({ ...localFilters, degrees: newDegrees });
  };

  const handleExperienceChange = (range: string | null) => {
    setLocalFilters({
      ...localFilters,
      experienceRange: localFilters.experienceRange === range ? null : range,
    });
  };

  const handleSpecialtyToggle = (specialty: string) => {
    const newSpecialties = localFilters.specialties.includes(specialty)
      ? localFilters.specialties.filter((s) => s !== specialty)
      : [...localFilters.specialties, specialty];
    setLocalFilters({ ...localFilters, specialties: newSpecialties });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = getDefaultFilters();
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  return (
    <div className='absolute top-full right-0 mt-2 w-full sm:w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-6 z-50 max-h-[600px] overflow-y-auto'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold'>Filters</h3>
        <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
          ✕
        </button>
      </div>

      <div className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Degree
          </label>
          <div className='space-y-2'>
            {availableDegrees.map((degree) => (
              <label key={degree} className='flex items-center'>
                <input
                  type='checkbox'
                  checked={localFilters.degrees.includes(degree)}
                  onChange={() => handleDegreeToggle(degree)}
                  className='mr-2'
                />
                <span className='text-sm'>{degree}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Years of Experience
          </label>
          <div className='space-y-2'>
            {EXPERIENCE_RANGES.map((range) => (
              <label key={range.value} className='flex items-center'>
                <input
                  type='radio'
                  name='experience'
                  checked={localFilters.experienceRange === range.value}
                  onChange={() => handleExperienceChange(range.value)}
                  className='mr-2'
                />
                <span className='text-sm'>{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Specialties
          </label>
          <div className='space-y-2 max-h-48 overflow-y-auto'>
            {availableSpecialties.map((specialty) => (
              <label key={specialty} className='flex items-center'>
                <input
                  type='checkbox'
                  checked={localFilters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyToggle(specialty)}
                  className='mr-2'
                />
                <span className='text-sm'>{specialty}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-6 pt-4 border-t border-gray-200'>
        <button
          onClick={handleApply}
          className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;
