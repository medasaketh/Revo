import { z } from "zod";

const wardrobeCategories = [
  "tops",
  "bottoms",
  "dresses",
  "shoes",
  "jackets",
  "accessories",
] as const;

const wardrobeSeasons = [
  "summer",
  "winter",
  "spring",
  "autumn",
  "all-season",
] as const;

const wardrobeOccasions = [
  "casual",
  "office",
  "wedding",
  "party",
  "travel",
  "gym",
] as const;

export const wardrobeItemInputSchema = z.object({
  name: z.string().min(1, "Item name is required").max(120),
  brand: z.string().max(80).optional().nullable(),
  category: z.enum(wardrobeCategories),
  color: z.string().max(40).optional().nullable(),
  colorHex: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color hex")
    .optional()
    .nullable(),
  imageUrl: z.string().max(2048).optional().nullable().or(z.literal("")),
  fabric: z.string().max(80).optional().nullable(),
  season: z.array(z.enum(wardrobeSeasons)).default([]),
  occasions: z.array(z.enum(wardrobeOccasions)).default([]),
  price: z.number().min(0).optional().nullable(),
  purchaseDate: z.string().max(40).optional().nullable(),
  fitNotes: z.string().max(500).optional().nullable(),
  isFavorite: z.boolean().optional(),
});

export const wardrobeItemUpdateSchema = wardrobeItemInputSchema.partial();

export type WardrobeItemInput = z.infer<typeof wardrobeItemInputSchema>;
export type WardrobeItemUpdateInput = z.infer<typeof wardrobeItemUpdateSchema>;
