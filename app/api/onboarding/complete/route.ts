import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  successResponse,
  errorResponse,
  handleUnknownError,
} from "@/lib/auth/responses";

const ONBOARDING_COOKIE = "revo_onboarding_complete";

function withOnboardingCookie(response: NextResponse) {
  response.cookies.set(ONBOARDING_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return errorResponse("UNAUTHORIZED", "You must be signed in.", 401);
    }

    const completedAt = new Date().toISOString();
    const fullName =
      (user.user_metadata?.full_name as string | undefined) ?? "";

    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email ?? null,
        full_name: fullName,
        onboarding_completed_at: completedAt,
      } as never,
      { onConflict: "id" }
    );

    if (error) {
      console.error("[onboarding/complete] Profile upsert failed:", error.message);

      // Don't block the user — cookie fallback until migrations are applied
      const response = successResponse("Onboarding completed.", {
        onboarding_completed_at: completedAt,
        savedToDatabase: false,
      });
      return withOnboardingCookie(response);
    }

    const response = successResponse("Onboarding completed.", {
      onboarding_completed_at: completedAt,
      savedToDatabase: true,
    });
    return withOnboardingCookie(response);
  } catch (err) {
    console.error("[onboarding/complete] Unexpected error:", err);
    return handleUnknownError();
  }
}

export { ONBOARDING_COOKIE };
