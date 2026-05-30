-- Restaurants master table
CREATE TABLE IF NOT EXISTS public.restaurants (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  description     text NOT NULL DEFAULT '',
  cuisine_state   text NOT NULL,
  type            text NOT NULL DEFAULT 'both',
  status          text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  image_url       text NOT NULL DEFAULT '',
  gallery_urls    text[] DEFAULT '{}',
  latitude        float8,
  longitude       float8,
  maps_link       text,
  must_try_dishes text,
  submitted_by    uuid REFERENCES public.users(id) ON DELETE SET NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);
