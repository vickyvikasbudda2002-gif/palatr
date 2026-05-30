import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { haversineDistance } from "@/utils/haversine";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") ?? "");
  const lon = parseFloat(searchParams.get("lon") ?? "");

  if (isNaN(lat) || isNaN(lon)) {
    return NextResponse.json(
      { error: "lat and lon query params required" },
      { status: 400 }
    );
  }

  const { data: profile } = await supabase
    .from("users")
    .select("home_state")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("cuisine_state", profile.home_state)
    .eq("status", "approved")
    .not("latitude", "is", null)
    .not("longitude", "is", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Calculate and sort by distance using Haversine
  const withDistance = (data ?? [])
    .map((r) => ({
      ...r,
      distance_km: haversineDistance(lat, lon, r.latitude!, r.longitude!),
    }))
    .sort((a, b) => a.distance_km - b.distance_km);

  return NextResponse.json({ data: withDistance });
}
