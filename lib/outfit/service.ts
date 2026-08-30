import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { logOutfitSchema, type LogOutfitInput } from "@/schemas/outfit";
import type { LogOutfitResult, Outfit } from "@/types/outfit";
import {
  mapWardrobeRow,
  type WardrobeItemRow,
} from "@/lib/wardrobe/mappers";
import { WardrobeServiceError } from "@/lib/wardrobe/service";

interface OutfitRow {
  id: string;
  user_id: string;
  name: string | null;
  occasion: string | null;
  worn_at: string;
  created_at: string;
}

function mapOutfitRow(
  row: OutfitRow,
  items: ReturnType<typeof mapWardrobeRow>[]
): Outfit {
  return {
    id: row.id,
    name: row.name,
    occasion: row.occasion as Outfit["occasion"],
    wornAt: row.worn_at,
    itemIds: items.map((i) => i.id),
    items,
  };
}

/** Log an outfit and increment times_worn for all included items. */
export async function logOutfit(
  db: SupabaseClient<Database>,
  userId: string,
  input: LogOutfitInput
): Promise<LogOutfitResult> {
  const parsed = logOutfitSchema.safeParse(input);

  if (!parsed.success) {
    throw new WardrobeServiceError(
      "VALIDATION_ERROR",
      parsed.error.issues[0]?.message ?? "Invalid outfit data.",
      400
    );
  }

  const uniqueIds = [...new Set(parsed.data.itemIds)];

  const { data: ownedItems, error: fetchError } = await db
    .from("wardrobe_items")
    .select("*")
    .eq("user_id", userId)
    .in("id", uniqueIds);

  if (fetchError) {
    throw new WardrobeServiceError(
      "FETCH_FAILED",
      fetchError.message,
      500
    );
  }

  if (!ownedItems || ownedItems.length !== uniqueIds.length) {
    throw new WardrobeServiceError(
      "INVALID_ITEMS",
      "One or more selected items were not found in your wardrobe.",
      400
    );
  }

  const wornAt = new Date().toISOString();

  const { data: outfitRow, error: outfitError } = await db
    .from("outfits")
    .insert({
      user_id: userId,
      name: parsed.data.name?.trim() || null,
      occasion: parsed.data.occasion || null,
      worn_at: wornAt,
    } as never)
    .select("*")
    .single();

  if (outfitError || !outfitRow) {
    if (outfitError?.message.includes("does not exist")) {
      throw new WardrobeServiceError(
        "MIGRATION_REQUIRED",
        "Outfits table not found. Run supabase/migrations/006_outfits.sql in Supabase SQL Editor.",
        503
      );
    }
    throw new WardrobeServiceError(
      "CREATE_FAILED",
      outfitError?.message ?? "Could not save outfit.",
      500
    );
  }

  const outfitLinks = uniqueIds.map((wardrobeItemId) => ({
    outfit_id: (outfitRow as OutfitRow).id,
    wardrobe_item_id: wardrobeItemId,
  }));

  const { error: linkError } = await db
    .from("outfit_items")
    .insert(outfitLinks as never);

  if (linkError) {
    throw new WardrobeServiceError(
      "CREATE_FAILED",
      linkError.message,
      500
    );
  }

  const updatedItems = [];

  for (const row of ownedItems as WardrobeItemRow[]) {
    const nextTimesWorn = (row.times_worn ?? 0) + 1;

    const { data: updated, error: updateError } = await db
      .from("wardrobe_items")
      .update({
        times_worn: nextTimesWorn,
        last_worn_at: wornAt,
      } as never)
      .eq("id", row.id)
      .eq("user_id", userId)
      .select("*")
      .single();

    if (updateError || !updated) {
      throw new WardrobeServiceError(
        "UPDATE_FAILED",
        updateError?.message ?? "Could not update wear count.",
        500
      );
    }

    updatedItems.push(mapWardrobeRow(updated as WardrobeItemRow));
  }

  const outfit = mapOutfitRow(outfitRow as OutfitRow, updatedItems);

  return { outfit, updatedItems };
}

/** Recent logged outfits for the user. */
export async function getRecentOutfits(
  db: SupabaseClient<Database>,
  userId: string,
  limit = 5
): Promise<Outfit[]> {
  const { data: outfits, error } = await db
    .from("outfits")
    .select("*")
    .eq("user_id", userId)
    .order("worn_at", { ascending: false })
    .limit(limit);

  if (error) {
    if (error.message.includes("does not exist")) {
      return [];
    }
    throw new WardrobeServiceError("FETCH_FAILED", error.message, 500);
  }

  if (!outfits?.length) return [];

  const outfitIds = (outfits as OutfitRow[]).map((o) => o.id);

  const { data: links, error: linksError } = await db
    .from("outfit_items")
    .select("outfit_id, wardrobe_item_id")
    .in("outfit_id", outfitIds);

  type OutfitLinkRow = { outfit_id: string; wardrobe_item_id: string };
  const linkRows = (links ?? []) as OutfitLinkRow[];

  if (linksError || linkRows.length === 0) {
    return (outfits as OutfitRow[]).map((o) => mapOutfitRow(o, []));
  }

  const itemIds = [...new Set(linkRows.map((l) => l.wardrobe_item_id))];

  const { data: items } = await db
    .from("wardrobe_items")
    .select("*")
    .eq("user_id", userId)
    .in("id", itemIds);

  const itemMap = new Map(
    ((items ?? []) as WardrobeItemRow[]).map((row) => [
      row.id,
      mapWardrobeRow(row),
    ])
  );

  const linksByOutfit = new Map<string, string[]>();
  for (const link of linkRows) {
    const list = linksByOutfit.get(link.outfit_id) ?? [];
    list.push(link.wardrobe_item_id);
    linksByOutfit.set(link.outfit_id, list);
  }

  return (outfits as OutfitRow[]).map((row) => {
    const ids = linksByOutfit.get(row.id) ?? [];
    const outfitItems = ids
      .map((id) => itemMap.get(id))
      .filter(Boolean) as ReturnType<typeof mapWardrobeRow>[];
    return mapOutfitRow(row, outfitItems);
  });
}
