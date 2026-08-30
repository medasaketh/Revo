import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import {
  wardrobeItemInputSchema,
  wardrobeItemUpdateSchema,
  type WardrobeItemInput,
  type WardrobeItemUpdateInput,
} from "@/schemas/wardrobe";
import type { WardrobeItem } from "@/types/wardrobe";
import {
  mapWardrobeInputToRow,
  mapWardrobeRow,
  type WardrobeItemRow,
} from "@/lib/wardrobe/mappers";

export class WardrobeServiceError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

function mapDbError(
  error: { message: string; code?: string; details?: string; hint?: string },
  action: "fetch" | "save" | "update" | "delete" = "fetch"
): never {
  console.error(`[wardrobe/${action}] Supabase error:`, {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });

  if (error.message.includes("does not exist")) {
    throw new WardrobeServiceError(
      "MIGRATION_REQUIRED",
      "Wardrobe table not found. Run supabase/migrations/004_wardrobe_items.sql in Supabase SQL Editor.",
      503
    );
  }

  if (
    error.message.includes("row-level security") ||
    error.code === "42501"
  ) {
    throw new WardrobeServiceError(
      "FORBIDDEN",
      "Permission denied. Run supabase/migrations/005_wardrobe_grants.sql in Supabase SQL Editor, and add SUPABASE_SERVICE_ROLE_KEY to .env.local.",
      403
    );
  }

  if (error.code === "PGRST116") {
    throw new WardrobeServiceError(
      "CREATE_FAILED",
      "Item may have saved but could not be read back. Check RLS select policy on wardrobe_items.",
      500
    );
  }

  const fallback: Record<typeof action, string> = {
    fetch: "Could not load wardrobe items.",
    save: "Could not save wardrobe item.",
    update: "Could not update wardrobe item.",
    delete: "Could not delete wardrobe item.",
  };

  throw new WardrobeServiceError(
    action === "save" ? "CREATE_FAILED" : action === "update" ? "UPDATE_FAILED" : action === "delete" ? "DELETE_FAILED" : "FETCH_FAILED",
    error.message || fallback[action],
    500
  );
}

/** Load all wardrobe items for a user (server-side). */
export async function getWardrobeItems(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<WardrobeItem[]> {
  const { data, error } = await supabase
    .from("wardrobe_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    mapDbError(error, "fetch");
  }

  return (data as WardrobeItemRow[]).map(mapWardrobeRow);
}

/** Save a new wardrobe item for a user (server-side). */
export async function saveWardrobeItem(
  supabase: SupabaseClient<Database>,
  userId: string,
  input: WardrobeItemInput
): Promise<WardrobeItem> {
  const parsed = wardrobeItemInputSchema.safeParse(input);

  if (!parsed.success) {
    throw new WardrobeServiceError(
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Invalid wardrobe item data.",
      400
    );
  }

  const row = mapWardrobeInputToRow(parsed.data, userId);

  const { data, error } = await supabase
    .from("wardrobe_items")
    .insert(row as never)
    .select("*")
    .single();

  if (error) {
    mapDbError(error, "save");
  }

  if (!data) {
    throw new WardrobeServiceError(
      "CREATE_FAILED",
      "Item was not returned after save.",
      500
    );
  }

  return mapWardrobeRow(data as WardrobeItemRow);
}

/** Update an existing wardrobe item (server-side). */
export async function updateWardrobeItem(
  supabase: SupabaseClient<Database>,
  userId: string,
  itemId: string,
  input: WardrobeItemUpdateInput
): Promise<WardrobeItem> {
  const parsed = wardrobeItemUpdateSchema.safeParse(input);

  if (!parsed.success) {
    throw new WardrobeServiceError(
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Invalid wardrobe item data.",
      400
    );
  }

  const patch: Record<string, unknown> = {};

  if (parsed.data.name !== undefined) patch.name = parsed.data.name;
  if (parsed.data.brand !== undefined) patch.brand = parsed.data.brand || null;
  if (parsed.data.category !== undefined) patch.category = parsed.data.category;
  if (parsed.data.color !== undefined) patch.color = parsed.data.color || null;
  if (parsed.data.colorHex !== undefined)
    patch.color_hex = parsed.data.colorHex || "#888888";
  if (parsed.data.imageUrl !== undefined)
    patch.image_url = parsed.data.imageUrl || null;
  if (parsed.data.fabric !== undefined) patch.fabric = parsed.data.fabric || null;
  if (parsed.data.season !== undefined) patch.season = parsed.data.season;
  if (parsed.data.occasions !== undefined) patch.occasions = parsed.data.occasions;
  if (parsed.data.price !== undefined) patch.price = parsed.data.price ?? null;
  if (parsed.data.purchaseDate !== undefined)
    patch.purchase_date = parsed.data.purchaseDate || null;
  if (parsed.data.fitNotes !== undefined)
    patch.fit_notes = parsed.data.fitNotes || null;
  if (parsed.data.isFavorite !== undefined)
    patch.is_favorite = parsed.data.isFavorite;

  const { data, error } = await supabase
    .from("wardrobe_items")
    .update(patch as never)
    .eq("id", itemId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    mapDbError(error, "update");
  }

  if (!data) {
    throw new WardrobeServiceError("NOT_FOUND", "Item not found.", 404);
  }

  return mapWardrobeRow(data as WardrobeItemRow);
}

/** Delete a wardrobe item (server-side). */
export async function deleteWardrobeItem(
  supabase: SupabaseClient<Database>,
  userId: string,
  itemId: string
): Promise<void> {
  const { error } = await supabase
    .from("wardrobe_items")
    .delete()
    .eq("id", itemId)
    .eq("user_id", userId);

  if (error) {
    mapDbError(error, "delete");
  }
}
