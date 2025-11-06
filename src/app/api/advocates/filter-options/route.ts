import { getFilterOptions } from '../../../../db';

export async function GET() {
  const result = await getFilterOptions();

  if (!result.success) {
    return Response.json({ error: result.error }, { status: 500 });
  }

  return Response.json({ data: result.data });
}
