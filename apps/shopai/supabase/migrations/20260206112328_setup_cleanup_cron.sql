-- =====================================
-- Enable required extensions
-- =====================================
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- =====================================
-- Schedule the cleanup job
-- =====================================
-- Unschedule first before scheduling again for idempotency.
-- Wrapped in a DO block so it does not error if the job does not exist yet.
DO $$
BEGIN
    PERFORM cron.unschedule('cleanup-temp-files-job');
EXCEPTION
    WHEN OTHERS THEN
        -- Ignore errors (e.g., job does not exist yet)
        NULL;
END;
$$;

SELECT cron.schedule(
    'cleanup-temp-files-job',
    '0 * * * *', -- Every hour at minute 0
    $$
    SELECT net.http_post(
        url := 'https://qufwtsnbzmdqmzxfdvvp.supabase.co/functions/v1/cleanup-temp-files',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
        )
    ) AS request_id;
    $$
);

-- NOTE:
-- In production, store sensitive information such as cron job URLs and keys
-- in Supabase Vault or use environment variable placeholders (e.g., 'vault://...' or 'env(...)')
-- in your migration scripts, if supported by your CI/CD and infrastructure.
-- For simple or local development with 'supabase db push', you may need to insert
-- values directly, but ensure you do NOT commit secrets to version control.
-- Refer to the Supabase documentation for secure secrets management and automation best practices.