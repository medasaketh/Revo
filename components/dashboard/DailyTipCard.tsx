"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { fadeInUp } from "@/components/dashboard/motion";
import type { DailyTip } from "@/types/dashboard";

interface DailyTipCardProps {
  tip: DailyTip;
}

export function DailyTipCard({ tip }: DailyTipCardProps) {
  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.35 }}>
      <DashboardCard className="relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#D4C4A8]/10 blur-2xl" />
        <div className="relative flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4C4A8]/10 ring-1 ring-[#D4C4A8]/20">
            <Lightbulb className="h-5 w-5 text-[#D4C4A8]" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#D4C4A8]">
              {tip.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-300 italic">
              &ldquo;{tip.content}&rdquo;
            </p>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
}
