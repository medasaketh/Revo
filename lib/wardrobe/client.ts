import type { WardrobeItem } from "@/types/wardrobe";
import type {
  WardrobeItemInput,
  WardrobeItemUpdateInput,
} from "@/schemas/wardrobe";

export class WardrobeApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

async function request<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
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

/** Fetch all wardrobe items for the signed-in user. */
export async function getWardrobeItems(): Promise<WardrobeItem[]> {
  const data = await request<{ items: WardrobeItem[] }>("/api/wardrobe");
  return data.items ?? [];
}

/** Save a new wardrobe item for the signed-in user. */
export async function saveWardrobeItem(
  input: WardrobeItemInput
): Promise<WardrobeItem> {
  const data = await request<{ item: WardrobeItem }>("/api/wardrobe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return data.item;
}

/** Update an existing wardrobe item. */
export async function updateWardrobeItem(
  id: string,
  input: WardrobeItemUpdateInput
): Promise<WardrobeItem> {
  const data = await request<{ item: WardrobeItem }>(`/api/wardrobe/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return data.item;
}

/** Delete a wardrobe item. */
export async function deleteWardrobeItem(id: string): Promise<void> {
  await request<{ id: string }>(`/api/wardrobe/${id}`, { method: "DELETE" });
}
