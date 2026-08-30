import type { WardrobeItem, WardrobeOccasion } from "@/types/wardrobe";

export interface Outfit {
  id: string;
  name: string | null;
  occasion: WardrobeOccasion | null;
  wornAt: string;
  itemIds: string[];
  items: WardrobeItem[];
}

export interface LogOutfitResult {
  outfit: Outfit;
  updatedItems: WardrobeItem[];
}
