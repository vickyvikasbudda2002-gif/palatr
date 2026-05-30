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

  const { gem_id, unlike } = await request.json();
  if (!gem_id) {
    return NextResponse.json({ error: "gem_id required" }, { status: 400 });
  }

  if (unlike) {
    await supabase
      .from("likes")
      .delete()
      .eq("user_id", user.id)
      .eq("target_id", gem_id);
    return NextResponse.json({ message: "Unliked." });
  }

  const { error } = await supabase.from("likes").insert({
    user_id: user.id,
    target_id: gem_id,
    target_type: "gem",
  });

  if (error?.code === "23505") {
    return NextResponse.json({ message: "Already liked." });
  }
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Liked." });
}
