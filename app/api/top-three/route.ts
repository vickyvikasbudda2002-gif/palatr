import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { topThreeSchema } from "@/lib/validations/top-three";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = topThreeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  // Upsert entries (replace existing top 3)
  const rows = parsed.data.entries.map((e) => ({
    user_id: user.id,
    rank: e.rank,
    restaurant_id: e.restaurant_id,
    custom_dish: e.custom_dish,
  }));

  const { error } = await supabase
    .from("user_top_three")
    .upsert(rows, { onConflict: "user_id,rank" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Top 3 saved." });
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("user_top_three")
    .select("*, restaurant:restaurants(name, cuisine_state, image_url)")
    .eq("user_id", user.id)
    .order("rank");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}
