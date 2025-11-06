export interface AdvocateFilters {
  degrees: string[];
  experienceRange: string | null;
  specialties: string[];
}

export const EXPERIENCE_RANGES = [
  { value: 'less-than-5', label: 'Less than 5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: 'greater-than-10', label: 'Greater than 10 years' },
] as const;
