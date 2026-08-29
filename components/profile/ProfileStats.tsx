"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Shirt,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import type { ConnectedStat } from "@/types/profile";

const iconMap: Record<string, LucideIcon> = {
  shirt: Shirt,
  sparkles: Sparkles,
  message: MessageSquare,
  star: Star,
};

interface ProfileStatsProps {
  stats: ConnectedStat[];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon] ?? Sparkles;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-[#222222] bg-[#0a0a0a] p-5 transition-colors hover:border-[#333]"
          >
            <Icon className="mb-3 h-5 w-5 text-[#D4C4A8]" />
            <p className="text-2xl font-light text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
