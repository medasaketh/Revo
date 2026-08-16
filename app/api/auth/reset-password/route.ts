import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { resetPasswordRequestSchema } from "@/schemas/auth";
import { getSiteOrigin } from "@/lib/auth/redirect";
import {
  successResponse,
  errorResponse,
  mapAuthError,
  handleZodError,
  handleUnknownError,
} from "@/lib/auth/responses";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = resetPasswordRequestSchema.safeParse(body);

    if (!parsed.success) {
      return handleZodError(parsed.error);
    }

    const supabase = await createClient();

    if (parsed.data.action === "request") {
      const origin = getSiteOrigin(request.nextUrl.origin);
      const redirectTo = `${origin}/auth/callback?next=/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(
        parsed.data.email,
        { redirectTo }
      );

      if (error) {
        console.error("[reset-password] Email request failed:", error.message);
        const mapped = mapAuthError(error);
        return errorResponse(mapped.code, mapped.message, mapped.status);
      }

      return successResponse(
        "If an account exists for this email, a reset link has been sent."
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return errorResponse(
        "UNAUTHORIZED",
        "Your reset link has expired. Please request a new one.",
        401
      );
    }

    const { error } = await supabase.auth.updateUser({
      password: parsed.data.password,
    });

    if (error) {
      console.error("[reset-password] Update failed:", error.message);
      const mapped = mapAuthError(error);
      return errorResponse(mapped.code, mapped.message, mapped.status);
    }

    // Sign out so user signs in fresh with the new password
    await supabase.auth.signOut();

    return successResponse("Password updated successfully. You can sign in now.");
  } catch (err) {
    console.error("[reset-password] Unexpected error:", err);
    return handleUnknownError();
  }
}
