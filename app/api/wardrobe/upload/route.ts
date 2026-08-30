import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  buildWardrobeImagePath,
  getWardrobeImagePublicUrl,
  validateWardrobeImageFile,
  WardrobeUploadError,
} from "@/lib/wardrobe/upload";
import {
  successResponse,
  errorResponse,
  handleUnknownError,
} from "@/lib/auth/responses";

export async function POST(request: NextRequest) {
  try {
    const sessionClient = await createClient();
    const {
      data: { user },
    } = await sessionClient.auth.getUser();

    if (!user) {
      return errorResponse("UNAUTHORIZED", "You must be signed in.", 401);
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return errorResponse("VALIDATION_ERROR", "No image file provided.", 400);
    }

    validateWardrobeImageFile(file);

    const path = buildWardrobeImagePath(user.id, file);
    const buffer = Buffer.from(await file.arrayBuffer());
    const db = createAdminClient() ?? sessionClient;

    const { error } = await db.storage.from("wardrobe-images").upload(path, buffer, {
      contentType: file.type,
      upsert: false,
      cacheControl: "3600",
    });

    if (error) {
      if (error.message.includes("Bucket not found")) {
        return errorResponse(
          "MIGRATION_REQUIRED",
          "Storage bucket not found. Run supabase/migrations/007_wardrobe_storage.sql in Supabase SQL Editor.",
          503
        );
      }
      return errorResponse("UPLOAD_FAILED", error.message, 500);
    }

    const url = getWardrobeImagePublicUrl(path);

    return successResponse("Image uploaded.", { url, path }, 201);
  } catch (err) {
    if (err instanceof WardrobeUploadError) {
      return errorResponse(err.code, err.message, 400);
    }
    console.error("[wardrobe/upload] Unexpected error:", err);
    return handleUnknownError();
  }
}
