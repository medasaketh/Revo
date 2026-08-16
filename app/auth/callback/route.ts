import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sanitizeRedirectPath } from "@/lib/auth/redirect";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeRedirectPath(
    searchParams.get("next"),
    "/dashboard"
  );
  const authError = searchParams.get("error_description");

  if (authError) {
    console.error("[auth/callback] Provider error:", authError);
    return NextResponse.redirect(
      `${origin}/login?error=auth_callback_failed`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?error=auth_callback_failed`
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] Code exchange failed:", error.message);
    const dest =
      next === "/reset-password"
        ? `${origin}/reset-password?error=link_expired`
        : `${origin}/login?error=auth_callback_failed`;
    return NextResponse.redirect(dest);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
