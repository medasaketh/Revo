"use client";

import { cn } from "@/lib/utils";
import type { ProfileTag } from "@/types/profile";

interface TagGroupProps {
  tags: ProfileTag[];
  variant?: "filled" | "outline";
}

export function TagGroup({ tags, variant = "filled" }: TagGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            variant === "filled"
              ? "border border-[#222222] bg-[#0a0a0a] text-gray-300"
              : "border border-[#444] bg-transparent text-gray-400"
          )}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

interface ColorChipProps {
  tags: ProfileTag[];
  variant?: "filled" | "outline";
}

export function ColorChip({ tags, variant = "filled" }: ColorChipProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
            variant === "outline"
              ? "border border-[#444] bg-transparent text-gray-400"
              : "border border-[#222222] bg-[#0a0a0a] text-gray-300"
          )}
        >
          {tag.color && (
            <span
              className={cn(
                "h-3 w-3 rounded-full ring-1 ring-white/10",
                variant === "outline" && "opacity-60"
              )}
              style={{ backgroundColor: tag.color }}
            />
          )}
          {tag.label}
        </span>
      ))}
    </div>
  );
}
