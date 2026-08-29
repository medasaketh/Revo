"use client";

import { Grid2X2, Grid3X3, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WardrobeViewMode } from "@/types/wardrobe";

const modes: { id: WardrobeViewMode; icon: typeof Grid2X2; label: string }[] = [
  { id: "grid", icon: Grid3X3, label: "Grid" },
  { id: "list", icon: List, label: "List" },
  { id: "large", icon: LayoutGrid, label: "Large" },
  { id: "compact", icon: Grid2X2, label: "Compact" },
];

interface WardrobeViewToggleProps {
  value: WardrobeViewMode;
  onChange: (mode: WardrobeViewMode) => void;
}

export function WardrobeViewToggle({ value, onChange }: WardrobeViewToggleProps) {
  return (
    <div className="flex rounded-xl border border-[#202020] bg-[#111111] p-1">
      {modes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          title={label}
          onClick={() => onChange(id)}
          className={cn(
            "rounded-lg p-2 transition-colors",
            value === id
              ? "bg-white/10 text-white"
              : "text-gray-500 hover:text-white"
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}

export function getGridClassName(view: WardrobeViewMode): string {
  switch (view) {
    case "list":
      return "grid grid-cols-1 gap-3";
    case "large":
      return "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";
    case "compact":
      return "grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8";
    default:
      return "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  }
}
