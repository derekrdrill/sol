export type DbResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export { getSupabaseClient } from './client/client';
export {
  createError,
  createSuccess,
  getErrorMessage,
  handleDbOperation,
  handleSupabaseError,
  notFound,
  validationError,
  formatErrorMessage,
} from './errors/errors.helpers';
export { getAdvocates, getFilterOptions } from './advocates';
export type { AdvocateSearchParams } from './advocates';
