-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text NOT NULL UNIQUE,
  first_name  text NOT NULL,
  last_name   text,
  home_state  text NOT NULL,
  current_city text NOT NULL DEFAULT 'Bangalore',
  spice_tolerance text NOT NULL DEFAULT 'medium',
  food_pref   text NOT NULL DEFAULT 'both',
  is_admin    boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);
