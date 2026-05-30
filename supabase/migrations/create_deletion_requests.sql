-- Account Deletion Requests
CREATE TABLE IF NOT EXISTS public.deletion_requests (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reason      text,
  status      text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','completed')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
