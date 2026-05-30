import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  // Verify the caller is an admin
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: callerProfile } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!callerProfile?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const { userId, requestId } = body as { userId?: string; requestId?: string };

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const admin = createAdminClient();

  // 1. Delete the user's likes
  const { error: likesError } = await admin
    .from("likes")
    .delete()
    .eq("user_id", userId);

  if (likesError) {
    console.error("[delete-user] Failed to delete likes:", likesError.message);
  }

  // 2. Delete the user's reviews
  const { error: reviewsError } = await admin
    .from("reviews")
    .delete()
    .eq("user_id", userId);

  if (reviewsError) {
    console.error("[delete-user] Failed to delete reviews:", reviewsError.message);
  }

  // 3. Delete the user's profile row from the users table
  const { error: profileError } = await admin
    .from("users")
    .delete()
    .eq("id", userId);

  if (profileError) {
    console.error("[delete-user] Failed to delete profile:", profileError.message);
    return NextResponse.json({ error: "Failed to delete user profile." }, { status: 500 });
  }

  // 4. Delete the auth user (removes login access permanently)
  const { error: authError } = await admin.auth.admin.deleteUser(userId);

  if (authError) {
    console.error("[delete-user] Failed to delete auth user:", authError.message);
    return NextResponse.json({ error: "Failed to delete auth account." }, { status: 500 });
  }

  // 5. Mark the deletion request as completed
  if (requestId) {
    await admin
      .from("deletion_requests")
      .update({ status: "completed" })
      .eq("id", requestId);
  }

  console.log("[delete-user] Successfully deleted user:", userId);
  return NextResponse.json({ message: "User deleted successfully." });
}
