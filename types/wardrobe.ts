export type WardrobeCategory =
  | "all"
  | "tops"
  | "bottoms"
  | "shoes"
  | "accessories";

export interface WardrobeItem {
  id: string;
  name: string;
  brand: string;
  category: Exclude<WardrobeCategory, "all">;
  color: string;
  colorHex: string;
  imageUrl: string;
  timesWorn: number;
  lastWorn: string;
}

export interface WardrobePageData {
  stats: {
    totalItems: number;
    tops: number;
    bottoms: number;
    shoes: number;
    accessories: number;
  };
  items: WardrobeItem[];
  categories: { id: WardrobeCategory; label: string; count: number }[];
}
