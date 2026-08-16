"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bookmark, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DashboardCard, SectionHeader } from "@/components/dashboard/DashboardCard";
import { fadeInUp } from "@/components/dashboard/motion";
import type { OutfitRecommendation } from "@/types/dashboard";

interface RecommendationCardProps {
  recommendation: OutfitRecommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const handleAction = (action: string) => {
    toast.message(action, {
      description: "Outfit actions will connect to AI when backend is ready.",
    });
  };

  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.15 }}>
      <DashboardCard>
        <SectionHeader title="Today's Outfit Recommendation" />

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="space-y-3">
              {recommendation.items.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] p-4 transition-colors hover:border-[#333]"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-400">
              <span className="font-medium text-[#D4C4A8]">Why this works: </span>
              {recommendation.reason}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAction("Outfit saved")}
              >
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAction("Regenerating outfit")}
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
              <Button
                variant="champagne"
                size="sm"
                onClick={() => handleAction("Style explanation")}
              >
                <Sparkles className="h-4 w-4" />
                Explain Why
              </Button>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#1f1f1f]">
            <Image
              src={recommendation.imageUrl}
              alt={recommendation.title}
              fill
              className="object-cover"
              sizes="280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm font-medium">
              {recommendation.title}
            </p>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
}
