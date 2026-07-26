"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLOR_CHIP_HEX } from "@/data/onboarding-steps";

interface ColorChipProps {
  label: string;
  value: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ColorChip({ label, value, selected, onClick }: ColorChipProps) {
  const hex = COLOR_CHIP_HEX[value] ?? "#333333";

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
        selected
          ? "border-white/40 bg-white/10 text-white"
          : "border-[#222222] bg-[#111111] text-gray-400 hover:border-[#333333] hover:text-white"
      )}
    >
      <span
        className="h-4 w-4 rounded-full border border-white/10 shadow-inner"
        style={{ backgroundColor: hex }}
      />
      {label}
      {selected && <Check className="h-3.5 w-3.5 text-[#D4C4A8]" />}
    </motion.button>
  );
}
