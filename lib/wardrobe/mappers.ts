import type { WardrobeItem, WardrobePageData, WardrobeStatCard } from "@/types/wardrobe";

export const DEFAULT_WARDROBE_IMAGE =
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop";

export interface WardrobeItemRow {
  id: string;
  user_id: string;
  name: string;
  brand: string | null;
  category: string;
  color: string | null;
  color_hex: string | null;
  image_url: string | null;
  fabric: string | null;
  season: string[] | null;
  occasions: string[] | null;
  price: number | null;
  purchase_date: string | null;
  fit_notes: string | null;
  times_worn: number;
  last_worn_at: string | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

function formatLastWorn(lastWornAt: string | null, timesWorn: number): string {
  if (!lastWornAt || timesWorn === 0) return "Never";
  const diffMs = Date.now() - new Date(lastWornAt).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return new Date(lastWornAt).toLocaleDateString();
}

/** Replace broken/dead placeholder URLs stored in older rows. */
function resolveImageUrl(imageUrl: string | null): string {
  if (!imageUrl) return DEFAULT_WARDROBE_IMAGE;
  if (imageUrl.includes("photo-1523381295211")) return DEFAULT_WARDROBE_IMAGE;
  return imageUrl;
}

export function mapWardrobeRow(row: WardrobeItemRow): WardrobeItem {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand ?? "",
    category: row.category as WardrobeItem["category"],
    color: row.color ?? "",
    colorHex: row.color_hex ?? "#888888",
    imageUrl: resolveImageUrl(row.image_url),
    timesWorn: row.times_worn ?? 0,
    lastWorn: formatLastWorn(row.last_worn_at, row.times_worn ?? 0),
    isFavorite: row.is_favorite ?? false,
    price: row.price ?? undefined,
    purchaseDate: row.purchase_date ?? undefined,
    fabric: row.fabric ?? undefined,
    season: (row.season ?? []) as WardrobeItem["season"],
    occasions: (row.occasions ?? []) as WardrobeItem["occasions"],
    fitNotes: row.fit_notes ?? undefined,
    addedAt: row.created_at,
  };
}

export function mapWardrobeInputToRow(
  input: {
    name: string;
    brand?: string | null;
    category: string;
    color?: string | null;
    colorHex?: string | null;
    imageUrl?: string | null;
    fabric?: string | null;
    season?: string[];
    occasions?: string[];
    price?: number | null;
    purchaseDate?: string | null;
    fitNotes?: string | null;
    isFavorite?: boolean;
  },
  userId: string
) {
  return {
    user_id: userId,
    name: input.name,
    brand: input.brand || null,
    category: input.category,
    color: input.color || null,
    color_hex: input.colorHex || "#888888",
    image_url: input.imageUrl || null,
    fabric: input.fabric || null,
    season: input.season ?? [],
    occasions: input.occasions ?? [],
    price: input.price ?? null,
    purchase_date: input.purchaseDate || null,
    fit_notes: input.fitNotes || null,
    is_favorite: input.isFavorite ?? false,
  };
}

export function buildWardrobeStats(
  items: WardrobeItem[],
  staticConfig: Pick<WardrobePageData, "categories">
): WardrobeStatCard[] {
  const categorySet = new Set(items.map((i) => i.category));
  const mostWorn = [...items].sort((a, b) => b.timesWorn - a.timesWorn)[0];
  const lastAdded = [...items].sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  )[0];

  const health =
    items.length === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (items.filter((i) => i.imageUrl && i.brand && i.season.length > 0)
              .length /
              items.length) *
              100
          )
        );

  return [
    { id: "total", label: "Total Items", value: String(items.length) },
    { id: "categories", label: "Categories", value: String(categorySet.size) },
    {
      id: "most-worn",
      label: "Most Worn",
      value: mostWorn?.name ?? "—",
    },
    {
      id: "last-added",
      label: "Last Added",
      value: lastAdded?.name ?? "—",
    },
    {
      id: "health",
      label: "Wardrobe Health",
      value: `${health}%`,
      progress: health,
    },
  ];
}

export function buildCategoryCounts(
  items: WardrobeItem[],
  staticConfig: Pick<WardrobePageData, "categories">
) {
  const counts: Record<string, number> = { all: items.length };
  for (const cat of staticConfig.categories) {
    if (cat.id === "all") continue;
    counts[cat.id] = items.filter((i) => i.category === cat.id).length;
  }

  return staticConfig.categories.map((cat) => ({
    ...cat,
    count: counts[cat.id] ?? 0,
  }));
}

export function buildWardrobeInsights(items: WardrobeItem[]) {
  if (items.length === 0) {
    return [
      { id: "i1", label: "Most Worn Color", value: "—" },
      { id: "i2", label: "Least Used Category", value: "—" },
      { id: "i3", label: "Items Not Worn", value: "0" },
      { id: "i4", label: "Favorite Brand", value: "—" },
    ];
  }

  const colorCounts = new Map<string, number>();
  const brandCounts = new Map<string, number>();
  const categoryCounts = new Map<string, number>();

  for (const item of items) {
    if (item.color) {
      colorCounts.set(item.color, (colorCounts.get(item.color) ?? 0) + 1);
    }
    if (item.brand) {
      brandCounts.set(item.brand, (brandCounts.get(item.brand) ?? 0) + 1);
    }
    categoryCounts.set(
      item.category,
      (categoryCounts.get(item.category) ?? 0) + 1
    );
  }

  const mostWornColor =
    [...colorCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  const favoriteBrand =
    [...brandCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  const leastUsedCategory =
    [...categoryCounts.entries()].sort((a, b) => a[1] - b[1])[0]?.[0] ?? "—";
  const neverWorn = items.filter((i) => i.timesWorn === 0).length;

  return [
    { id: "i1", label: "Most Worn Color", value: mostWornColor },
    {
      id: "i2",
      label: "Least Used Category",
      value: leastUsedCategory,
    },
    { id: "i3", label: "Items Not Worn", value: String(neverWorn) },
    { id: "i4", label: "Favorite Brand", value: favoriteBrand },
  ];
}
