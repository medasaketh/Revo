import { z } from "zod";

const wardrobeOccasions = [
  "casual",
  "office",
  "wedding",
  "party",
  "travel",
  "gym",
] as const;

export const logOutfitSchema = z.object({
  itemIds: z
    .array(z.string().uuid())
    .min(1, "Select at least one item")
    .max(12, "Maximum 12 items per outfit"),
  name: z.string().max(80).optional().nullable(),
  occasion: z.enum(wardrobeOccasions).optional().nullable(),
});

export type LogOutfitInput = z.infer<typeof logOutfitSchema>;
