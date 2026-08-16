"use client";

import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-[#1f1f1f]/80",
        className
      )}
    />
  );
}

export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <Skeleton className="h-[320px] w-full rounded-3xl" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-44 rounded-3xl" />
        ))}
      </div>

      <Skeleton className="h-64 w-full rounded-3xl" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-3xl" />
        <Skeleton className="h-80 rounded-3xl" />
      </div>
    </div>
  );
}

export { Skeleton as LoadingSkeleton };
