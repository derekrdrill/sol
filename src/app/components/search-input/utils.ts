import type { Advocate } from '../../../types';

export function filterAdvocates(
  advocates: Advocate[],
  searchTerm: string
): Advocate[] {
  if (!searchTerm.trim()) {
    return advocates;
  }

  const term = searchTerm.toLowerCase().trim();

  return advocates.filter((advocate) => {
    const fullName = `${advocate.firstName} ${advocate.lastName}`.toLowerCase();
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
