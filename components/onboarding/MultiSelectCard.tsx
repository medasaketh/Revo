"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectCardProps {
  label: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function MultiSelectCard({
  label,
  description,
  selected = false,
  onClick,
  icon,
}: MultiSelectCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-300 md:p-5",
        selected
          ? "border-[#D4C4A8]/50 bg-[#D4C4A8]/5"
          : "border-[#222222] bg-[#111111] hover:border-[#333333] hover:bg-[#161616]"
      )}
    >
      {icon && <div className="text-[#D4C4A8]">{icon}</div>}
      <div className="space-y-1">
        <p className="text-sm font-medium text-white">{label}</p>
        {description && (
          <p className="text-xs leading-relaxed text-gray-500">{description}</p>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4C4A8] text-[#090909]"
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
}
