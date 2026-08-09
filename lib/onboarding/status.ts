import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type ProfileCompletion = {
  onboarding_completed_at: string | null;
};

export async function isOnboardingComplete(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("profiles")
    .select("onboarding_completed_at")
    .eq("id", userId)
    .maybeSingle();

  const profile = data as ProfileCompletion | null;
  return Boolean(profile?.onboarding_completed_at);
}
