import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  updateWardrobeItem,
  deleteWardrobeItem,
  WardrobeServiceError,
} from "@/lib/wardrobe/service";
import {
  successResponse,
  errorResponse,
  handleUnknownError,
} from "@/lib/auth/responses";

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function getAuthedDbClient() {
  const sessionClient = await createClient();
  const {
    data: { user },
  } = await sessionClient.auth.getUser();

  if (!user) {
    return { user: null, db: null };
  }

  const db = createAdminClient() ?? sessionClient;
  return { user, db };
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { user, db } = await getAuthedDbClient();

    if (!user || !db) {
      return errorResponse("UNAUTHORIZED", "You must be signed in.", 401);
    }

    const body = await request.json();
    const item = await updateWardrobeItem(db, user.id, id, body);

    return successResponse("Item updated.", { item });
  } catch (err) {
    if (err instanceof WardrobeServiceError) {
      return errorResponse(err.code, err.message, err.status);
    }
    console.error("[wardrobe/PATCH] Unexpected error:", err);
    return handleUnknownError();
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { user, db } = await getAuthedDbClient();

    if (!user || !db) {
      return errorResponse("UNAUTHORIZED", "You must be signed in.", 401);
    }

    await deleteWardrobeItem(db, user.id, id);

    return successResponse("Item deleted.", { id });
  } catch (err) {
    if (err instanceof WardrobeServiceError) {
      return errorResponse(err.code, err.message, err.status);
    }
    console.error("[wardrobe/DELETE] Unexpected error:", err);
    return handleUnknownError();
  }
}
