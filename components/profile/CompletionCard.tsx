"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProfileCompletion } from "@/types/profile";

interface CompletionCardProps {
  completion: ProfileCompletion;
}

export function CompletionCard({ completion }: CompletionCardProps) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (completion.percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="sticky top-24 rounded-3xl border border-[#222222] bg-[#111111] p-6"
    >
      <h3 className="text-sm font-medium text-gray-400">Profile Completion</h3>

      <div className="relative mx-auto my-6 flex h-36 w-36 items-center justify-center">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#222222"
            strokeWidth="8"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#D4C4A8"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-3xl font-light text-white">
            {completion.percentage}%
          </p>
          <p className="text-xs text-gray-500">Complete</p>
        </div>
      </div>

      {completion.missingItems.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
            Missing
          </p>
          <ul className="space-y-2">
            {completion.missingItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4C4A8]/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button className="mt-6 w-full" size="sm">
        Complete Now
        <ArrowRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
