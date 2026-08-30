"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { WardrobeItem } from "@/types/wardrobe";
import type { WardrobeItemInput } from "@/schemas/wardrobe";
import {
  getWardrobeItems,
  saveWardrobeItem,
  updateWardrobeItem,
  deleteWardrobeItem,
  WardrobeApiError,
} from "@/lib/wardrobe/client";

export function useWardrobe() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const wardrobeItems = await getWardrobeItems();
      setItems(wardrobeItems);
    } catch (err) {
      if (err instanceof WardrobeApiError && err.code === "MIGRATION_REQUIRED") {
        toast.error("Database migration required", {
          description: err.message,
        });
      } else {
        toast.error(
          err instanceof Error ? err.message : "Failed to load wardrobe"
        );
      }
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (input: WardrobeItemInput) => {
    const item = await saveWardrobeItem(input);
    setItems((prev) => [item, ...prev]);
    return item;
  };

  const updateItem = async (id: string, input: Partial<WardrobeItemInput>) => {
    const item = await updateWardrobeItem(id, input);
    setItems((prev) => prev.map((i) => (i.id === id ? item : i)));
    return item;
  };

  const deleteItem = async (id: string) => {
    await deleteWardrobeItem(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleFavorite = async (id: string) => {
    const current = items.find((i) => i.id === id);
    if (!current) return;

    const next = !current.isFavorite;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isFavorite: next } : i))
    );

    try {
      await updateItem(id, { isFavorite: next });
    } catch {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, isFavorite: !next } : i
        )
      );
      toast.error("Could not update favorite");
    }
  };

  return {
    items,
    loading,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    setItems,
  };
}
