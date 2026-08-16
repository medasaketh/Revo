/** Allowed post-auth redirect paths (open redirect protection). */
const ALLOWED_PATHS = [
  "/reset-password",
  "/dashboard",
  "/onboarding",
  "/login",
] as const;

export function sanitizeRedirectPath(path: string | null, fallback: string): string {
  if (!path) return fallback;
  if (!path.startsWith("/") || path.startsWith("//")) return fallback;
  const base = path.split("?")[0];
  if (ALLOWED_PATHS.some((allowed) => base === allowed || base.startsWith(`${allowed}/`))) {
    return path;
  }
  return fallback;
}

export function getSiteOrigin(requestOrigin: string): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || requestOrigin;
}
