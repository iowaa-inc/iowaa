-------------------------------------------------------------------------------
-- MIGRATION: 4_compliance_documents.sql
-------------------------------------------------------------------------------

-- Purpose:
--   Handles multiple identity documents (CAC, TIN, etc.) cleanly.

DROP TABLE IF EXISTS public.compliance_documents CASCADE;

CREATE TABLE IF NOT EXISTS public.compliance_documents (
    id                   UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id          UUID         NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    doc_type             VARCHAR(50)  NOT NULL,
    file_url             TEXT         NOT NULL,
    mime_type            VARCHAR(100),
    file_size_bytes      BIGINT,
    verification_status  VARCHAR(20)  DEFAULT 'PENDING'
                                    CHECK (verification_status IN ('PENDING', 'APPROVED', 'REJECTED')),
    rejection_reason     TEXT,
    uploaded_at          TIMESTAMPTZ  DEFAULT NOW(),
    UNIQUE (business_id, doc_type)
);

-- Row-Level Security: Compliance
ALTER TABLE public.compliance_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owners can view their documents" ON public.compliance_documents;
DROP POLICY IF EXISTS "Owners can upload documents" ON public.compliance_documents;

CREATE POLICY "Owners can view their documents"
    ON public.compliance_documents
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses
            WHERE id = public.compliance_documents.business_id
              AND owner_id = auth.uid()
        )
    );

CREATE POLICY "Owners can upload documents"
    ON public.compliance_documents
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.businesses
            WHERE id = public.compliance_documents.business_id
              AND owner_id = auth.uid()
        )
    );

