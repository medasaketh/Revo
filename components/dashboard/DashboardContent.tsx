"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/dashboard/TopBar";
import { HeroCard } from "@/components/dashboard/HeroCard";
import { QuickActionsGrid } from "@/components/dashboard/QuickActionCard";
import { AIChatCard } from "@/components/dashboard/AIChatCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { WardrobeCard } from "@/components/dashboard/WardrobeCard";
import { FashionInsights } from "@/components/dashboard/InsightCard";
import { ShoppingSuggestions } from "@/components/dashboard/ProductCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { DailyTipCard } from "@/components/dashboard/DailyTipCard";
import { SectionHeader } from "@/components/dashboard/DashboardCard";
import { staggerContainer } from "@/components/dashboard/motion";
import { scrollToDashboardSection } from "@/lib/navigation/scroll";
import type { DashboardData } from "@/types/dashboard";

interface DashboardContentProps {
  data: DashboardData;
}

export function DashboardContent({ data }: DashboardContentProps) {
  useEffect(() => {
    const sectionId = window.location.hash.replace("#", "");
    if (!sectionId) return;

    const timer = window.setTimeout(() => {
      scrollToDashboardSection(sectionId);
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <TopBar user={data.user} greeting={data.greeting} />

      <HeroCard weather={data.weather} styleBrief={data.styleBrief} />

      <section>
        <SectionHeader title="Quick Actions" subtitle="Jump into what matters" />
        <QuickActionsGrid actions={data.quickActions} />
      </section>

      <section id="wardrobe" className="scroll-mt-28">
        <div className="grid gap-8 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <RecommendationCard recommendation={data.recommendation} />
          </div>
          <div className="space-y-8 xl:col-span-2">
            <WardrobeCard wardrobe={data.wardrobe} />
            <DailyTipCard tip={data.dailyTip} />
          </div>
        </div>
      </section>

      <AIChatCard
        placeholder={data.chatPlaceholder}
        suggestions={data.chatSuggestions}
        prompts={data.chatPrompts}
      />

      <FashionInsights insights={data.insights} />

      <ShoppingSuggestions products={data.products} />

      <ActivityTimeline activity={data.activity} />
    </motion.div>
  );
}
