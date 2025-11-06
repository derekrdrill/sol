'use client';

import classNames from 'classnames';
import { useMemo, useState } from 'react';
import type { Advocate } from '../../../types';
import { AdvocateCard } from '../../components';
import { AdvocateListItem } from '../../components';
import { SearchInput } from '../../components';
import { FilterButton } from '../../components';
import { filterAdvocates } from '../search-input/utils';
import {
  getUniqueDegrees,
  getUniqueSpecialties,
  getDefaultFilters,
} from '../filters/utils';
import type { AdvocateFilters } from '../filters/types';

interface AdvocatesProps {
  initialAdvocates: Advocate[];
}

type ViewMode = 'grid' | 'list';

function AdvocatesRoot({ initialAdvocates }: AdvocatesProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<AdvocateFilters>(getDefaultFilters());

  const availableDegrees = useMemo(
    () => getUniqueDegrees(initialAdvocates),
    [initialAdvocates]
  );
  const availableSpecialties = useMemo(
    () => getUniqueSpecialties(initialAdvocates),
    [initialAdvocates]
  );

  const filteredAdvocates = useMemo(
    () => filterAdvocates(initialAdvocates, searchTerm, filters),
    [initialAdvocates, searchTerm, filters]
  );

  const isGridMode = viewMode === 'grid';
  const isListMode = viewMode === 'list';

  return (
    <main className='container mx-auto px-6 py-8'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold'>Solace Advocates</h1>
        <div className='flex gap-2 border border-gray-300 rounded-lg p-1'>
          <button
            onClick={() => setViewMode('grid')}
            className={classNames('px-4 py-2 rounded transition-colors', {
              'bg-blue-600 text-white': isGridMode,
              'bg-white text-gray-700 hover:bg-gray-100': isListMode,
            })}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={classNames('px-4 py-2 rounded transition-colors', {
              'bg-blue-600 text-white': isListMode,
              'bg-white text-gray-700 hover:bg-gray-100': isGridMode,
            })}
          >
            List
          </button>
        </div>
      </div>

      <div className='mb-6 flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder='Search by name, city, degree, experience, or specialties...'
          />
        </div>
        <FilterButton
          filters={filters}
          onFiltersChange={setFilters}
          availableDegrees={availableDegrees}
          availableSpecialties={availableSpecialties}
        />
      </div>

      {isGridMode && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredAdvocates.map((advocate) => (
            <AdvocateCard key={advocate.id} advocate={advocate} />
          ))}
        </div>
      )}
      {isListMode && (
        <div className='space-y-4'>
          {filteredAdvocates.map((advocate) => (
            <AdvocateListItem key={advocate.id} advocate={advocate} />
          ))}
        </div>
      )}
    </main>
  );
}

export default AdvocatesRoot;
