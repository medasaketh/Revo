"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WardrobeItem } from "@/types/wardrobe";

interface ItemDrawerProps {
  item: WardrobeItem | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

export function ItemDrawer({ item, onClose, onToggleFavorite }: ItemDrawerProps) {
  useEffect(() => {
    if (item) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 340 }}
            className="fixed right-0 top-0 z-[91] flex h-full w-full max-w-md flex-col border-l border-[#202020] bg-[#090909] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#202020] px-5 py-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-gray-500 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    {item.price && (
                      <p className="mt-1 text-lg text-[#D4C4A8]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(item.id)}
                    className="rounded-xl border border-[#202020] p-2.5"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        item.isFavorite
                          ? "fill-red-400 text-red-400"
                          : "text-gray-400"
                      )}
                    />
                  </button>
                </div>

                <dl className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Category", item.category],
                    ["Color", item.color],
                    ["Fabric", item.fabric ?? "—"],
                    ["Purchase", item.purchaseDate ?? "—"],
                    ["Times Worn", String(item.timesWorn)],
                    ["Last Worn", item.lastWorn],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-[#202020] bg-[#111111] p-3"
                    >
                      <dt className="text-xs text-gray-500">{label}</dt>
                      <dd className="mt-1 capitalize text-white">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div>
                  <p className="mb-2 text-xs text-gray-500">Seasons</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.season.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[#202020] px-2.5 py-1 text-xs capitalize text-gray-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs text-gray-500">Occasions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.occasions.map((o) => (
                      <span
                        key={o}
                        className="rounded-full bg-[#D4C4A8]/10 px-2.5 py-1 text-xs capitalize text-[#D4C4A8]"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </div>

                {item.aiCompatibilityScore && (
                  <div className="rounded-2xl border border-[#D4C4A8]/20 bg-[#D4C4A8]/5 p-4">
                    <div className="flex items-center gap-2 text-sm text-[#D4C4A8]">
                      <Sparkles className="h-4 w-4" />
                      AI Compatibility Score
                    </div>
                    <p className="mt-2 text-2xl font-light text-white">
                      {item.aiCompatibilityScore}%
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      How well this item pairs with your wardrobe
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 border-t border-[#202020] p-4">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => toast.message("Edit coming soon")}
              >
                Edit
              </Button>
              <Button
                className="flex-1"
                onClick={() => toast.message("Use in outfit — coming soon")}
              >
                Use in Outfit
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toast.message("Delete — preview only")}
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
