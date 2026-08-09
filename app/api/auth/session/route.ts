import { createClient } from "@/lib/supabase/server";
import {
  successResponse,
  handleUnknownError,
} from "@/lib/auth/responses";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return successResponse("No active session.", { user: null, profile: null });
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    const profile = profileData as import("@/types/database").Profile | null;

    if (profileError) {
      return successResponse("Session active.", {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name ?? null,
        },
        profile: null,
      });
    }

    return successResponse("Session active.", {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name ?? null,
      },
      profile,
    });
  } catch {
    return handleUnknownError();
  }
}
