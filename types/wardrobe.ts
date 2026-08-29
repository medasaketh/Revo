export type WardrobeCategory =
  | "all"
  | "tops"
  | "bottoms"
  | "dresses"
  | "shoes"
  | "jackets"
  | "accessories";

export type WardrobeSeason =
  | "summer"
  | "winter"
  | "spring"
  | "autumn"
  | "all-season";

export type WardrobeOccasion =
  | "casual"
  | "office"
  | "wedding"
  | "party"
  | "travel"
  | "gym";

export type WardrobeViewMode = "grid" | "list" | "large" | "compact";

export type WardrobeSort = "recent" | "most-worn" | "favorites" | "never-worn";

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
  isFavorite: boolean;
  price?: number;
  purchaseDate?: string;
  fabric?: string;
  season: WardrobeSeason[];
  occasions: WardrobeOccasion[];
  fitNotes?: string;
  aiCompatibilityScore?: number;
  addedAt: string;
}

export interface WardrobeStatCard {
  id: string;
  label: string;
  value: string;
  sublabel?: string;
  progress?: number;
}

export interface WardrobeFilterOption {
  id: string;
  label: string;
}

export interface WardrobeInsight {
  id: string;
  label: string;
  value: string;
}

export interface WardrobeAiFeature {
  id: string;
  label: string;
  description: string;
}

export interface WardrobePageData {
  header: {
    title: string;
    subtitle: string;
  };
  overviewStats: WardrobeStatCard[];
  categories: { id: WardrobeCategory; label: string; count: number }[];
  seasons: WardrobeFilterOption[];
  occasions: WardrobeFilterOption[];
  colors: { id: string; label: string; hex: string }[];
  sortOptions: WardrobeFilterOption[];
  items: WardrobeItem[];
  insights: WardrobeInsight[];
  aiFeatures: WardrobeAiFeature[];
  addItemSteps: string[];
}

export interface WardrobeFilters {
  category: WardrobeCategory;
  season: string | null;
  occasion: string | null;
  color: string | null;
  sort: WardrobeSort;
  search: string;
  favoritesOnly: boolean;
}
