-- OTP codes table for email verification
-- Replaces in-memory Map which doesn't work across Next.js route instances
CREATE TABLE IF NOT EXISTS public.otp_codes (
  email       text PRIMARY KEY,
  otp         text NOT NULL,
  expires_at  timestamptz NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- No RLS needed — only accessed via service role key on the server
-- Auto-cleanup: delete expired OTPs older than 1 hour
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM public.otp_codes WHERE expires_at < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql;
