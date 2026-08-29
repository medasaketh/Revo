"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { WardrobeItem } from "@/types/wardrobe";

interface WardrobeItemCardProps {
  item: WardrobeItem;
  index: number;
}

export function WardrobeItemCard({ item, index }: WardrobeItemCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-3xl border border-[#222222] bg-[#111111] transition-colors hover:border-[#333]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
          {item.category}
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500">{item.brand}</p>
        <h3 className="mt-1 font-medium text-white">{item.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
            <span
              className="h-2.5 w-2.5 rounded-full ring-1 ring-white/10"
              style={{ backgroundColor: item.colorHex }}
            />
            {item.color}
          </span>
          <span className="text-xs text-gray-600">
            Worn {item.timesWorn}x
          </span>
        </div>
      </div>
    </motion.article>
  );
}
