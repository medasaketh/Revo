"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/AuthProvider";

export function LogoutButton() {
  const { signOut } = useAuth();

  return (
    <Button variant="outline" onClick={signOut}>
      Sign out
    </Button>
  );
}
