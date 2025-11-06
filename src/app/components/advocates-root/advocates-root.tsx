'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import type { Advocate } from '../../../types';
import { AdvocateCard } from '../../components';
import { AdvocateListItem } from '../../components';
import { SearchInput } from '../../components';
import { FilterButton } from '../../components';
import { getDefaultFilters } from '../filters/utils';
import type { AdvocateFilters } from '../filters/types';

interface AdvocatesProps {
  initialAdvocates: Advocate[];
}

type ViewMode = 'grid' | 'list';

function AdvocatesRoot({ initialAdvocates }: AdvocatesProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [filters, setFilters] = useState<AdvocateFilters>(getDefaultFilters());
  const [advocates, setAdvocates] = useState<Advocate[]>(initialAdvocates);
  const [isLoading, setIsLoading] = useState(false);
  const [availableDegrees, setAvailableDegrees] = useState<string[]>([]);
  const [availableSpecialties, setAvailableSpecialties] = useState<string[]>(
    []
  );

  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const response = await fetch('/api/advocates/filter-options');
        if (response.ok) {
          const { data } = await response.json();
          setAvailableDegrees(data.degrees || []);
          setAvailableSpecialties(data.specialties || []);
        }
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    }

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    async function fetchAdvocates() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();

        if (activeSearchTerm.trim()) {
          params.append('search', activeSearchTerm.trim());
        }

        if (filters.degrees.length > 0) {
          params.append('degrees', filters.degrees.join(','));
        }

        if (filters.experienceRange) {
          params.append('experienceRange', filters.experienceRange);
        }

        if (filters.specialties.length > 0) {
          params.append('specialties', filters.specialties.join(','));
        }

        const queryString = params.toString();
        const url = queryString
          ? `/api/advocates?${queryString}`
          : '/api/advocates';

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: 'Failed to fetch advocates' }));
          throw new Error(errorData.error || 'Failed to load advocates');
        }

        const { data } = await response.json();
        setAdvocates(data || []);
      } catch (error) {
        console.error('Error fetching advocates:', error);
        setAdvocates([]);
      } finally {
        setIsLoading(false);
      }
    }

    const hasActiveFilters =
      activeSearchTerm.trim() ||
      filters.degrees.length > 0 ||
      filters.experienceRange ||
      filters.specialties.length > 0;

    if (hasActiveFilters) {
      fetchAdvocates();
    } else {
      setAdvocates(initialAdvocates);
    }
  }, [activeSearchTerm, filters, initialAdvocates]);

  const handleSearch = () => {
    setActiveSearchTerm(searchTerm.trim());
  };

  const handleFiltersChange = (newFilters: AdvocateFilters) => {
    setFilters(newFilters);
    setActiveSearchTerm(searchTerm.trim());
  };

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
            onSearch={handleSearch}
            isLoading={isLoading}
            placeholder='Search by name, city, degree, experience, or specialties...'
          />
        </div>
        <FilterButton
          filters={filters}
          onApplyFilters={handleFiltersChange}
          availableDegrees={availableDegrees}
          availableSpecialties={availableSpecialties}
        />
      </div>

      {isLoading ? (
        <div className='text-center py-8'>
          <p className='text-gray-600'>Loading advocates...</p>
        </div>
      ) : (
        <>
          {isGridMode && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {advocates.map((advocate) => (
                <AdvocateCard key={advocate.id} advocate={advocate} />
              ))}
            </div>
          )}
          {isListMode && (
            <div className='space-y-4'>
              {advocates.map((advocate) => (
                <AdvocateListItem key={advocate.id} advocate={advocate} />
              ))}
            </div>
          )}
          {advocates.length === 0 && !isLoading && (
            <div className='text-center py-8'>
              <p className='text-gray-600'>No advocates found.</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default AdvocatesRoot;
