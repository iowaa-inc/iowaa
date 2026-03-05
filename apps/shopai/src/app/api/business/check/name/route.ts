import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/business/check/name
 * {
 *   "name": "Some Business Name"
 * }
 *
 * Response:
 *   { available: boolean }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return Response.json({ error: 'Business name is required' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('business_profiles')
      .select('id')
      .ilike('name', name.toLowerCase());

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const available = !data || data.length === 0;

    return Response.json({ available });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
