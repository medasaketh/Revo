"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { WardrobeAiFeature, WardrobeInsight } from "@/types/wardrobe";

export function WardrobeInsightsCards({
  insights,
}: {
  insights: WardrobeInsight[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-medium text-gray-400">Wardrobe Insights</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-[#202020] bg-[#111111] p-4"
          >
            <p className="text-xs text-gray-500">{insight.label}</p>
            <p className="mt-2 text-xl font-light text-white">{insight.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function WardrobeAiPlaceholders({
  features,
}: {
  features: WardrobeAiFeature[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-medium text-gray-400">AI Features</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="relative rounded-2xl border border-[#202020] bg-[#111111] p-4 opacity-60"
          >
            <span className="absolute right-3 top-3 rounded-full bg-[#D4C4A8]/10 px-2 py-0.5 text-[10px] font-medium text-[#D4C4A8]">
              Coming Soon
            </span>
            <Sparkles className="mb-3 h-5 w-5 text-[#D4C4A8]" />
            <p className="text-sm font-medium text-white">{feature.label}</p>
            <p className="mt-1 text-xs text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
