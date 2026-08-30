import type { WardrobePageData } from "@/types/wardrobe";

/** Static wardrobe page config — items are loaded from the database. */
export const wardrobePageConfig: Omit<WardrobePageData, "items" | "overviewStats" | "insights"> & {
  overviewStats: WardrobePageData["overviewStats"];
  insights: WardrobePageData["insights"];
} = {
  header: {
    title: "My Wardrobe",
    subtitle: "Everything you own, intelligently organized.",
  },
  overviewStats: [],
  categories: [
    { id: "all", label: "All Items", count: 0 },
    { id: "tops", label: "Tops", count: 0 },
    { id: "bottoms", label: "Bottoms", count: 0 },
    { id: "dresses", label: "Dresses", count: 0 },
    { id: "shoes", label: "Shoes", count: 0 },
    { id: "jackets", label: "Jackets", count: 0 },
    { id: "accessories", label: "Accessories", count: 0 },
  ],
  seasons: [
    { id: "summer", label: "Summer" },
    { id: "winter", label: "Winter" },
    { id: "spring", label: "Spring" },
    { id: "autumn", label: "Autumn" },
    { id: "all-season", label: "All Season" },
  ],
  occasions: [
    { id: "casual", label: "Casual" },
    { id: "office", label: "Office" },
    { id: "wedding", label: "Wedding" },
    { id: "party", label: "Party" },
    { id: "travel", label: "Travel" },
    { id: "gym", label: "Gym" },
  ],
  colors: [
    { id: "black", label: "Black", hex: "#1a1a1a" },
    { id: "white", label: "White", hex: "#f5f5f5" },
    { id: "navy", label: "Navy", hex: "#1e3a5f" },
    { id: "beige", label: "Beige", hex: "#d4c4a8" },
    { id: "olive", label: "Olive", hex: "#556b2f" },
  ],
  sortOptions: [
    { id: "recent", label: "Recently Added" },
    { id: "most-worn", label: "Most Used" },
    { id: "favorites", label: "Favorites" },
    { id: "never-worn", label: "Never Worn" },
  ],
  insights: [],
  aiFeatures: [
    {
      id: "outfit",
      label: "Build Outfit",
      description: "Combine items into complete looks",
    },
    {
      id: "gaps",
      label: "Find Missing Pieces",
      description: "Discover wardrobe gaps",
    },
    {
      id: "rate",
      label: "Rate Wardrobe",
      description: "Get an AI style score",
    },
    {
      id: "pack",
      label: "Packing Assistant",
      description: "Smart travel packing lists",
    },
  ],
  addItemSteps: ["Upload", "Details", "Attributes", "Occasion", "Review"],
};
