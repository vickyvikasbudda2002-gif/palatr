import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { gem_id } = await request.json();
  if (!gem_id) {
    return NextResponse.json({ error: "gem_id required" }, { status: 400 });
  }

  // Only admin or submitter can delete
  const { data: profile } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  const admin = createAdminClient();
  const { data: gem } = await admin
    .from("hidden_gems")
    .select("submitted_by")
    .eq("id", gem_id)
    .single();

  if (!profile?.is_admin && gem?.submitted_by !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await admin.from("hidden_gems").delete().eq("id", gem_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted." });
}
