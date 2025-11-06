'use client';

import type { AdvocateFilters } from './types';
import { EXPERIENCE_RANGES } from './types';

interface FilterPanelProps {
  filters: AdvocateFilters;
  onFiltersChange: (filters: AdvocateFilters) => void;
  availableDegrees: string[];
  availableSpecialties: string[];
  onClose: () => void;
}

function FilterPanel({
  filters,
  onFiltersChange,
  availableDegrees,
  availableSpecialties,
  onClose,
}: FilterPanelProps) {
  const handleDegreeToggle = (degree: string) => {
    const newDegrees = filters.degrees.includes(degree)
      ? filters.degrees.filter((d) => d !== degree)
      : [...filters.degrees, degree];
    onFiltersChange({ ...filters, degrees: newDegrees });
  };

  const handleExperienceChange = (range: string | null) => {
    onFiltersChange({
      ...filters,
      experienceRange: filters.experienceRange === range ? null : range,
    });
  };

  const handleSpecialtyToggle = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter((s) => s !== specialty)
      : [...filters.specialties, specialty];
    onFiltersChange({ ...filters, specialties: newSpecialties });
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
                  checked={filters.degrees.includes(degree)}
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
                  checked={filters.experienceRange === range.value}
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
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyToggle(specialty)}
                  className='mr-2'
                />
                <span className='text-sm'>{specialty}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
