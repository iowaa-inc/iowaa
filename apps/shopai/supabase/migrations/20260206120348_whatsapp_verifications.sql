-------------------------------------------------------------------------------
-- MIGRATION: 5_whatsapp_verifications.sql
-------------------------------------------------------------------------------

-- Purpose:
--   Tracks OTP attempts for the WhatsApp number.

DROP TABLE IF EXISTS public.whatsapp_verifications CASCADE;

CREATE TABLE IF NOT EXISTS public.whatsapp_verifications (
    id               UUID         PRIMARY KEY      DEFAULT gen_random_uuid(),
    user_id          UUID         NOT NULL         REFERENCES auth.users(id) ON DELETE CASCADE,
    whatsapp_number  VARCHAR(20)  NOT NULL,
    otp_code         VARCHAR(6)   NOT NULL,
    attempt_count    INTEGER      DEFAULT 0,
    expires_at       TIMESTAMPTZ  NOT NULL,
    is_verified      BOOLEAN      DEFAULT false,
    created_at       TIMESTAMPTZ  DEFAULT NOW(),
    UNIQUE (user_id, whatsapp_number)
);

-- Row-Level Security: Enable for whatsapp_verifications
ALTER TABLE public.whatsapp_verifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their verifications" ON public.whatsapp_verifications;

-- Users can manage their own verifications
CREATE POLICY "Users can manage their verifications"
    ON public.whatsapp_verifications
    FOR ALL
    USING (auth.uid() = user_id);
