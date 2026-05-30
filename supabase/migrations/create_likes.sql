-- Likes (polymorphic, one like per user per target)
CREATE TABLE IF NOT EXISTS public.likes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_id   uuid NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('restaurant','gem')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, target_id)
);
