-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hidden_gems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_top_three ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deletion_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Users: read own profile, admins read all
CREATE POLICY "Users can read own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all users" ON public.users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Restaurants: authenticated users see approved ones matching their state
CREATE POLICY "Users see approved restaurants for their state" ON public.restaurants
  FOR SELECT USING (
    status = 'approved'
    AND cuisine_state = (SELECT home_state FROM public.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins see all restaurants" ON public.restaurants
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Authenticated users can submit restaurants" ON public.restaurants
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND submitted_by = auth.uid());

CREATE POLICY "Admins can update restaurants" ON public.restaurants
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );

-- Hidden Gems: all authenticated users see approved gems
CREATE POLICY "Authenticated users see approved gems" ON public.hidden_gems
  FOR SELECT USING (status = 'approved' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins see all gems" ON public.hidden_gems
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Authenticated users can submit gems" ON public.hidden_gems
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND submitted_by = auth.uid());

CREATE POLICY "Admins can update gems" ON public.hidden_gems
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );

-- Reviews: authenticated users can read and write
CREATE POLICY "Authenticated users can read reviews" ON public.reviews
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can write own reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Likes: authenticated users can read and write
CREATE POLICY "Authenticated users can read likes" ON public.likes
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can manage own likes" ON public.likes
  FOR ALL USING (auth.uid() = user_id);

-- Top Three: users manage own entries
CREATE POLICY "Users can manage own top three" ON public.user_top_three
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can read top three" ON public.user_top_three
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Reports: users can submit
CREATE POLICY "Users can submit reports" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read reports" ON public.reports
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );

-- Deletion requests: users manage own
CREATE POLICY "Users can manage own deletion request" ON public.deletion_requests
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can read deletion requests" ON public.deletion_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );

-- Waitlist: anyone can insert
CREATE POLICY "Anyone can join waitlist" ON public.waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can read waitlist" ON public.waitlist
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );
