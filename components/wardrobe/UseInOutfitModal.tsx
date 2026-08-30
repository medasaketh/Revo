"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shirt, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { WardrobeItemImage } from "@/components/wardrobe/WardrobeItemImage";
import type { LogOutfitInput } from "@/schemas/outfit";
import type {
  WardrobeFilterOption,
  WardrobeItem,
  WardrobeOccasion,
} from "@/types/wardrobe";

interface UseInOutfitModalProps {
  open: boolean;
  anchorItem: WardrobeItem | null;
  items: WardrobeItem[];
  occasions: WardrobeFilterOption[];
  onClose: () => void;
  onLog: (input: LogOutfitInput) => Promise<void>;
}

const CATEGORY_ORDER = [
  "tops",
  "bottoms",
  "dresses",
  "jackets",
  "shoes",
  "accessories",
] as const;

export function UseInOutfitModal({
  open,
  anchorItem,
  items,
  occasions,
  onClose,
  onLog,
}: UseInOutfitModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [occasion, setOccasion] = useState<WardrobeOccasion | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && anchorItem) {
      setSelectedIds([anchorItem.id]);
      setOccasion(anchorItem.occasions[0] ?? null);
      setName("");
    }
  }, [open, anchorItem]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const otherItems = useMemo(
    () => items.filter((i) => i.id !== anchorItem?.id),
    [items, anchorItem]
  );

  const groupedItems = useMemo(() => {
    const groups = new Map<string, WardrobeItem[]>();
    for (const item of otherItems) {
      const list = groups.get(item.category) ?? [];
      list.push(item);
      groups.set(item.category, list);
    }
    return CATEGORY_ORDER.filter((cat) => groups.has(cat)).map((cat) => ({
      category: cat,
      items: groups.get(cat)!,
    }));
  }, [otherItems]);

  const selectedItems = useMemo(
    () => items.filter((i) => selectedIds.includes(i.id)),
    [items, selectedIds]
  );

  const toggleItem = (id: string) => {
    if (id === anchorItem?.id) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleLog = async () => {
    if (!anchorItem || selectedIds.length === 0) return;

    setSaving(true);
    try {
      await onLog({
        itemIds: selectedIds,
        name: name.trim() || null,
        occasion,
      });
      toast.success("Outfit logged", {
        description: `${selectedIds.length} item${selectedIds.length !== 1 ? "s" : ""} marked as worn today.`,
      });
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not log outfit");
    } finally {
      setSaving(false);
    }
  };

  if (!anchorItem) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="fixed left-1/2 top-1/2 z-[101] flex max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-[#202020] bg-[#111111] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#202020] px-6 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-[#D4C4A8]" />
                  <h2 className="text-lg font-semibold">Use in Outfit</h2>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Combine pieces and log what you wore — times worn will update.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-gray-500 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="rounded-2xl border border-[#D4C4A8]/20 bg-[#D4C4A8]/5 p-4">
                <p className="text-xs uppercase tracking-wider text-[#D4C4A8]">
                  Starting piece
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl">
                    <WardrobeItemImage
                      src={anchorItem.imageUrl}
                      alt={anchorItem.name}
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white">{anchorItem.name}</p>
                    <p className="text-xs capitalize text-gray-500">
                      {anchorItem.brand} · {anchorItem.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="text-xs text-gray-500">Outfit name (optional)</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Office look, Weekend casual"
                  className="mt-1.5 border-[#202020] bg-[#090909]"
                />
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs text-gray-500">Occasion</p>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setOccasion(
                          occasion === opt.id
                            ? null
                            : (opt.id as WardrobeOccasion)
                        )
                      }
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
                        occasion === opt.id
                          ? "border-[#D4C4A8] bg-[#D4C4A8]/10 text-[#D4C4A8]"
                          : "border-[#202020] text-gray-400 hover:border-[#333]"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-white">
                    Add more pieces
                  </p>
                  <span className="text-xs text-gray-500">
                    {selectedIds.length} selected
                  </span>
                </div>

                {otherItems.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-[#202020] py-8 text-center text-sm text-gray-500">
                    Add more items to your wardrobe to build full outfits.
                  </p>
                ) : (
                  <div className="space-y-5">
                    {groupedItems.map(({ category, items: groupItems }) => (
                      <div key={category}>
                        <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                          {category}
                        </p>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {groupItems.map((item) => {
                            const selected = selectedIds.includes(item.id);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleItem(item.id)}
                                className={cn(
                                  "relative overflow-hidden rounded-xl border text-left transition-all",
                                  selected
                                    ? "border-[#D4C4A8] ring-1 ring-[#D4C4A8]/40"
                                    : "border-[#202020] hover:border-[#333]"
                                )}
                              >
                                <div className="relative aspect-square">
                                  <WardrobeItemImage
                                    src={item.imageUrl}
                                    alt={item.name}
                                    sizes="120px"
                                  />
                                  {selected && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                      <Check className="h-5 w-5 text-[#D4C4A8]" />
                                    </div>
                                  )}
                                </div>
                                <p className="truncate px-2 py-1.5 text-[10px] text-gray-300">
                                  {item.name}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedItems.length > 0 && (
                <div className="mt-6 rounded-2xl border border-[#202020] bg-[#090909] p-4">
                  <div className="flex items-center gap-2 text-sm text-[#D4C4A8]">
                    <Sparkles className="h-4 w-4" />
                    Today&apos;s outfit preview
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedItems.map((item) => (
                      <span
                        key={item.id}
                        className="rounded-full border border-[#202020] bg-[#111111] px-2.5 py-1 text-xs capitalize text-gray-300"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 border-t border-[#202020] p-4">
              <Button variant="secondary" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                disabled={saving || selectedIds.length === 0}
                onClick={handleLog}
              >
                {saving ? "Logging…" : "Log Outfit & Mark Worn"}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
