"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { user, isLoading, setUser, signOut: clearUser } = useAuthStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const supabase = createClient();

    async function loadUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          setUser(null);
          return;
        }

        const { data } = await supabase
          .from("users")
          .select("id, email, first_name, home_state, current_city, is_admin")
          .eq("id", session.user.id)
          .single();

        setUser(data ?? null);
      } catch {
        setUser(null);
      }
    }

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    clearUser();
    window.location.href = "/";
  };

  return { user, isLoading, signOut };
}
