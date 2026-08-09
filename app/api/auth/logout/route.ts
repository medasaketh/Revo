import { createClient } from "@/lib/supabase/server";
import {
  successResponse,
  errorResponse,
  mapAuthError,
  handleUnknownError,
} from "@/lib/auth/responses";

export async function POST() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      const mapped = mapAuthError(error);
      return errorResponse(mapped.code, mapped.message, mapped.status);
    }

    return successResponse("Signed out successfully.");
  } catch {
    return handleUnknownError();
  }
}
