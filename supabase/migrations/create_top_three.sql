-- User Top 3 Rankings
CREATE TABLE IF NOT EXISTS public.user_top_three (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rank          smallint NOT NULL CHECK (rank BETWEEN 1 AND 3),
  restaurant_id uuid NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  custom_dish   text DEFAULT '',
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, rank)
);
