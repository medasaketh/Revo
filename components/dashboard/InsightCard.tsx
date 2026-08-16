"use client";

import { motion } from "framer-motion";
import { DashboardCard, SectionHeader } from "@/components/dashboard/DashboardCard";
import { fadeInUp } from "@/components/dashboard/motion";
import type { FashionInsight } from "@/types/dashboard";

interface InsightCardProps {
  insight: FashionInsight;
  index: number;
}

function InsightCardItem({ insight, index }: InsightCardProps) {
  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex h-full flex-col rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] p-5"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {insight.label}
      </p>
      {insight.type === "progress" ? (
        <div className="mt-4 flex-1">
          <p className="text-3xl font-light text-white">{insight.value}</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#1f1f1f]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${insight.progress ?? 0}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[#D4C4A8]/50 to-[#D4C4A8]"
            />
          </div>
        </div>
      ) : (
        <p className="mt-4 text-3xl font-light text-white">{insight.value}</p>
      )}
    </motion.div>
  );
}

interface FashionInsightsProps {
  insights: FashionInsight[];
}

export function FashionInsights({ insights }: FashionInsightsProps) {
  return (
    <div>
      <SectionHeader title="Fashion Insights" subtitle="Patterns from your wardrobe" />
      <div className="grid gap-4 sm:grid-cols-3">
        {insights.map((insight, index) => (
          <InsightCardItem key={insight.id} insight={insight} index={index} />
        ))}
      </div>
    </div>
  );
}

export { InsightCardItem as InsightCard };
