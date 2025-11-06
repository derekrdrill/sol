import { getAdvocates } from '../../../db';
import type { AdvocateSearchParams } from '../../../db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params: AdvocateSearchParams = {};

  const search = searchParams.get('search');
  if (search) {
    params.search = search;
  }

  const degrees = searchParams.get('degrees');
  if (degrees) {
    params.degrees = degrees.split(',');
  }

  const experienceRange = searchParams.get('experienceRange');
  if (experienceRange) {
    params.experienceRange = experienceRange;
  }

  const specialties = searchParams.get('specialties');
  if (specialties) {
    params.specialties = specialties.split(',');
  }

  const result = await getAdvocates(
    Object.keys(params).length > 0 ? params : undefined
  );

  if (!result.success) {
    return Response.json({ error: result.error }, { status: 500 });
  }

  return Response.json({ data: result.data || [] });
}
