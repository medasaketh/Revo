import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/database";

export interface AuthUser extends User {
  profile?: Profile | null;
}

export interface SessionResponse {
  user: AuthUser | null;
  profile: Profile | null;
}

export interface ApiSuccessResponse<T = Record<string, unknown>> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse<T = Record<string, unknown>> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;
