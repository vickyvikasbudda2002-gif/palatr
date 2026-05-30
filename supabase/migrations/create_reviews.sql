-- Reviews (polymorphic: restaurants or hidden_gems)
CREATE TABLE IF NOT EXISTS public.reviews (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_id   uuid NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('restaurant','gem')),
  rating      smallint NOT NULL CHECK (rating BETWEEN 1 AND 10),
  review_text text NOT NULL DEFAULT '',
  must_try    text DEFAULT '',
  tags        text[] DEFAULT '{}',
  food_type   text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, target_id)
);
