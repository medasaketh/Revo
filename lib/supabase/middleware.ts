import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";
import { isOnboardingComplete } from "@/lib/onboarding/status";
import { getSupabaseEnv } from "@/lib/supabase/env";

const ONBOARDING_COOKIE = "revo_onboarding_complete";

export async function updateSession(request: NextRequest) {
  try {
    const { url, anonKey } = getSupabaseEnv();
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient<Database>(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    const protectedRoutes = ["/dashboard", "/profile", "/settings", "/onboarding"];
    const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];
    const appRoutesRequiringOnboarding = ["/dashboard", "/profile", "/settings"];

    const isProtected = protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
    const isAuthRoute = authRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
    const requiresOnboarding = appRoutesRequiringOnboarding.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    if (!user && isProtected) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (user) {
      const cookieComplete =
        request.cookies.get(ONBOARDING_COOKIE)?.value === "1";
      const onboardingComplete =
        cookieComplete || (await isOnboardingComplete(supabase, user.id));

      if (!onboardingComplete && requiresOnboarding) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/onboarding";
        return NextResponse.redirect(redirectUrl);
      }

      if (isAuthRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = onboardingComplete ? "/dashboard" : "/onboarding";
        return NextResponse.redirect(redirectUrl);
      }

      if (onboardingComplete && pathname === "/onboarding") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/dashboard";
        return NextResponse.redirect(redirectUrl);
      }
    }

    return supabaseResponse;
  } catch (error) {
    console.error("[proxy] Session update failed:", error);
    return NextResponse.next({ request });
  }
}
