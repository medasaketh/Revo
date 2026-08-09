import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/schemas/auth";
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
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return handleZodError(parsed.error);
    }

    const { email, password } = parsed.data;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const mapped = mapAuthError(error);
      return errorResponse(mapped.code, mapped.message, mapped.status);
    }

    if (!data.user || !data.session) {
      return errorResponse("LOGIN_FAILED", "Unable to sign in.", 401);
    }

    return successResponse("Signed in successfully.", {
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      session: {
        expires_at: data.session.expires_at,
      },
    });
  } catch (err) {
    console.error("[login] Unexpected error:", err);
    return handleUnknownError();
  }
}
