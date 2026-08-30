"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard, SectionHeader } from "@/components/dashboard/DashboardCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { fadeInUp } from "@/components/dashboard/motion";
import { getWardrobeItems } from "@/lib/wardrobe/client";
import {
  buildDashboardWardrobeStats,
  EMPTY_DASHBOARD_WARDROBE_STATS,
} from "@/lib/wardrobe/mappers";
import type { WardrobeStats } from "@/types/dashboard";

interface WardrobeCardProps {
  initialWardrobe?: WardrobeStats;
  /** @deprecated Use initialWardrobe */
  wardrobe?: WardrobeStats;
}

function resolveWardrobeStats(
  initialWardrobe?: WardrobeStats,
  legacyWardrobe?: WardrobeStats
): WardrobeStats {
  return initialWardrobe ?? legacyWardrobe ?? EMPTY_DASHBOARD_WARDROBE_STATS;
}

function AnimatedCount({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [count, setCount] = useState(0);

  useEffect(() => {
    spring.set(value);
    return display.on("change", (v) => setCount(v));
  }, [value, spring, display]);

  return <span>{count}</span>;
}

const categories = [
  { key: "tops" as const, label: "Tops" },
  { key: "bottoms" as const, label: "Bottoms" },
  { key: "dresses" as const, label: "Dresses" },
  { key: "shoes" as const, label: "Shoes" },
  { key: "jackets" as const, label: "Jackets" },
  { key: "accessories" as const, label: "Accessories" },
];

export function WardrobeCard({
  initialWardrobe,
  wardrobe: legacyWardrobe,
}: WardrobeCardProps) {
  const [wardrobe, setWardrobe] = useState(() =>
    resolveWardrobeStats(initialWardrobe, legacyWardrobe)
  );

  useEffect(() => {
    setWardrobe(resolveWardrobeStats(initialWardrobe, legacyWardrobe));
  }, [initialWardrobe, legacyWardrobe]);

  useEffect(() => {
    let active = true;

    getWardrobeItems()
      .then((items) => {
        if (active) setWardrobe(buildDashboardWardrobeStats(items));
      })
      .catch(() => {
        // Keep server-rendered stats on fetch failure.
      });

    return () => {
      active = false;
    };
  }, []);

  if (wardrobe.isEmpty) {
    return (
      <motion.div {...fadeInUp}>
        <EmptyState
          title="Let's build your digital wardrobe."
          description="Add your first item and Revo will start learning your style."
          buttonLabel="Add First Clothing Item"
          href="/wardrobe"
        />
      </motion.div>
    );
  }

  return (
    <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
      <DashboardCard>
        <SectionHeader
          title="Wardrobe Overview"
          subtitle="Your digital closet at a glance"
          action={
            <Link href="/wardrobe">
              <Button variant="ghost" size="sm">
                Manage <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          }
        />

        <div className="mb-6 flex items-end gap-2">
          <span className="text-4xl font-light tracking-tight">
            <AnimatedCount value={wardrobe.totalItems} />
          </span>
          <span className="mb-1 text-sm text-gray-500">Total Items</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] p-4 text-center transition-colors hover:border-[#333]"
            >
              <Shirt className="mx-auto mb-2 h-4 w-4 text-[#D4C4A8]" />
              <p className="text-2xl font-semibold">
                <AnimatedCount value={wardrobe[cat.key]} />
              </p>
              <p className="mt-1 text-xs text-gray-500">{cat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#1f1f1f]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${wardrobe.healthProgress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#D4C4A8]/60 to-[#D4C4A8]"
          />
        </div>
        <p className="mt-2 text-right text-xs text-gray-500">
          Wardrobe health {wardrobe.healthProgress}%
        </p>
      </DashboardCard>
    </motion.div>
  );
}
