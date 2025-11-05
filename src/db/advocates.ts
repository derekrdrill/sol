import { getSupabaseClient } from './client/client';
import { handleSupabaseError } from './errors/errors.helpers';
import type { DbResult } from './index';
import type { Advocate } from '../types';

export async function getAdvocates(): Promise<DbResult<Advocate[]>> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.from('advocates').select('*');

  return handleSupabaseError({
    data: data as Advocate[],
    error,
    fallbackError: 'Failed to fetch advocates',
  });
}
