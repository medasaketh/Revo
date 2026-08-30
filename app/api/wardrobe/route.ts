import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getWardrobeItems,
  saveWardrobeItem,
  WardrobeServiceError,
} from "@/lib/wardrobe/service";
import {
  successResponse,
  errorResponse,
  handleUnknownError,
} from "@/lib/auth/responses";

async function getAuthedDbClient() {
  const sessionClient = await createClient();
  const {
    data: { user },
  } = await sessionClient.auth.getUser();

  if (!user) {
    return { user: null, db: null };
  }

  // Prefer service role for DB ops (avoids RLS/session edge cases).
  // Auth is enforced here — all queries still scoped to user.id.
  const db = createAdminClient() ?? sessionClient;

  return { user, db };
}

export async function GET() {
  try {
    const { user, db } = await getAuthedDbClient();

    if (!user || !db) {
      return errorResponse("UNAUTHORIZED", "You must be signed in.", 401);
    }

    const items = await getWardrobeItems(db, user.id);
    return successResponse("Wardrobe loaded.", { items });
  } catch (err) {
    if (err instanceof WardrobeServiceError) {
      return errorResponse(err.code, err.message, err.status);
    }
    console.error("[wardrobe/GET] Unexpected error:", err);
    return handleUnknownError();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user, db } = await getAuthedDbClient();

    if (!user || !db) {
      return errorResponse("UNAUTHORIZED", "You must be signed in.", 401);
    }

    const body = await request.json();
    const item = await saveWardrobeItem(db, user.id, body);

    return successResponse("Item saved.", { item }, 201);
  } catch (err) {
    if (err instanceof WardrobeServiceError) {
      return errorResponse(err.code, err.message, err.status);
    }
    console.error("[wardrobe/POST] Unexpected error:", err);
    return handleUnknownError();
  }
}
