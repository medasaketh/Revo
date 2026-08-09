import { NextResponse } from "next/server";
import { ZodError } from "zod";

function normalizeStatus(status?: number, fallback = 400): number {
  if (typeof status !== "number" || status < 200 || status > 599) {
    return fallback;
  }
  return status;
}

export function successResponse<T extends Record<string, unknown>>(
  message: string,
  data: T = {} as T,
  status = 200
) {
  return NextResponse.json(
    { success: true, message, data },
    { status: normalizeStatus(status, 200) }
  );
}

export function errorResponse(
  code: string,
  message: string,
  status = 400
) {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status: normalizeStatus(status, 400) }
  );
}

/** Map Supabase auth errors to safe, user-facing messages. */
export function mapAuthError(error: {
  message: string;
  status?: number;
  code?: string;
}): {
  code: string;
  message: string;
  status: number;
} {
  const msg = error.message.toLowerCase();
  const code = error.code?.toLowerCase() ?? "";

  if (msg.includes("already registered") || msg.includes("already exists")) {
    return {
      code: "EMAIL_EXISTS",
      message: "An account with this email already exists.",
      status: 409,
    };
  }

  if (
    msg.includes("invalid login credentials") ||
    code === "invalid_credentials"
  ) {
    return {
      code: "INVALID_CREDENTIALS",
      message: "Invalid email or password.",
      status: 401,
    };
  }

  if (msg.includes("email not confirmed")) {
    return {
      code: "EMAIL_NOT_VERIFIED",
      message: "Please verify your email before signing in.",
      status: 403,
    };
  }

  if (msg.includes("weak password") || msg.includes("password")) {
    return {
      code: "WEAK_PASSWORD",
      message: "Password does not meet security requirements.",
      status: 400,
    };
  }

  if (msg.includes("rate limit") || msg.includes("over_email_send_rate_limit")) {
    return {
      code: "RATE_LIMIT",
      message:
        "Too many signup or reset attempts. Supabase allows ~2 emails per hour on the free built-in mailer. Wait about an hour, or in Supabase go to Authentication → Providers → Email and turn off Confirm email for development.",
      status: 429,
    };
  }

  return {
    code: "AUTH_ERROR",
    message: "Authentication failed. Please try again.",
    status: normalizeStatus(error.status, 400),
  };
}

export function handleZodError(error: ZodError) {
  const firstIssue = error.issues[0];
  return errorResponse(
    "VALIDATION_ERROR",
    firstIssue?.message ?? "Invalid input",
    422
  );
}

export function handleUnknownError() {
  return errorResponse(
    "INTERNAL_ERROR",
    "Something went wrong. Please try again.",
    500
  );
}
