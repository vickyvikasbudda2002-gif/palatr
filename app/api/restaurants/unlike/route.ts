import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { restaurant_id } = await request.json();
  if (!restaurant_id) {
    return NextResponse.json({ error: "restaurant_id required" }, { status: 400 });
  }

  await supabase
    .from("likes")
    .delete()
    .eq("user_id", user.id)
    .eq("target_id", restaurant_id);

  return NextResponse.json({ message: "Unliked." });
}
