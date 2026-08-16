"use client";

import { cn } from "@/lib/utils";
import type { DashboardData } from "@/types/dashboard";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function DashboardCard({ children, className, id }: DashboardCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-3xl border border-[#1f1f1f] bg-[#111111] p-6",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export type { DashboardData };
