import { createAdminClient } from "@/lib/supabase/admin";

export async function isUserAdmin(userId: string): Promise<boolean> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", userId)
    .single();
  return data?.is_admin === true;
}
