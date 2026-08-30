import type { LogOutfitInput } from "@/schemas/outfit";
import type { LogOutfitResult, Outfit } from "@/types/outfit";
import { WardrobeApiError } from "@/lib/wardrobe/client";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const json = await res.json();

  if (!json.success) {
    throw new WardrobeApiError(
      json.error?.code ?? "REQUEST_FAILED",
      json.error?.message ?? "Request failed",
      res.status
    );
  }

  return json.data as T;
}

export async function logOutfit(input: LogOutfitInput): Promise<LogOutfitResult> {
  return request<LogOutfitResult>("/api/wardrobe/outfits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function getRecentOutfits(): Promise<Outfit[]> {
  const data = await request<{ outfits: Outfit[] }>("/api/wardrobe/outfits");
  return data.outfits ?? [];
}
