import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { logOutfit, getRecentOutfits } from "@/lib/outfit/service";
import { WardrobeServiceError } from "@/lib/wardrobe/service";
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

  const db = createAdminClient() ?? sessionClient;
  return { user, db };
}

export async function GET() {
  try {
    const { user, db } = await getAuthedDbClient();

    if (!user || !db) {
      return errorResponse("UNAUTHORIZED", "You must be signed in.", 401);
    }

    const outfits = await getRecentOutfits(db, user.id);
    return successResponse("Outfits loaded.", { outfits });
  } catch (err) {
    if (err instanceof WardrobeServiceError) {
      return errorResponse(err.code, err.message, err.status);
    }
    console.error("[outfits/GET] Unexpected error:", err);
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
    const result = await logOutfit(db, user.id, body);

    return successResponse("Outfit logged.", { ...result }, 201);
  } catch (err) {
    if (err instanceof WardrobeServiceError) {
      return errorResponse(err.code, err.message, err.status);
    }
    console.error("[outfits/POST] Unexpected error:", err);
    return handleUnknownError();
  }
}
