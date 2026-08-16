"use client";

import { motion } from "framer-motion";
import { Plus, Sparkles, Star } from "lucide-react";
import { DashboardCard, SectionHeader } from "@/components/dashboard/DashboardCard";
import { fadeInUp } from "@/components/dashboard/motion";
import type { ActivityItem } from "@/types/dashboard";

const iconMap = {
  plus: Plus,
  sparkles: Sparkles,
  star: Star,
} as const;

interface ActivityTimelineProps {
  activity: ActivityItem[];
}

export function ActivityTimeline({ activity }: ActivityTimelineProps) {
  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.3 }}>
      <DashboardCard>
        <SectionHeader title="Recent Activity" subtitle="Your fashion journey" />

        <div className="relative space-y-0">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[#1f1f1f]" />

          {activity.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Plus;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative flex gap-4 py-4"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1f1f1f] bg-[#111111]">
                  <Icon className="h-4 w-4 text-[#D4C4A8]" />
                </div>
                <div className="min-w-0 flex-1 pt-1.5">
                  <p className="text-sm font-medium text-white">{item.action}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{item.timestamp}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </DashboardCard>
    </motion.div>
  );
}
