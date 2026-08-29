"use client";

import { cn } from "@/lib/utils";
import {
  Bell,
  Database,
  HelpCircle,
  Info,
  Lock,
  Palette,
  Settings,
  Shield,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import type { SettingsCategory } from "@/types/settings";

const iconMap: Record<string, LucideIcon> = {
  settings: Settings,
  user: User,
  bell: Bell,
  shield: Shield,
  palette: Palette,
  sparkles: Sparkles,
  lock: Lock,
  database: Database,
  help: HelpCircle,
  info: Info,
};

interface SettingsSidebarProps {
  categories: SettingsCategory[];
  active: string;
  onSelect: (id: string) => void;
}

export function SettingsSidebar({
  categories,
  active,
  onSelect,
}: SettingsSidebarProps) {
  return (
    <nav className="space-y-1">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon] ?? Settings;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-sm font-medium transition-all duration-200",
              active === cat.id
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                active === cat.id ? "text-[#D4C4A8]" : "text-gray-500"
              )}
            />
            {cat.label}
          </button>
        );
      })}
    </nav>
  );
}
