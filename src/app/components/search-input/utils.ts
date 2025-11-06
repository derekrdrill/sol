import type { Advocate } from '../../../types';
import type { AdvocateFilters } from '../filters/types';
import { applyFilters } from '../filters/utils';

export function filterAdvocates(
  advocates: Advocate[],
  searchTerm: string,
  filters: AdvocateFilters
): Advocate[] {
  let filtered = advocates;

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim();

    filtered = filtered.filter((advocate) => {
      const fullName =
        `${advocate.firstName} ${advocate.lastName}`.toLowerCase();
      const matchesName =
        advocate.firstName.toLowerCase().includes(term) ||
        advocate.lastName.toLowerCase().includes(term) ||
        fullName.includes(term);
      const matchesCity = advocate.city.toLowerCase().includes(term);
      const matchesDegree = advocate.degree.toLowerCase().includes(term);
      const matchesExperience = advocate.yearsOfExperience
        .toString()
        .includes(term);
      const matchesSpecialties = advocate.specialties.some((specialty) =>
        specialty.toLowerCase().includes(term)
      );

      return (
        matchesName ||
        matchesCity ||
        matchesDegree ||
        matchesExperience ||
        matchesSpecialties
      );
    });
  }

  return applyFilters(filtered, filters);
}
