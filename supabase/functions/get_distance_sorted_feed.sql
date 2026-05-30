-- PostGIS-powered distance sort (enable PostGIS extension first)
-- Usage: SELECT * FROM get_distance_sorted_feed('Andhra Pradesh', 12.9716, 77.5946);
CREATE OR REPLACE FUNCTION get_distance_sorted_feed(
  p_cuisine_state text,
  p_user_lat float8,
  p_user_lon float8
)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  cuisine_state text,
  type text,
  image_url text,
  must_try_dishes text,
  maps_link text,
  likes_count bigint,
  distance_km float8
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
    r.maps_link,
    COUNT(l.id) AS likes_count,
    (
      6371 * acos(
        cos(radians(p_user_lat)) * cos(radians(r.latitude)) *
        cos(radians(r.longitude) - radians(p_user_lon)) +
        sin(radians(p_user_lat)) * sin(radians(r.latitude))
      )
    ) AS distance_km
  FROM public.restaurants r
  LEFT JOIN public.likes l ON l.target_id = r.id
  WHERE r.cuisine_state = p_cuisine_state
    AND r.status = 'approved'
    AND r.latitude IS NOT NULL
    AND r.longitude IS NOT NULL
  GROUP BY r.id
  ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql;
