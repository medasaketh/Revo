import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { registerSchema } from "@/schemas/auth";
import {
  successResponse,
  errorResponse,
  mapAuthError,
  handleZodError,
  handleUnknownError,
} from "@/lib/auth/responses";
import { ensureUserProfile, isNewAuthUser } from "@/lib/auth/profile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return handleZodError(parsed.error);
    }

    const { fullName, email, password } = parsed.data;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      console.error("[register] Supabase signUp error:", error.message);
      const mapped = mapAuthError(error);
      return errorResponse(mapped.code, mapped.message, mapped.status);
    }

    if (!data.user) {
      return errorResponse("REGISTRATION_FAILED", "Unable to create account.", 500);
    }

    // Supabase returns a user object with empty identities when the email already exists
    // (to prevent email enumeration) — this is NOT a new account.
    if (!isNewAuthUser(data.user)) {
      return errorResponse(
        "EMAIL_EXISTS",
        "An account with this email already exists. Try signing in instead.",
        409
      );
    }

    const requiresEmailConfirmation = !data.session;
    let profileSetupPending = false;

    // Best-effort profile row — DB trigger may also create it. Don't block onboarding if this fails.
    if (data.session) {
      const profileCreated = await ensureUserProfile(
        supabase,
        data.user.id,
        fullName,
        email
      );

      if (!profileCreated) {
        profileSetupPending = true;
        console.warn(
          "[register] Profile row not created. Run supabase/migrations in SQL Editor."
        );
      }
    }

    return successResponse(
      requiresEmailConfirmation
        ? "Account created. Check your email to verify before signing in."
        : profileSetupPending
          ? "Account created. Continue to set up your style profile."
          : "Account created successfully.",
      {
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        session: data.session ? { expires_at: data.session.expires_at } : null,
        requiresEmailConfirmation,
        profileSetupPending,
      },
      201
    );
  } catch (err) {
    console.error("[register] Unexpected error:", err);
    return handleUnknownError();
  }
}
