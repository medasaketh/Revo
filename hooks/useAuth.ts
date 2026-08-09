"use client";

import { useAuth } from "@/components/providers/AuthProvider";

export function useAuthSession() {
  return useAuth();
}
