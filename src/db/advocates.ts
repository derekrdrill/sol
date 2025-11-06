import { getSupabaseClient } from './client/client';
import { handleSupabaseError } from './errors/errors.helpers';
import type { DbResult } from './index';
import type { Advocate } from '../types';

export interface AdvocateSearchParams {
  search?: string;
  degrees?: string[];
  experienceRange?: string | null;
  specialties?: string[];
}

export async function getAdvocates(
  params?: AdvocateSearchParams
): Promise<DbResult<Advocate[]>> {
  const supabase = await getSupabaseClient();
  let query = supabase.from('advocates').select('*');

  if (params?.search) {
    const searchTerm = `%${params.search.trim()}%`;
    query = query.or(
      `firstName.ilike.${searchTerm},lastName.ilike.${searchTerm},city.ilike.${searchTerm},degree.ilike.${searchTerm}`
    );
  }

  if (params?.degrees && params.degrees.length > 0) {
    query = query.in('degree', params.degrees);
  }

  if (params?.experienceRange) {
    switch (params.experienceRange) {
      case 'less-than-5':
        query = query.lt('yearsOfExperience', 5);
        break;
      case '5-10':
        query = query.gte('yearsOfExperience', 5).lte('yearsOfExperience', 10);
        break;
      case 'greater-than-10':
        query = query.gt('yearsOfExperience', 10);
        break;
    }
  }

  if (params?.specialties && params.specialties.length > 0) {
    query = query.overlaps('specialties', params.specialties);
  }

  const { data, error } = await query;

  return handleSupabaseError({
    data: data as Advocate[],
    error,
    fallbackError: 'Failed to fetch advocates',
  });
}

export async function getFilterOptions(): Promise<
  DbResult<{ degrees: string[]; specialties: string[] }>
> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from('advocates')
    .select('degree,specialties');

  if (error) {
    return { success: false, error: error.message };
  }

  if (!data) {
    return { success: false, error: 'Failed to fetch filter options' };
  }

  const degrees = new Set<string>();
  const specialties = new Set<string>();

  data.forEach((advocate) => {
    if (advocate.degree) degrees.add(advocate.degree);
    if (advocate.specialties && Array.isArray(advocate.specialties)) {
      advocate.specialties.forEach((specialty: string) => {
        if (specialty) specialties.add(specialty);
      });
    }
  });

  return {
    success: true,
    data: {
      degrees: Array.from(degrees).sort(),
      specialties: Array.from(specialties).sort(),
    },
  };
}
