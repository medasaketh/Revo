"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Shirt,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { cardHover, fadeInUp } from "@/components/dashboard/motion";
import type { QuickAction } from "@/types/dashboard";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  shirt: Shirt,
  camera: Camera,
  "shopping-bag": ShoppingBag,
};

interface QuickActionCardProps {
  action: QuickAction;
  index: number;
}

export function QuickActionCard({ action, index }: QuickActionCardProps) {
  const Icon = iconMap[action.icon] ?? Sparkles;

  return (
    <motion.div
      {...fadeInUp}
      {...cardHover}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <DashboardCard className="group flex h-full flex-col justify-between transition-colors hover:border-[#333]">
        <div>
          <div
            className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${action.accent} p-3 ring-1 ring-white/5`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-base font-semibold text-white">{action.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            {action.description}
          </p>
        </div>
        <Link href={action.href} className="mt-6 block">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="secondary" size="sm" className="w-full">
              {action.buttonLabel}
            </Button>
          </motion.div>
        </Link>
      </DashboardCard>
    </motion.div>
  );
}

interface QuickActionsGridProps {
  actions: QuickAction[];
}

export function QuickActionsGrid({ actions }: QuickActionsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map((action, index) => (
        <QuickActionCard key={action.id} action={action} index={index} />
      ))}
    </div>
  );
}
