import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/** Ensures a profile row exists after signup (fallback if DB trigger wasn't applied). */
export async function ensureUserProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
  fullName: string,
  email: string
) {
  const { error } = await supabase.from("profiles").upsert(
    {
      id: userId,
      full_name: fullName,
      email,
    } as never,
    { onConflict: "id" }
  );

  if (error) {
    console.error("[auth] Profile upsert failed:", error.message);
    return false;
  }

  return true;
}

/** Supabase may return a user with no identities when the email already exists. */
export function isNewAuthUser(user: {
  identities?: { id: string }[] | null;
} | null): boolean {
  return Boolean(user?.identities && user.identities.length > 0);
}
