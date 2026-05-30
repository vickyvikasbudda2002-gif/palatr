import { createClient } from "@/lib/supabase/server";
import type { UserSession } from "@/types/user";

export async function getSession(): Promise<UserSession | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("id, email, first_name, home_state, current_city, is_admin")
    .eq("id", user.id)
    .single();

  return profile ?? null;
}

export async function requireSession(): Promise<UserSession> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function requireAdmin(): Promise<UserSession> {
  const session = await requireSession();
  if (!session.is_admin) throw new Error("Forbidden");
  return session;
}
