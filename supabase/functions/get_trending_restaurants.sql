-- Returns top restaurants by likes in the last 30 days for a given state
CREATE OR REPLACE FUNCTION get_trending_restaurants(p_cuisine_state text, p_limit int DEFAULT 10)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  cuisine_state text,
  type text,
  image_url text,
  must_try_dishes text,
  recent_likes bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.name,
    r.description,
    r.cuisine_state,
    r.type,
    r.image_url,
    r.must_try_dishes,
    COUNT(l.id) AS recent_likes
  FROM public.restaurants r
  LEFT JOIN public.likes l ON l.target_id = r.id
    AND l.created_at > now() - interval '30 days'
  WHERE r.cuisine_state = p_cuisine_state
    AND r.status = 'approved'
  GROUP BY r.id
  ORDER BY recent_likes DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;
