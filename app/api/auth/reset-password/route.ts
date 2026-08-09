import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { resetPasswordRequestSchema } from "@/schemas/auth";
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
      const origin = request.nextUrl.origin;

      const { error } = await supabase.auth.resetPasswordForEmail(
        parsed.data.email,
        { redirectTo: `${origin}/auth/callback?next=/reset-password` }
      );

      if (error) {
        const mapped = mapAuthError(error);
        return errorResponse(mapped.code, mapped.message, mapped.status);
      }

      return successResponse(
        "If an account exists for this email, a reset link has been sent."
      );
    }

    // action === "update"
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return errorResponse(
        "UNAUTHORIZED",
        "Your reset session has expired. Please request a new link.",
        401
      );
    }

    const { error } = await supabase.auth.updateUser({
      password: parsed.data.password,
    });

    if (error) {
      const mapped = mapAuthError(error);
      return errorResponse(mapped.code, mapped.message, mapped.status);
    }

    return successResponse("Password updated successfully.");
  } catch {
    return handleUnknownError();
  }
}
