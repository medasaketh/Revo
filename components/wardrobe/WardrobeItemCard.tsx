"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { WardrobeItemImage } from "@/components/wardrobe/WardrobeItemImage";
import type { WardrobeItem, WardrobeViewMode } from "@/types/wardrobe";

interface WardrobeItemCardProps {
  item: WardrobeItem;
  index: number;
  view: WardrobeViewMode;
  onSelect: (item: WardrobeItem) => void;
  onToggleFavorite: (id: string) => void;
}

export function WardrobeItemCard({
  item,
  index,
  view,
  onSelect,
  onToggleFavorite,
}: WardrobeItemCardProps) {
  const isList = view === "list";
  const isCompact = view === "compact";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      whileHover={{ y: isList ? 0 : -4 }}
      onClick={() => onSelect(item)}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-2xl border border-[#202020] bg-[#111111] transition-colors hover:border-[#333]",
        isList && "flex gap-4 p-3"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          isList ? "h-24 w-20 shrink-0 rounded-xl" : "aspect-[4/5]",
          isCompact && "aspect-square"
        )}
      >
        <WardrobeItemImage
          src={item.imageUrl}
          alt={item.name}
          className="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 240px"
        />
        {!isList && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "h-3.5 w-3.5",
              item.isFavorite ? "fill-red-400 text-red-400" : "text-white"
            )}
          />
        </button>
      </div>

      <div className={cn("p-3", isList && "flex flex-1 flex-col justify-center py-0")}>
        {!isCompact && (
          <p className="text-[10px] uppercase tracking-wider text-gray-500">
            {item.category}
          </p>
        )}
        <h3
          className={cn(
            "font-medium text-white",
            isCompact ? "mt-1 truncate text-xs" : "mt-0.5 text-sm"
          )}
        >
          {item.name}
        </h3>
        {!isCompact && (
          <>
            <p className="text-xs text-gray-500">{item.brand}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.colorHex }}
                />
                {item.color}
              </span>
              {item.aiCompatibilityScore && (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-[#D4C4A8]">
                  <Sparkles className="h-3 w-3" />
                  {item.aiCompatibilityScore}%
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}
