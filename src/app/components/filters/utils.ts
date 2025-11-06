import type { Advocate } from '../../../types';
import type { AdvocateFilters } from './types';

export function applyFilters(
  advocates: Advocate[],
  filters: AdvocateFilters
): Advocate[] {
  return advocates.filter((advocate) => {
    if (
      filters.degrees.length > 0 &&
      !filters.degrees.includes(advocate.degree)
    ) {
      return false;
    }

    if (filters.experienceRange) {
      const years = advocate.yearsOfExperience;
      switch (filters.experienceRange) {
        case 'less-than-5':
          if (years >= 5) return false;
          break;
        case '5-10':
          if (years < 5 || years > 10) return false;
          break;
        case 'greater-than-10':
          if (years <= 10) return false;
          break;
      }
    }

    if (filters.specialties.length > 0) {
      const hasMatchingSpecialty = filters.specialties.some((filterSpecialty) =>
        advocate.specialties.includes(filterSpecialty)
      );
      if (!hasMatchingSpecialty) return false;
    }

    return true;
  });
}

export function getUniqueDegrees(advocates: Advocate[]): string[] {
  const degrees = new Set<string>();
  advocates.forEach((advocate) => degrees.add(advocate.degree));
  return Array.from(degrees).sort();
}

export function getUniqueSpecialties(advocates: Advocate[]): string[] {
  const specialties = new Set<string>();
  advocates.forEach((advocate) => {
    advocate.specialties.forEach((specialty) => specialties.add(specialty));
  });
  return Array.from(specialties).sort();
}

export function getDefaultFilters(): AdvocateFilters {
  return {
    degrees: [],
    experienceRange: null,
    specialties: [],
  };
}

export function getActiveFilterCount(filters: AdvocateFilters): number {
  let count = 0;
  if (filters.degrees.length > 0) count++;
  if (filters.experienceRange) count++;
  if (filters.specialties.length > 0) count++;
  return count;
}
