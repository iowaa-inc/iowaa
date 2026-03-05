import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.2.2';

const BUCKET_NAME = 'public-assets';
const EXPIRATION_HOURS = 24;
const BATCH_SIZE = 100;

Deno.serve(async (req: Request) => {
  try {
    // SECURITY CHECK: Only allow calls with Service Role key
    const authHeader = req.headers.get('Authorization');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (authHeader !== `Bearer ${serviceRoleKey}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey ?? '');

    // Calculate cutoff (files older than EXPIRATION_HOURS)
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - EXPIRATION_HOURS);

    // Fetch expired records
    const { data: expiredFiles, error: fetchError } = await supabaseAdmin
      .from('temp_uploads')
      .select('id, storage_path')
      .lt('created_at', cutoffDate.toISOString())
      .limit(BATCH_SIZE);

    if (fetchError) {
      throw fetchError;
    }

    if (!expiredFiles?.length) {
      // Pause the cleanup function from running again the next hour, except a new temp file has been added
      // (Save server reource from unnecessary checks)
      // The users upload of new temp file should trigger the rescheduling of the cleanup
      return new Response(JSON.stringify({ message: 'No expired files found.' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pathsToDelete = expiredFiles.map((file) => file.storage_path);
    const idsToDelete = expiredFiles.map((file) => file.id);

    // Delete from Storage
    const { error: storageError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove(pathsToDelete);

    if (storageError) {
      // Fail safely: Don't delete from DB so we can retry later
      console.error('Storage error:', storageError);
      throw new Error('Storage deletion failed, aborting DB cleanup.');
    }

    // Delete from Database
    const { error: dbError } = await supabaseAdmin
      .from('temp_uploads')
      .delete()
      .in('id', idsToDelete);

    if (dbError) {
      throw dbError;
    }

    return new Response(JSON.stringify({ success: true, deleted_count: idsToDelete.length }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Cleanup failed:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
});

/*
  To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

    curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/cleanup-temp-files' \
      --header 'Authorization: Bearer ' \
      --header 'Content-Type: application/json' \
      --data '{"name":"Functions"}'
*/
