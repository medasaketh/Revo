"use client";

import { motion } from "framer-motion";
import type { WardrobeStatCard } from "@/types/wardrobe";

interface WardrobeStatsCardsProps {
  stats: WardrobeStatCard[];
}

export function WardrobeStatsCards({ stats }: WardrobeStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-2xl border border-[#202020] bg-[#111111] p-4"
        >
          <p className="text-xs text-gray-500">{stat.label}</p>
          <p className="mt-2 text-xl font-light text-white sm:text-2xl">
            {stat.value}
          </p>
          {stat.progress !== undefined && (
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#202020]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#D4C4A8]/60 to-[#D4C4A8]"
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
