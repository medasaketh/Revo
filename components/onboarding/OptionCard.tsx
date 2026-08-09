"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function OptionCard({
  label,
  description,
  selected = false,
  onClick,
  className,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative w-full cursor-pointer rounded-2xl border p-4 text-left transition-all duration-300 md:p-5",
        selected
          ? "border-white/40 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          : "border-[#222222] bg-[#111111] hover:bg-[#161616]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-white md:text-base">{label}</p>
          {description && (
            <p className="text-xs leading-relaxed text-gray-500 md:text-sm">
              {description}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            selected
              ? "border-white bg-white text-[#090909]"
              : "border-[#333333] group-hover:border-[#555555]"
          )}
        >
          {selected && <Check className="h-3 w-3" strokeWidth={3} />}
        </div>
      </div>
    </motion.button>
  );
}
