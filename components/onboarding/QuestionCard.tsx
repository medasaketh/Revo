"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function QuestionCard({
  label,
  description,
  children,
  className,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn(
        "rounded-2xl border border-[#222222] bg-[#111111] p-5 md:p-6",
        className
      )}
    >
      <div className="mb-4 space-y-1">
        <p className="text-sm font-medium text-white">{label}</p>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
      {children}
    </motion.div>
  );
}
