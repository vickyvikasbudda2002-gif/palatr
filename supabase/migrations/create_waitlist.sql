-- Waitlist for unlaunched cities
CREATE TABLE IF NOT EXISTS public.waitlist (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL,
  target_city text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(email, target_city)
);
