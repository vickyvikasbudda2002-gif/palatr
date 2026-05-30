"use client";

import { useAuthStore } from "@/store/authStore";

export function useUser() {
  const { user, isLoading } = useAuthStore();
  return { user, isLoading, isAdmin: user?.is_admin ?? false };
}
