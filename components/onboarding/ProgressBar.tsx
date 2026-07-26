"use client";

import { motion } from "framer-motion";
import { TOTAL_ONBOARDING_STEPS } from "@/constants/theme";

interface ProgressBarProps {
  step: number;
  total?: number;
}

export function ProgressBar({ step, total = TOTAL_ONBOARDING_STEPS }: ProgressBarProps) {
  const progress = (step / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs tracking-wide text-gray-500">
        <span>
          Step {step} of {total}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-[#222222]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#D4C4A8] via-white to-[#D4C4A8]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
