"use client";

import { cn } from "@/lib/utils";
import type { ProfileTab } from "@/types/profile";

interface ProfileTabsProps {
  tabs: ProfileTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function ProfileTabs({ tabs, activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="sticky top-0 z-20 -mx-4 border-b border-[#222222] bg-[#090909]/90 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-0">
      <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? "bg-white/10 text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
