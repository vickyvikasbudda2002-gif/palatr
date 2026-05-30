-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine_state ON public.restaurants(cuisine_state);
CREATE INDEX IF NOT EXISTS idx_restaurants_status ON public.restaurants(status);
CREATE INDEX IF NOT EXISTS idx_hidden_gems_status ON public.hidden_gems(status);
CREATE INDEX IF NOT EXISTS idx_likes_target ON public.likes(target_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON public.likes(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_target ON public.reviews(target_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_target ON public.reports(target_id);
CREATE INDEX IF NOT EXISTS idx_top_three_user ON public.user_top_three(user_id);
